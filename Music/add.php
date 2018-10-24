<?php
    //将用户提交过来的数据保存到data.json数据文件中(三部曲:接收并校验--->持久化--->响应)
    function add(){
        //定义一个空数组,用来装数据
        $data=array();
        //1.文本框校验
        if(empty($_POST['title'])){
            $GLOBALS['error_message']='请输入标题';
            return;
        }
        if(empty($_POST['artist'])){
            $GLOBALS['error_message']='请输入歌手';
            return;
        }
        $data['id']=uniqid();//uniqid()生成一个唯一ID
        $data['title']=$_POST['title'];
        $data['artist']=$_POST['artist'];
        //2.上传文件校验
        //2.1图片上传文件校验(处理多个图片上传)
        if(empty($_FILES['images'])){
            //客户端提交的表单中没有images文件域(用户误删)
            $GLOBALS['error_message']='请正常使用表单';
            return;
        }
        $images=$_FILES['images'];
        $data['images']=array();
        //判断用户是否选择了文件
        for($i=0;$i<count($images['name']);$i++){
            //$images['error']=>[0,0,0...]
            if($images['error'][$i]!== UPLOAD_ERR_OK){
                $GLOBALS['error_message']='上传海报文件失败1';
                return;
            }
            //校验图片的大小
            if($images['size'][$i]>20*1024*1024){
                $GLOBALS['error_message']='图片文件过大';
                return;
            }
            //校验类型
            //$images['type']=>['image/png','image/jpeg',....]还可以使用in_array的方法
            // strpos(str,substr) 用于查询字符串str的子字符串substr首次出现的位置,返回索引
            if(strpos($images['type'][$i],'image/')!==0){
                $GLOBALS['error_message']='这是不支持的音乐格式';
                return;
            }
            //图片文件已经上传成功,但是还在临时目录里
            //一般会将上传的文件重命名
            $dest='uploads/' . uniqid() . $images['name'][$i];
            if(!move_uploaded_file($images['tmp_name'][$i],$dest)){
                $GLOBALS['error_message']='上传海报文件失败2';
                return;
            }
            $data['images'][]=$dest;
        }
        //2.2音乐文件校验
        if(empty($_FILES['source'])){
            //客户端提交的表单中没有source文件域
            $GLOBALS['error_message']='请正常使用表单';
            return;
        }
        $source=$_FILES['source'];
        //判断用户是否选择了文件
        if($source['error']!== UPLOAD_ERR_OK){
            $GLOBALS['error_message']='上传音乐文件失败1';
            return;
        }
        //校验文件的大小
        if($source['size']>20*1024*1024){
            $GLOBALS['error_message']='音乐文件过大';
            return;
        }
        if($source['size']<1*1024*1024){
            $GLOBALS['error_message']='音乐文件过小';
            return;
        }
        //校验类型
        $source_allowed_types=array('audio/mp3','audio/wma');
        if(!in_array($source['type'],$source_allowed_types)){
            $GLOBALS['error_message']='这是不支持的音乐格式';
            return;
        }
        //移动:音乐文件已经上传成功,但是还在临时目录里
        //一般会将上传的文件重命名
        $target='uploads/' . uniqid(). '-' .$source['name'];
        if(!move_uploaded_file($source['tmp_name'],$target)){
            $GLOBALS['error_message']='上传音乐失败2';
            return;
        }
        //3.将数据装起来:此时上传和移动都已经完成
        $data['source']=$target;
        //4.将数据加入到原有的数据中
        $json=file_get_contents('data.json');
        $old=json_decode($json,true);
        array_push($old,$data);
        $new_json=json_encode($old);
        file_put_contents('data.json',$new_json);
        // 5.跳转回列表页
       header('Location: index.php');
    }
    if($_SERVER['REQUEST_METHOD']==='POST'){
        add();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>添加音乐</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
</head>
<body>
    <div class="container py-5">
        <h1 class="display-4">添加新音乐</h1>
        <hr>
        <?php if(isset($error_message)):?>
            <div class="alert alert-danger" role="alert">
                <?php echo $error_message; ?>
            </div>
        <?php endif ?>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
            <div class="form-group">
                <label for="title">歌曲名</label>
                <input type="text" name="title" id="title" class="form-control">
            </div>
            <div class="form-group">
                <label for="artist">歌手</label>
                <input type="text" name="artist" id="artist" class="form-control">
            </div>
            <div class="form-group">
                <label for="images">海报图片</label>
                <!-- multiple可以让一个文件域多选 -->
                <!-- 保存多个文件,结合前面的CheckBox问题,可以在name属性值[] -->
                <input type="file" name="images[]" id="images" class="form-control" multiple accept="image/*">
            </div>
            <div class="form-group">
                <label for="source">音乐文件</label>
                <!-- accept可以设置  MIME Type/文件扩展名 -->
                <input type="file" name="source" id="source" class="form-control" accept="audio/*">
            </div>
            <button class="btn btn-block btn-primary" type="submit">保存</button>
        </form>
    </div>
</body>
</html>