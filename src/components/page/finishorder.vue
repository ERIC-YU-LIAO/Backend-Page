<template>
    <div>
        <table class="table mt-3">
            <thead >
                <th width="100">訂單編號</th>
                <th width="120">姓名</th>
                <th width="120">Email</th>
                <th width="160">收件人電話</th>
                <th width="160">付款狀態</th>
                </thead>
            <tbody>
            <tr v-for="item in orders" :key='item.id'>
                <td>{{item.id}}</td>
                <td class="text-left">{{item.user.name}}</td>
                <td class="text-left">{{item.user.email}}</td>
                <td class="text-left">{{item.user.tel}}</td>
                <td>
                <span v-if="item.is_paid" class="text-success">付款</span>
                <span v-else class="text-danger">未付款</span>
                </td>
            </tr>
            </tbody>
            
        </table>

                <!-- 分頁template -->
            <nav aria-label="Page navigation example">  
                <ul class="pagination">
                    <li class="page-item" :class="{'disable':!pagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getoredrs(pagination.current_page -1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only" >Previous</span>
                    </a>
                    </li>
                    <li class="page-item" v-for="page in pagination.total_pages" :key="page.id" :class="{'active':pagination.current_page == page}">
                    <a class="page-link" href="#" @click="getoredrs(page)">{{page}}</a>
                    </li>
                    <li class="page-item" :class="{'disable':!pagination.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getoredrs(pagination.current_page +1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
                </nav>
            
    </div>
</template>



<script>
export default {
    data(){
        return{
            orders:{},
            pagination:{},
        }
    },
    methods:{
        getoredrs(page=1){
            const vm = this
            const api = `https://vue-course-api.hexschool.io/api/font22/orders?page=${page}`
            // vm.isLoading = true; //持訊讀取
            this.$http.get(api).then((response)=>{
            vm.orders = response.data.orders //抓到order內API 資料結構導入orders 物件中 HTML進行渲染
            // console.log(response,'aaa')
            vm.isLoading = false // Stop Loading
            vm.pagination = response.data.pagination
        })
    },
    },
        created() {
        this.getoredrs()
    },
    
    
}
</script>


<style>

/* *{
        border:1px solid red;
} */

</style>