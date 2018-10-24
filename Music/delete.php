<?php
    //通过客户端在URL地址中的问号参数的不同来辨别要删除的数据
    //1.接收URL中的不同ID
    if(empty($_GET['id'])){
        //传入的参数为空
        exit('<h1>必须指定参数</h1>');
    }
    $id=$_GET['id'];
    //2.找到要删除的数据
    $data=json_decode(file_get_contents('data.json'),true);
    foreach($data as $item){
        //如果不是要找的数据,直接找下一条
        if($item['id']!==$id) continue;
        //3.从原数据中删除(执行到这,已经找到那条数据====$item=>要删除的数据)
        $index=array_search($item,$data);
        // array_splice — 去掉数组中的某一部分并用其它值取代
        array_splice($data,$index,1);
        //4.保存删除指定数据过后的内容
        $json=json_encode($data);
        file_put_contents('data.json',$json);
        //5.跳转回到列表页
        header('Location: index.php');
    }
?>