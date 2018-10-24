<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <ul class="navbar-nav mr-auto">
            <router-link to='/' class="nav-item active" tag='li' exact>
                <a class="nav-link">用户列表</a>
            </router-link>
            <router-link to='/new' class="nav-item" tag='li'>
                <a class="nav-link">添加用户</a>
            </router-link>
            <router-link to='/hello' class="nav-item" tag='li'>
                <a class="nav-link">关于</a>
            </router-link>
        </ul>
    </nav>
</template>
<script>
export default {
    data(){
        return{}
    }
}
</script>
<style>
    
</style>

