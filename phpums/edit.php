<?php
    //接收需要修改的ID
    if(empty($_GET['id'])){
        exit('<h1>必须传入指定参数</h1>');
    }
    $id=$_GET['id'];
    //建立连接
    $conn=mysqli_connect('localhost','root','123456','test');
    if(!$conn){
        exit('<h1>数据库连接失败</h1>');
    }
    //开始查询(因为ID是唯一的,找到第一个满足条件的就不用继续了)
    $query=mysqli_query($conn,"select *from users where id={$id} limit 1;");
    if(!$query){
        exit('<h1>查询数据失败</h1>');
    }
    $user=mysqli_fetch_assoc($query);
    if(!$user){
        exit('<h1>找不到你要编辑的数据</h1>');
    }
    function edit(){
        global $user;
        //1.验证非空
        if(empty($_POST['name'])){
            $GLOBALS['error_message']='请输入姓名';
            return;
        }
        if(!isset($_POST['gender']) && $_POST['gender']!=='-1'){
            $GLOBALS['error_message']='请输入性别';
            return;
        }
        if(empty($_POST['birthday'])){
            $GLOBALS['error_message']='请输入日期';
            return;
        }
        //2.取值
        $user['name']=$_POST['name'];
        $user['gender']=$_POST['gender'];
        $user['birthday']=$_POST['birthday'];
        //3.有上传就修改(用户上传了新头像)
        if(isset($_FILES['avatar']) && $_FILES['avatar']['error']===UPLOAD_ERR_OK){
            $ext=pathinfo($_FILES['avatar']['name'],PATHINFO_EXTENSION);
            $target='uploads/'. uniqid() . '.' .$ext;
            if(!move_uploaded_file($_FILES['avatar']['tmp_name'],$target)){
                $GLOBALS['error_message']='上传头像失败';
                return;
            }
            $user['avator']=$target;
        }
        //4.保存
        $conn=mysqli_connect('localhost','root','123456','test');
        if(!$conn){
            $GLOBALS['error_message']='连接数据库失败';
            return;
        }
        $query=mysqli_query($conn,"update users set name='{$user['name']}',gender={$user['gender']},birthday='{$user['birthday']}',avatar='{$user['avatar']}' where id={$user['id']}");
        if(!$query){
            $GLOBALS['error_message']='查询过程失败';
            return;
        }
        $affectd_rows=mysqli_affected_rows($conn);
        if($affectd_rows!==1){
            $GLOBALS['error_message']='添加数据失败';
            return;
        }
        //5.响应
        header('Location: index.php');
    }
    if($_SERVER['REQUEST_METHOD']==='POST'){
        edit();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>编辑用户</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
</head>
<body>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="#" class="navbar-brand">管理系统</a>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a href="index.php" class="nav-link">用户管理</a>
            </li>
        </ul>
    </nav>
    <main class="container mt-3">
        <h3 class="alert-heading">编辑"<?php echo $user['name']; ?>"</h3>
        <?php if(isset($error_message)): ?>
            <div class="alert alert-warning">
                <?php echo $error_message; ?>
            </div>
        <?php endif ?>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>?id=<?php echo $user['id']; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
            <img src="<?php echo $user['avatar']; ?>" alt="">
            <div class="form-group">
                <label for="avatar">头像</label>
                <input type="file" name="avatar" id="avatar" class="form-control">
            </div>
                <input type="hidden" name="coding" id="coding" class="form-control" value="<?php echo $user['id']; ?>">
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" name="name" id="name" class="form-control" value="<?php echo $user['name']; ?>">
            </div>
            <div class="form-group">
                <label for="gender">性别</label>
                <select name="gender" id="gender" class="form-control">
                    <option value="-1">请选择性别</option>
                    <option value="0"<?php echo $user['gender']==='0'? 'selected':''; ?>>男</option>
                    <option value="1"<?php echo $user['gender']==='1'? 'selected':''; ?>>女</option>
                </select>
            </div>
            <div class="form-group">
                <label for="birthday">生日</label>
                <input type="date" name="birthday" id="birthday" class="form-control" value="<?php echo $user['birthday']; ?>">
            </div>
            <button class="btn btn-primary">保存</button>
        </form>
    </main>
</body>
</html>