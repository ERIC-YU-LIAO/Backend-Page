<template>
    <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">CTicket 後台系統</a>
        <input class="form-control form-control-dark w-100" type="text" 
        placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
            <a class="nav-link" href="#" @click.prevent="singout()">Sign out</a>
            </li>
        </ul>
        </nav>
    </div>
</template>


<script>
export default {
    methods:{
        singout(){
            const vm = this; 
            const url = `https://vue-course-api.hexschool.io/logout`
            this.$http.post(url).then((response)=>{
                console.log(response.data)
                if (response.data.success){
                    vm.$router.push('./singin')
                }
            })
        }
    }
}
</script>