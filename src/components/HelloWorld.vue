<template>
  <div>
    <a href="#" @click.prevent="login">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      
    }
  },
  methods:{
    login(){
        const api = 'https://vue-course-api.hexschool.io/logout'
        const vm = this
        this.$http.post(api).then((response)=>{
      console.log(response.data,"登出")
      if(response.data.success){
        return vm.$router.push('/login')
      }
    })
    }
  }
}
</script>