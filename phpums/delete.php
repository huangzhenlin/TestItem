<?php
    //接收要删除的数据 ID
    if(empty($_GET['id'])){
        exit('<h1>必须传入指定参数</h1>');
    }
    $id=$_GET['id'];
    //建立连接
    $conn=mysqli_connect('localhost','root','123456','test');
    if(!$conn){
        exit('<h1>数据库连接失败</h1>');
    }
    //开始查询
    $query=mysqli_query($conn,'delete from users where id= ' . $id .';');
    if(!$query){
        exit('<h1>查询数据失败</h1>');
    }
    $affected_rows=mysqli_affected_rows($conn);
    if($affected_rows<=0){
        exit('<h1>删除数据失败</h1>');
    }
    //跳转页面
    header('Location: index.php');
?>