<?php
    //获取文件中记录的数据,展示到表格中(动态生成表格的HTML标签)
    $json=file_get_contents('data.json');
    //$content=>json格式的字符串,把json格式的字符串转换为对象的过程叫做反序列化
    //json_decode默认反序列化时把json中的对象转换为PHP中stdClass类型的对象(object(stdClass))
    $data=json_decode($json,true);
    /*这里是设置了json_decode第二个参数为true的时候的输出是一个数组,默认输出的是对象
    Array (
        [0] => Array ( [id] => 100 [title] => 起风了 [artist] => 辣椒 [images] => 1.jpg [source] => 1.MP3 )
        [1] => Array ( [id] => 101 [title] => 青鸟 [artist] => 火影 [images] => 2.jpg [source] => 2.MP3 ) 
    )
    */
    if(!$data){
        //json格式不正确
        exit('数据文件异常');
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>音乐播放列表</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
</head>
<body>
   <div class="container mt-3">
       <h3 class="display-4">音乐播放列表</h3>
       <hr>
       <a href="add.php" class="btn btn-primary">添加音乐</a>
       <table class="table table-bordered table-striped table-hover">
          <thead class="thead-dark">
              <tr>
                  <th class="text-center">歌曲名</th>
                  <th class="text-center">歌手</th>
                  <th class="text-center">海报</th>
                  <th class="text-center">音乐</th>
                  <th class="text-center">操作</th>
              </tr>
          </thead>
          <tbody class="text-center">
                <?php foreach($data as $item): ?>
                <!-- $item 返回的是数组:
                Array ( [id] => 100 [title] => 起风了 [artist] => 辣椒 [images] => 1.jpg [source] => 1.MP3 ) 
                Array ( [id] => 101 [title] => 青鸟 [artist] => 火影 [images] => 2.jpg [source] => 2.MP3 ) 
                -->
                <tr>
                    <!-- => 是数组成员访问符号,-> 是对象成员访问符号 -->
                    <td class="align-middle"><?php echo $item['title']; ?></td>
                    <td class="align-middle"><?php echo $item['artist']; ?></td>
                    <!-- 可能会需要上传多个图片(json数据里应该对应的使用数组存储图片),此时应该遍历images, -->
                    <td class="align-middle">
                        <?php foreach($item['images'] as $src):?>
                            <img src="<?php echo $src;?>" alt="">
                        <?php endforeach ?>
                    </td>
                    <td class="align-middle"><audio src="<?php echo $item['source']; ?>" controls></audio></td>
                    <td class="align-middle">
                        <!-- 删除数据使用超链接的方法,利用问号后面的参数传值 -->
                        <a class="btn brn-danger btn_sm" href="delete.php?id=<?php echo $item['id'];?>">删除</a>
                    </td>
                </tr>  
              <?php endforeach ?>
          </tbody>
       </table>
   </div>
</body>
</html>