<?php
error_reporting(0);
require_once ($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once ($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');
require_once '../model/deal.php';
require_once '../../anag_variants/model/anag_variant.php';
require_once '../../anag_categories/model/anag_category.php';
require_once '../../anag_subcategories/model/anag_subcategory.php';
require_once '../../deals_variants/model/deal_variant.php';
require_once '../../deals_images/model/deal_image.php';
require_once '../../deals_seo/model/deal_seo.php';
require_once '../../deals_variants_details/model/deal_variant_details.php';
require_once '../../deals_variants_map/model/deal_variant_map.php';
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/img_compressor/img_compressor.php';
require_once '../../../utils/img_resizer/img_resizer.php';
require_once '../../../utils/Logs/LoggerFactory.php';

$method = $_SERVER['REQUEST_METHOD'];

require_once $_SERVER['DOCUMENT_ROOT'] . '/backend/authorization/BD_OAUTH_SERVER.php';

switch ($method)
{
    case 'GET':
        try
        {
            if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals()))
            {
                echo $server->getResponse()
                    ->send();
                break;
            }

            if (!(isset($_GET['userid'])) && !(isset($_GET['deal_id'])))
            {
                echo json_response('Campi non settati', 400);
                return;
            }

            if (isset($_GET['userid']))
            {
                bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
                $db = new Database();
                $conn = $db->getConnection();

                $userid = $_GET['userid'];
                $id = null;
                $title = null;
                $categories = null;
                $description = null;
                $is_draft = null;

                $deal = new deal($conn, $id, $userid, $title, $categories, $description, $is_draft);
                $stmt = $deal->getFromUserId();

                echo json_response(encodeString(json_encode($stmt)) , 200);
            }
            elseif (isset($_GET['deal_id']))
            {
                bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
                $db = new Database();
                $conn = $db->getConnection();

                $userid = null;
                $id = $_GET['deal_id'];
                $title = null;
                $categories = null;
                $description = null;
                $is_draft = null;

                $deal = new deal($conn, $id, $userid, $title, $categories, $description, $is_draft);
                $stmt = $deal->getFromDealId();

                $anag_category = new Anag_category($conn, $stmt['categories_id'], null);
                $anag_subcategory = new Anag_subcategory($conn, $stmt['subcategories_id'], null, null);

                $stmt['category'] = $anag_category->getCategoryFromId();
                $stmt['subCategory'] = $anag_subcategory->getSubCategoryFromId();

                $variant = new Variant($conn, null, null, null, null, $stmt['id']);
                $stmt['variants'] = $variant->getFromDealId();

                foreach ($stmt['variants'] as $item)
                {

                    $item->{'variant_details'} = [];

                    $deal_variant_map = new Variant_Map($conn, null, $item->variant_id);
                    $details = $deal_variant_map->getFromVariantId();

                    foreach ($details as $details_item)
                    {
                        $variant_details = new Variant_Details($conn, $details_item->detail_id, null, null);
                        $variant_detail = $variant_details->getFromVariantDetailId();

                        $anag_variants = new Anag_variants($conn, $variant_detail->anag_variants_id, null, null);
                        $anag_variant = $anag_variants->getVariantsFromId();
                        $variant_detail->{'name'} = $anag_variant->name;

                        array_push($item->variant_details, $variant_detail);
                    }

                    $images_variants_model = new DealImage($conn, null, null, $item->variant_id, null, null);
                    $images_variants = $images_variants_model->getFromVariantId();

                    $item->{'images'} = $images_variants;

                }

                $seo = new SEO($conn, $id, $stmt['id'], null, null);
                $stmt['seo'] = $seo->getFromDealId();

                echo json_response(encodeString(json_encode($stmt)) , 200);
            }
        }
        catch(Exception $e)
        {
            bd_log("Errore durante il recupero dei deal" . $e, "e", basename(__FILE__));
            echo json_response($e->getMessage() , 500);
        }
    break;

    case 'POST':

        if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals()))
        {
            echo $server->getResponse()
                ->send();
            break;
        }
        try
        {
            bd_log("Raccolta richiesta POST", "i", basename(__FILE__));
            $db = new Database();
            $data = json_decode(decodeString(explode(" ", file_get_contents("php://input"))));
            if (is_null($data))
            {
                parse_str(file_get_contents("php://input") , $data);
                $data = (object)decodeString($data);
            }

            $typeOp = $data->typeOp;

            if ($typeOp == 1)
            {

                $conn = $db->getConnection();
                $conn->beginTransaction();
                $userid = $data->userid;
                $title = $data->title;
                $category_id = $data->category_id;
                $subcategory_id = $data->subcategory_id;
                $description = $data->description;
                $seo_title = $data->seo_title;
                $seo_description = $data->seo_description;
                $is_draft = false;
                $id = null;

                $variants = $data->variants;
                $images = $data->images;
                $start_sold_date = $date = date('Y-m-d');

                $deal = new Deal($conn, $id, $userid, $title, $category_id, $subcategory_id, $description, $is_draft, $start_sold_date);
                $stmt = $deal->insert();
                if($stmt)
                {
                    $LAST_ID = $conn->lastInsertId();

                    bd_log("Inserimento del deal avvenuto con successo" . $stmt, "i", basename(__FILE__));

                    foreach ($variants as $item)
                    {
                        $variant = new Variant($conn, $id, str_replace(",", ".", $item->priceVariant) , str_replace(",", ".", $item->discountPriceVariant) , $item->quantity, $LAST_ID, $item->url, $item->couponStartDate, $item->couponEndDate);

                        $stmt = $variant->insert();

                        if($stmt)
                        {
                            bd_log("Inserimento del variant avvenuto con successo" . $stmt, "i", basename(__FILE__));
                        }
                        else
                        {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento del variant" . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }

                        $LAST_VARIANT_ID = $conn->lastInsertId();

                        $specifications = $item->specifications;
                        $images = $item->images;

                        foreach ($specifications as $specItem)
                        {
                            $details = new Variant_Details($conn, $id, $specItem->variants_id, $specItem->titleVariant);
                            $stmt = $details->insert();

                            if($stmt)
                            {
                                bd_log("Inserimento del detail avvenuto con successo" . $stmt, "i", basename(__FILE__));
                            }
                            else
                            {
                                $conn->rollBack();
                                bd_log("Errore durante l'inserimento del detail" .$stmt[2], "e", basename(__FILE__));
                                echo json_response($stmt, 500);
                                return;
                            }

                            $LAST_DETAIL_ID = $conn->lastInsertId();

                            $variant_map = new Variant_Map($conn, $LAST_DETAIL_ID, $LAST_VARIANT_ID);
                            $stmt = $variant_map->insert();

                            if($stmt)
                            {
                                bd_log("Inserimento del map avvenuto con successo" . $stmt, "i", basename(__FILE__));
                            }
                            else
                            {
                                $conn->rollBack();
                                bd_log("Errore durante l'inserimento del map" . $stmt[2], "e", basename(__FILE__));
                                echo json_response($stmt, 500);
                                return;
                            }

                        }

                        bd_log("Inserisco le immagini" . $key, "i", basename(__FILE__));

                        foreach ($images as $key => $item)
                        {
                            list($type, $item->base64_image) = explode(';', $item->base64_image);
                            list(, $item->base64_image) = explode(',', $item->base64_image);

                            $data = base64_decode($item->base64_image);

                            $temp_path = $_SERVER['DOCUMENT_ROOT'] . '/images/' . $LAST_ID . '/' . $LAST_VARIANT_ID . '/';

                            if (!is_dir($temp_path))
                            {
                                mkdir($temp_path, 0777, true);
                            }

                            if ($type == 'data:image/jpeg')
                            {
                                $deal_image_file = fopen($temp_path . $key . ".jpg", "w");

                                fwrite($deal_image_file, $data);
                                fclose($deal_image_file);

                                $image = new SimpleImage();
                                $image->load($temp_path . $key . ".jpg");
                                $image->save($temp_path . $key . ".jpg", IMAGETYPE_JPEG);

                                $image->createThumbnail($temp_path . $key . ".jpg",800,600);
                                

                                $image = new SimpleImage();
                                $image->load($temp_path . $key . ".jpg");
                                $image->resize(626,800);
                                $image->save($temp_path . $key . "_big.jpg", IMAGETYPE_JPEG);

                                $deal_image = new DealImage($conn, $id, $LAST_ID, $LAST_VARIANT_ID, 'images/' . $LAST_ID . '/' . $LAST_VARIANT_ID . '/' . $key . ".jpg", 'images/' . $LAST_ID . '/' . $LAST_VARIANT_ID . '/' . $key . "_big.jpg");

                            }
                            else
                            {
                                $deal_image_file = fopen($temp_path . $key . ".png", "w");

                                fwrite($deal_image_file, $data);
                                fclose($deal_image_file);

                                $image = new SimpleImage();
                                $image->load($temp_path . $key . ".png");
                                $image->save($temp_path . $key . ".png", IMAGETYPE_PNG);

                                $image->createThumbnail($temp_path . $key . ".png",800,600);
                                

                                $image = new SimpleImage();
                                $image->load($temp_path . $key . ".png");
                                $image->resize(626,800);
                                $image->save($temp_path . $key . "_big.png", IMAGETYPE_PNG);


                                $deal_image = new DealImage($conn, $id, $LAST_ID, $LAST_VARIANT_ID, 'images/' . $LAST_ID . '/' . $LAST_VARIANT_ID . '/' . $key . ".png", 'images/' . $LAST_ID . '/' . $LAST_VARIANT_ID . '/' . $key . "_big.png");
                            }

                            $stmt = $deal_image->insert();

                            if($stmt)
                            {
                                bd_log("Inserimento dell'immagine avvenuta con successo" . $stmt, "i", basename(__FILE__));
                            }
                            else
                            {
                                $conn->rollBack();
                                bd_log("Errore durante l'inserimento dell' immagine" . $stmt[2], "e", basename(__FILE__));
                                echo json_response($stmt, 500);
                                return;
                            }
                        }

                    }

                    if (!empty($seo_title) || !empty($seo_description))
                    {

                        $seo = new SEO($conn, $id, $LAST_ID, $seo_title, $seo_description);

                        $stmt = $seo->insert();

                        if($stmt)
                        {
                            bd_log("Inserimento del SEO avvenuto con successo", "i", basename(__FILE__));
                        }
                        else
                        {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento del SEO : " . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }

                    }

                    $conn->commit();

                    echo json_response(encodeString("true") , 200);
                }
                else
                {
                    $conn->rollBack();
                    bd_log("Errore durante l'inserimento del deal" . $stmt[2], "e", basename(__FILE__));
                    echo json_response($stmt, 500);
                    return;
                }

                break;

            }
            else if ($typeOp == 2)
            {

            }
            else if ($typeOp == 3)
            {
                try
                {

                    bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
                    $db = new Database();
                    $conn = $db->getConnection();

                    $conn->beginTransaction();

                    $userid = null;
                    $id = $data->id;
                    $title = null;
                    $categories = null;
                    $description = null;
                    $is_draft = null;

                    $deal = new Deal($conn, $id, $userid, $title, $categories, $description, $is_draft);
                    $stmt = $deal->delete();

                    if($stmt)
                    {

                        $dir = '../../../../images/' . $id;

                        if (file_exists($dir))
                        {
                            $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
                            $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
                            foreach ($files as $file)
                            {
                                if ($file->isDir())
                                {
                                    rmdir($file->getRealPath());
                                }
                                else
                                {
                                    unlink($file->getRealPath());
                                }
                            }
                            rmdir($dir);
                        }
                        $conn->commit();

                        echo json_response(encodeString(json_encode($stmt)) , 200);
                    }
                    else
                    {
                        echo json_response(encodeString(json_encode($stmt[2])) , 500);
                        $conn->rollBack();
                    }

                }
                catch(Exception $e)
                {
                    $conn->rollBack();
                    bd_log("Errore generico" . $e->getMessage() , "e", basename(__FILE__));
                    echo json_response($e->getMessage() , 500);
                }

                break;
            }

        }
        catch(Exception $e)
        {
            $conn->rollBack();
            bd_log("Errore generico" . $e->getMessage() , "e", basename(__FILE__));
            echo json_response($e->getMessage() , 500);
        }

    }
    
