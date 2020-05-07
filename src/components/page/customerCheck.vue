<template>
        <div class="my-5 row justify-content-center">
aa                    <!-- <form class="col-md-6">
                        <table class="table">
                        <thead>
                            <th>品名</th>
                            <th>數量</th>
                            <th>單價</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in order.products" :key="item.id">
                                    <td class="align-middle">{{ item.product.title }}</td>
                                    <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                                    <td class="align-middle text-right">{{ item.final_total }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                            <td colspan="2" class="text-right">總計</td>
                            <td class="text-right">{{ order.total }}</td>
                            </tr>
                        </tfoot>
                        </table>
                        <table class="table">
                        <tbody>
                            <tr>
                            <th width="100">Email</th>
                            <td>{{ order.user.email }}</td>
                            </tr>
                            <tr>
                            <th>姓名</th>
                            <td>{{ order.user.name }}</td>
                            </tr>
                            <tr>
                            <th>收件人電話</th>
                            <td>{{ order.user.tel }}</td>
                            </tr>
                            <tr>
                            <th>收件人地址</th>
                            <td>{{ order.user.address }}</td>
                            </tr>
                            <tr>
                            <th>付款狀態</th>
                            <td>
                                <span v-if="!order.is_paid">尚未付款</span>
                                <span v-else class="text-success">付款完成</span>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <div class="text-right" v-if="order.is_paid === false">
                        <button class="btn btn-danger">確認付款去</button>
                        </div>
                    </form> -->
            </div>
    </template>

<script>
export default{
        data(){
            return {
                // order:購買結束的清單空物件
                order:{
                    // 資料結構型態包 user:order內的user 包下方的email。name，tel，address
                    user:{}, 
                },
                orderId: '',
            };
        },
        methods:{
            getorder(){
                const vm = this
                const api = `https://vue-course-api.hexschool.io/api/font22/order/${vm.orderId}`
                // vm.isLoading = true; //持訊讀取
                this.$http.get(api).then((response)=>{
                vm.order = response.data.order //抓到order內API 資料結構導入order 物件中 HTML進行渲染
                console.log('抓到完整訂單',response);
                vm.isLoading = false // Stop Loading
                })
            },
            payorder(){
                const vm = this
                const api = `https://vue-course-api.hexschool.io/api/font22/pay/${vm.orderId}`
                // vm.isLoading = true; //持訊讀取
                this.$http.post(api).then((response)=>{
                    if(response.data.success){
                        this.getorder() 
                        alert('已付款')
                    }
                console.log('已付款',response);
                vm.isLoading = false // Stop Loading
                })
            }
        },
        created(){
            this.orderId = this.$route.params.orderId //取得網址ID
            console.log(this.orderId)
            this.getorder()  //ajax抓到完整訂單Data !important
        }
}
    </script>