<?php 
    function add_user(){
        //1.验证非空
        if(empty($_POST['coding'])){
            $GLOBALS['error_message']='请输入编码';
            return;
        }
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
        $coding=$_POST['coding'];
        $name=$_POST['name'];
        $gender=$_POST['gender'];
        $birthday=$_POST['birthday'];
        //3.接收文件并验证
        if(empty($_FILES['avatar'])){
            $GLOBALS['error_message']='请上传头像';
            return;
        }
        // pathinfo() 函数以数组的形式返回文件路径的信息
        $ext=pathinfo($_FILES['avatar']['name'],PATHINFO_EXTENSION);//扩展名==>jpg
        $target='uploads/' . uniqid() . '.' .$ext;
        if(!move_uploaded_file($_FILES['avatar']['tmp_name'],$target)){
            $GLOBALS['error_message']='上传头像失败';
            return;
        } 
        $avatar=$target;
        //4.保存
        $conn=mysqli_connect('localhost','root','123456','test');
        if(!$conn){
            $GLOBALS['error_message']='连接数据库失败';
            return;
        }
        $query=mysqli_query($conn,"insert into users values({$coding},'{$name}',{$gender},'{$birthday}','{$avatar}');");
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
        add_user();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加用户</title>
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
        <h3 class="alert-heading">添加用户</h3>
        <?php if(isset($error_message)): ?>
            <div class="alert alert-warning">
                <?php echo $error_message; ?>
            </div>
        <?php endif ?>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
            <div class="form-group">
                <label for="avatar">头像</label>
                <input type="file" name="avatar" id="avatar" class="form-control">
            </div>
            <div class="form-group">
                <label for="coding">编号</label>
                <input type="text" name="coding" id="coding" class="form-control">
            </div>
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" name="name" id="name" class="form-control">
            </div>
            <div class="form-group">
                <label for="gender">性别</label>
                <select name="gender" id="gender" class="form-control">
                    <option value="-1">请选择性别</option>
                    <option value="0">男</option>
                    <option value="1">女</option>
                </select>
            </div>
            <div class="form-group">
                <label for="birthday">生日</label>
                <input type="date" name="birthday" id="birthday" class="form-control">
            </div>
            <button class="btn btn-primary">保存</button>
        </form>
    </main>
</body>
</html>