<?php
error_reporting(0);
require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/../utils.php');
require_once '../model/product.php';
require_once '../../anag_variants/model/anag_variant.php';
require_once '../../anag_categories/model/anag_category.php';
require_once '../../anag_subcategories/model/anag_subcategory.php';
require_once '../../products_variants/model/product_variant.php';
require_once '../../products_images/model/product_image.php';
require_once '../../products_seo/model/product_seo.php';
require_once '../../products_shipments/model/product_shipment.php';
require_once '../../products_variants_details/model/product_variant_details.php';
require_once '../../products_variants_map/model/product_variant_map.php';
require_once '../../../utils/JSON_Response/json_responder.php';
require_once '../../../utils/img_compressor/img_compressor.php';
require_once '../../../utils/img_resizer/img_resizer.php';
require_once '../../../utils/Logs/LoggerFactory.php';

$method = $_SERVER['REQUEST_METHOD'];

require_once $_SERVER['DOCUMENT_ROOT'] . '/backend/authorization/BD_OAUTH_SERVER.php';


switch ($method) {
    case 'GET':
        try {
            if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
                echo $server->getResponse()->send();
                break;
            }
            
            if (!(isset($_GET['userid'])) && !(isset($_GET['product_id']))) {
                echo json_response('Campi non settati', 400);
                return;
            }
            
            if (isset($_GET['userid'])) {
                bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
                $db   = new Database();
                $conn = $db->getConnection();
                
                $userid      = $_GET['userid'];
                $id          = null;
                $title       = null;
                $categories  = null;
                $description = null;
                $is_draft    = null;
                
                $product = new Product($conn, $id, $userid, $title, $categories, $description, $is_draft);
                $stmt    = $product->getFromUserId();
                foreach ($stmt as $product) {
                  
                $anag_category    = new Anag_category($conn, $product->categories_id, null);
                $anag_subcategory = new Anag_subcategory($conn, $product->subcategories_id, null, null);
                
                $product->{'category'}    = $anag_category->getCategoryFromId();
                $product->{'subCategory'} = $anag_subcategory->getSubCategoryFromId();
                
                $variant          = new Variant($conn, null, null, null, null,  $product->id);
                $product->{'variants'} = $variant->getFromProductId();
                
                foreach ($product->variants as $item) {
                    
                    $item->{'variant_details'} = [];

                    $product_variant_map  = new Variant_Map($conn,null,$item->variant_id);
                    $details = $product_variant_map->getFromVariantId();

                    foreach ( $details as $details_item){
                        $variant_details = new Variant_Details($conn,$details_item->detail_id,null,null);
                        $variant_detail = $variant_details->getFromVariantDetailId();
                    
                        $anag_variants        = new Anag_variants($conn,  $variant_detail->anag_variants_id, null, null);
                        $anag_variant = $anag_variants->getVariantsFromId();
                        $variant_detail->{'name'} = $anag_variant->name;

                        array_push($item->variant_details,$variant_detail);
                    }

                    $images_variants_model = new ProductImage($conn,null,null,$item->variant_id,null,null);
                    $images_variants = $images_variants_model->getFromVariantId();
    
                    $item->{'images'} = $images_variants;

                }

                $seo = new SEO($conn, $id,$product->id,null,null);
                $product->{'seo'}=$seo->getFromProductId();
            }
                
                echo json_response(encodeString(json_encode($stmt)), 200);
            } elseif (isset($_GET['product_id'])) {
                bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
                $db   = new Database();
                $conn = $db->getConnection();
                
                $userid      = null;
                $id          = $_GET['product_id'];
                $title       = null;
                $categories  = null;
                $description = null;
                $is_draft    = null;
                
                $product = new Product($conn, $id, $userid, $title, $categories, $description, $is_draft);
                $stmt    = $product->getFromProductId();
                
                $anag_category    = new Anag_category($conn, $stmt['categories_id'], null);
                $anag_subcategory = new Anag_subcategory($conn, $stmt['subcategories_id'], null, null);
                
                $stmt['category']    = $anag_category->getCategoryFromId();
                $stmt['subCategory'] = $anag_subcategory->getSubCategoryFromId();
                
                $variant          = new Variant($conn, null, null, null, null,  $stmt['id']);
                $stmt['variants'] = $variant->getFromProductId();
                
                foreach ($stmt['variants'] as $item) {
                    
                    $item->{'variant_details'} = [];

                    $product_variant_map  = new Variant_Map($conn,null,$item->variant_id);
                    $details = $product_variant_map->getFromVariantId();

                    foreach ( $details as $details_item){
                        $variant_details = new Variant_Details($conn,$details_item->detail_id,null,null);
                        $variant_detail = $variant_details->getFromVariantDetailId();
                    
                        $anag_variants        = new Anag_variants($conn,  $variant_detail->anag_variants_id, null, null);
                        $anag_variant = $anag_variants->getVariantsFromId();
                        $variant_detail->{'name'} = $anag_variant->name;

                        array_push($item->variant_details,$variant_detail);
                    }

                    $images_variants_model = new ProductImage($conn,null,null,$item->variant_id,null,null);
                    $images_variants = $images_variants_model->getFromVariantId();
    
                    $item->{'images'} = $images_variants;

                }

                $seo = new SEO($conn, $id,$stmt['id'],null,null);
                $stmt['seo']=$seo->getFromProductId();
                
                echo json_response(encodeString(json_encode($stmt)), 200);
            }
        }
        catch (Exception $e) {
            bd_log("Errore durante il recupero dei product" . $e, "e", basename(__FILE__));
            echo json_response($e->getMessage(), 500);
        }
        break;
    
    case 'POST':
        
        if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
            echo $server->getResponse()->send();
            break;
        }
        try {
            bd_log("Raccolta richiesta POST", "i", basename(__FILE__));
            $db   = new Database();
            $data = json_decode(decodeString(explode(" ", file_get_contents("php://input"))));
            if (is_null($data)) {
                parse_str(file_get_contents("php://input"), $data);
                $data = (object) decodeString($data);
            }

            $typeOp = $data->typeOp;

            if($typeOp == 1){
            
            $conn = $db->getConnection();
            $conn->beginTransaction();
            $userid         = $data->userid;
            $title          = $data->title;
            $category_id    = $data->category_id;
            $subcategory_id = $data->subcategory_id;
            $description    = $data->description;
            $seo_title      = $data->seo_title;
            $seo_description = $data->seo_description;
            
            if (is_null($data->is_draft)) {
                $is_draft = false;
            } else {
                $is_draft = $data->is_draft;
            }
            
            if (is_null($data->is_free_shipment) || empty($data->is_free_shipment)) {
                $is_free_shipment = false;
            } else {
                $is_free_shipment = $data->is_free_shipment;
            }
            
            $id = null;
            
            $variants        = $data->variants;
            $images          = $data->images;
            $shipments       = $data->shipments;
            $start_sold_date = $date = date('Y-m-d');
            
            $product = new Product($conn, $id, $userid, $title, $category_id, $subcategory_id, $description, $is_draft, $is_free_shipment, $start_sold_date);
            $stmt    = $product->insert();
            if($stmt) {
                $LAST_ID = $conn->lastInsertId();
                
                bd_log("Inserimento del product avvenuto con successo" . $stmt, "i", basename(__FILE__));
                
                foreach ($variants as $item) {
                    $variant = new Variant($conn, $id, str_replace(",", ".", $item->priceVariant), str_replace(",", ".", $item->discountPriceVariant), $item->quantity, $LAST_ID,$item->url);
                    
                    $stmt = $variant->insert();
                    
                    if($stmt) {
                        bd_log("Inserimento del variant avvenuto con successo" . $stmt, "i", basename(__FILE__));
                    } else {
                        $conn->rollBack();
                        bd_log("Errore durante l'inserimento del variant" .$stmt[2], "e", basename(__FILE__));
                        echo json_response($stmt, 500);
                        return;
                    }
                    
                    $LAST_VARIANT_ID = $conn->lastInsertId();
                    
                    $specifications = $item->specifications;
                    $images         = $item->images;
                    
                    foreach ($specifications as $specItem) {
                        $details = new Variant_Details($conn, $id, $specItem->variants_id, $specItem->titleVariant);
                        $stmt    = $details->insert();
                        
                        if($stmt) {
                            bd_log("Inserimento del detail avvenuto con successo" . $stmt, "i", basename(__FILE__));
                        } else {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento del detail" . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }
                        
                        $LAST_DETAIL_ID = $conn->lastInsertId();
                        
                        $variant_map = new Variant_Map($conn, $LAST_DETAIL_ID, $LAST_VARIANT_ID);
                        $stmt        = $variant_map->insert();
                        
                        
                        if($stmt) {
                            bd_log("Inserimento del map avvenuto con successo" . $stmt, "i", basename(__FILE__));
                        } else {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento del map" . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }
                        
                    }

                    bd_log("Inserisco le immagini" . $key, "i", basename(__FILE__));
                    
                    foreach ($images as $key => $item) {
                        list($type, $item->base64_image) = explode(';', $item->base64_image);
                        list(, $item->base64_image) = explode(',', $item->base64_image);
                        
                        $data = base64_decode($item->base64_image);
                        
                        $temp_path = $_SERVER['DOCUMENT_ROOT'] . '/images/' . $LAST_ID . '/' . $LAST_VARIANT_ID . '/';
                        
                        if (!is_dir($temp_path)) {
                            mkdir($temp_path, 0777, true);
                        }
                        
                        if ($type == 'data:image/jpeg') {
                            $product_image_file = fopen($temp_path . $key . ".jpg", "w");
                            
                            fwrite($product_image_file, $data);
                            fclose($product_image_file);

                            $image = new SimpleImage();
                            $image->load($temp_path . $key . ".jpg");
                            $image->save($temp_path . $key . ".jpg", IMAGETYPE_JPEG);

                            $image->createThumbnail($temp_path . $key . ".jpg",800,600);
                            

                            $image = new SimpleImage();
                            $image->load($temp_path . $key . ".jpg");
                            $image->resize(626,800);
                            $image->save($temp_path . $key . "_big.jpg", IMAGETYPE_JPEG);
                            
                            $product_image = new ProductImage($conn, $id, $LAST_ID,$LAST_VARIANT_ID, 'images/' . $LAST_ID . '/'. $LAST_VARIANT_ID .'/' . $key . ".jpg", 'images/' . $LAST_ID . '/' . $LAST_VARIANT_ID .'/' . $key . "_big.jpg");
                           
                        } else {
                            $product_image_file = fopen($temp_path . $key . ".png", "w");
                            
                            fwrite($product_image_file, $data);
                            fclose($product_image_file);
                            
                            $image = new SimpleImage();
                            $image->load($temp_path . $key . ".png");
                            $image->save($temp_path . $key . ".png", IMAGETYPE_PNG);

                            $image->createThumbnail($temp_path . $key . ".png",800,600);
                            

                            $image = new SimpleImage();
                            $image->load($temp_path . $key . ".png");
                            $image->resize(626,800);
                            $image->save($temp_path . $key . "_big.png", IMAGETYPE_PNG);
                            
                            $product_image = new ProductImage($conn, $id, $LAST_ID,$LAST_VARIANT_ID, 'images/' . $LAST_ID . '/'. $LAST_VARIANT_ID .'/' . $key . ".png", 'images/' . $LAST_ID . '/' . $LAST_VARIANT_ID .'/' . $key . "_big.png");
                        }
                                       
                        $stmt = $product_image->insert();
                        
                        if($stmt) {
                            bd_log("Inserimento dell'immagine avvenuta con successo" . $stmt, "i", basename(__FILE__));
                        } else {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento dell' immagine" . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }
                    }
                    
                }
                
                if (!$is_free_shipment) {
                    foreach ($shipments as $item) {
                        $shipment = new Shipment($conn, $id, $item->idForwarder, $LAST_ID, $item->deliveryExtimatedTime, $item->shipmentCost);
                        
                        $stmt = $shipment->insert();
                        
                        if($stmt) {
                            bd_log("Inserimento dello shipment avvenuto con successo" . $stmt, "i", basename(__FILE__));
                        } else {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento dello shipment" . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }
                    }
                } else {
                    foreach ($shipments as $item) {
                        $shipment = new Shipment($conn, $id, 0, $LAST_ID, $item->deliveryExtimatedTime, 0);
                        
                        $stmt = $shipment->insert();
                        
                        if($stmt) {
                            bd_log("Inserimento dello shipment avvenuto con successo" . $stmt, "i", basename(__FILE__));
                        } else {
                            $conn->rollBack();
                            bd_log("Errore durante l'inserimento dello shipment" . $stmt[2], "e", basename(__FILE__));
                            echo json_response($stmt, 500);
                            return;
                        }
                    }
                }


                if(!empty($seo_title) || !empty($seo_description)){

                    $seo = new SEO($conn, $id,$LAST_ID,$seo_title,$seo_description);

                    $stmt = $seo->insert();
                    
                    if($stmt) {
                        bd_log("Inserimento del SEO avvenuto con successo" . $stmt, "i", basename(__FILE__));
                    } else {
                        $conn->rollBack();
                        bd_log("Errore durante l'inserimento del SEO" . $stmt[2], "e", basename(__FILE__));
                        echo json_response($stmt, 500);
                        return;
                    }

                }
                
                $conn->commit();
                
                echo json_response(encodeString("true"), 200);
            } else {
                $conn->rollBack();
                bd_log("Errore durante l'inserimento del product" . $stmt[2], "e", basename(__FILE__));
                echo json_response($stmt, 500);
                return;
            }

        
        break;

    }else if($typeOp == 2){

    }else if($typeOp == 3){
        try {
     
                bd_log("Raccolta richiesta GET", "i", basename(__FILE__));
                $db   = new Database();
                $conn = $db->getConnection();

                $conn->beginTransaction();
                
                $userid      = null;
                $id          =  $data->id;
                $title       = null;
                $categories  = null;
                $description = null;
                $is_draft    = null;
                
                $product = new Product($conn, $id, $userid, $title, $categories, $description, $is_draft);
                $stmt    = $product->delete();
                
                if($stmt){
                   
           
                    $dir = '../../../../images/'. $id;

                    if(file_exists($dir)){
                    $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
                    $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
                    foreach($files as $file) {
                        if ($file->isDir()){
                            rmdir($file->getRealPath());
                        } else {
                            unlink($file->getRealPath());
                        }
                    }
                    rmdir($dir);
                    }
                    $conn->commit();
 
                    echo json_response(encodeString(json_encode($stmt)), 200);
                }else{
                    echo json_response(encodeString(json_encode($stmt)), 500);
                    $conn->rollBack();
                }
        

    }catch (Exception $e) {
            $conn->rollBack();
            bd_log("Errore generico" . $e->getMessage(), "e", basename(__FILE__));
            echo json_response($e->getMessage(), 500);
        }
        
        break;
    }
    
   }catch (Exception $e) {
    $conn->rollBack();
    bd_log("Errore generico" . $e->getMessage(), "e", basename(__FILE__));
    echo json_response($e->getMessage(), 500);
}

}
