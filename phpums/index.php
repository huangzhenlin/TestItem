<?php
    //1.建立连接
    $conn=mysqli_connect('localhost','root','123456','test');
    if(!$conn){
        exit('<h1>数据库连接失败</h1>');
    }
    //2.开始查询
    $query=mysqli_query($conn,'select * from users;');
    if(!$query){
        exit('<h1>查询过程失败</h1>');
    }
    ///3.遍历结果集
    // while($item=mysqli_fetch_assoc($query)){
    //     var_dump($item);
    // }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>管理系统</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
</head>
<body>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="#">管理系统</a>
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="index.php">用户管理</a>
            </li>
        </ul>
    </nav>
    <main class="container mt-3">
        <h3 class="alert-heading">用户管理
            <a class="btn btn-link btn-lg" href="add.php">添加用户</a>
        </h3>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>头像</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>生日</th>
                    <th class="text-center" width="140">操作</th>
                </tr>
            </thead>
            <tbody>
                <?php while($item=mysqli_fetch_assoc($query)): ?>
                <tr>
                    <th scope="row"><?php echo $item['id'] ?></th>
                    <td>
                        <img src="<?php echo $item['avatar']; ?>" class="rounded" alt="<?php echo $item['name']; ?>">
                    </td>
                    <td><?php echo $item['name']; ?></td>
                    <td><?php echo $item['gender']==0?'男':'女'; ?></td>
                    <td><?php echo $item['birthday']; ?></td>
                    <td class="text-center">
                        <a class="btn btn-info btn-sm" href="edit.php?id=<?php echo $item['id']?>">编辑</a>
                        <a class="btn btn-danger btn-sm" href="delete.php?id=<?php echo $item['id']?>">删除</a>
                    </td>
                </tr>
                <?php endwhile ?>
            </tbody>
        </table>
        <ul class="pagination justify-content-center">
            <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
        </ul>
    </main>
</body>
</html>