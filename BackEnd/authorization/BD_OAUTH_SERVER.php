<?php

include($_SERVER['DOCUMENT_ROOT'] . '/../oauth_database.php');

require_once('OAuth2/Autoloader.php');
OAuth2\Autoloader::register();

$storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));

$config = array(
    'access_lifetime' => 86400
);

$server = new OAuth2\Server($storage, $config);

$server->addGrantType(new OAuth2\GrantType\ClientCredentials($storage, array(
                      'allow_credentials_in_request_body' => false
                      )));

$server->addGrantType(new OAuth2\GrantType\AuthorizationCode($storage));
