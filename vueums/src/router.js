import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import New from './components/New.vue'
import Hello from './components/Hello.vue'
import Edit from './components/Edit.vue'

//这里直接默认导出的是new出来的router实例
export default new VueRouter({
    routes:[
        {path:'/',component:Home},
        {path:'/new',component:New},
        {path:'/hello',component:Hello},
        {path:'/edit',component:Edit},
    ]
})