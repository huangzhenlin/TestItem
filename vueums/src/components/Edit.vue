<template>
    <main class="container">
        <form @submit.prevent="update" autocomplete="off">
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
    async created (){
        // this.$router 是路由实例对象
        // this.$route  是路由参数对象
        // this.$route.query 获取查询字符串参数
        const {id} = this.$route.query
        const {data} = await axios.get(`http://localhost:3000/users/${id}`)
        this.formData=data
    },
    methods:{
        async update(){
            const {id} = this.formData
            const {data} = await axios.patch(`http://localhost:3000/users/${id}`,this.formData)
            this.$router.back()
        }
    }
}
</script>
<style>
    
</style>


