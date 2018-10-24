<template>
    <main class="container">
        <form @submit.prevent="add" autocomplete="off">
            <div class="form-group">
                <label for="name">姓名</label>
                <input type="text" name="name" class="form-control" v-model="formData.name">
            </div>
            <div class="form-group">
                <label for="gender" class="radio-inline">性别</label><br>
                <input type="radio" value="男" id="gender" v-model="formData.gender">男&nbsp;&nbsp;&nbsp;
                <input type="radio" value="女" id="gender" v-model="formData.gender">女
            </div>
            <div class="form-group">
                <label for="age">年龄</label>
                <input type="number" name="age" class="form-control" v-model.number="formData.age">
            </div>
            <div class="form-group">
                    <label for="hobbies">爱好</label>
                    <input type="text" name="hobbies" class="form-control" v-model="formData.hobbies">
            </div>
            <button class="btn btn-primary">保存</button>
        </form>
    </main>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            formData:{name:'',age:'',gender:'',hobbies:''}
        }
    },
    methods:{
        add(){
            //1.注册表单提交事件及处理函数
            //2.配置表单验证
            //3.收集表单数据
            //4.提交表单，发起请求，添加用户
            //5.添加成功跳转到列表页：编程式导航
            axios.post('http://localhost:3000/users',this.formData).then(res => {
                //this.$router.back()
                this.$router.push('/')
            })
        }
    }
}
</script>
<style>
    
</style>


