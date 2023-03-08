<?php
include("hidden.php"); //require
$mysqli = new mysqli($host, $user, $passwd, $dbname);
$mysqli->query("set names utf8");

if(isset($_POST['acc']) && $_POST['acc']=='add'){
    $sql = "insert into czat(id,user, time, text,color) values(NULL,?,?,?,?)";
    $stmt = $mysqli->prepare($sql);

    // if ($stmt === false) {
    //     trigger_error($mysqli->error, E_USER_ERROR);
    //     return;
    //   }
      //
    $stmt->bind_param("ssss", rawurldecode($_POST['user']),rawurldecode($_POST['timek']),rawurldecode($_POST['text']), rawurldecode($_POST['color']));
    $stmt->execute();
    echo json_encode("test");
}else if(isset($_POST['acc']) && $_POST['acc']=='id'){
    $sql = "select MAX(id) from czat";
    $result = $mysqli->query($sql);
    //echo json_encode($result);
    $all = $result->fetch_all();
    if($all[0][0] == null){
        echo json_encode([[0]]);
    }else{
        echo json_encode($all);
    }
    
}else if(isset($_POST['acc']) && $_POST['acc']=='clean'){
    $sql = "DELETE FROM czat WHERE id<?"; //tu zmienić przy upload
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("i",rawurldecode($_POST['id']));
    $stmt->execute();
    echo "wyczyszczono";
}else{
    $stare = $_POST['lastid'];
    $time = time();
    $flaga = true;
    while (time() - $time < 10) {
        usleep(500000);
        $sql = "select MAX(id) from czat";
        $result = $mysqli->query($sql);
        //echo json_encode($result);
        $all = $result->fetch_all();
        $nowe = $all[0][0];
        if($nowe>$stare){
            //POBIERAMY NOWE DANE (może być wiele wpisów!)
            $sql = "SELECT * from czat WHERE id>$stare";
            $result = $mysqli->query($sql);
            $all = $result->fetch_all();
            $flaga = false;
            //$nowe = $all[0][0];
            echo json_encode($all);
            break;
        };
        
    }
    if($flaga==true){
        echo json_encode("null");
    };
    
}
?>