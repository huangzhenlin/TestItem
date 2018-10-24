<template>
    <div id='app'>
        <appnav></appnav>
        <router-view></router-view>
    </div>
</template>
<script>
    import appnav from './components/Nav.vue'
    export default{
        components:{
            appnav
        }
    }
</script>
<style>
    
</style>

