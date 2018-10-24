<template>
    <main class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>爱好</th>
                    <th class="text-center" width="140">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.gender }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.hobbies }}</td>
                    <td>
                        <router-link :to="`/edit?id=${item.id}`">编辑</router-link>
                        <a href="#" @click.prevent="deletById(item.id)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.loadList()
    },
    methods:{
        async loadList(){
                axios.get('http://localhost:3000/users').then(res=>{
                this.list=res.data
            })
        },
        //1.注册删除事件处理函数
        //2.发起请求处理数据
        //3。根据响应结果处理
        deletById(id){
            if(!window.confirm('确定删除吗？')){
                return
            }
            axios.delete(`http://localhost:3000/users/${id}`).then(res=>{
                this.loadList()
            })
        }
    }
}
</script>
<style>
    
</style>


