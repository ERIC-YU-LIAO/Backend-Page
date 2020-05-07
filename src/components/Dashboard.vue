<template>
        <div>
            <alert/>
        <div class="container-fluid">
            <div class="row">
                <navbar/> 
                <sidebar/>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <router-view></router-view>
                </main>
            </div>
        </div>

            </div>
</template>


<script>

//元件需 注入 import vue檔
import navbar from './navbar'
import sidebar from './sidebar'
import alert from './alert'

export default {
    // components 以物件方式做設定
    components:{
        navbar,
        sidebar,
        alert,
}
}
</script>


<style>
*{
    /* border: 1px solid red; */
}
</style>