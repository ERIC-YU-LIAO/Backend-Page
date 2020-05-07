<template>
    <div>
            <!-- isLoading 元件讀取效果 -->
        <loading :active.sync="isLoading"></loading> 
        <!--  card  元件-->
        <div class="row mt-4">
    <div class="col-md-4 mb-4" v-for="item in products" :key="item.id"> 
    <div class="card border-0 shadow-sm">
        <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage:`url(${item.imageUrl})`}">
        </div>
        <div class="card-body">
        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
        <h5 class="card-title">
            <a href="#" class="text-dark">{{item.title}}</a>
        </h5>
        <p class="card-text">{{item.content}}</p>
        <div class="d-flex justify-content-between align-items-baseline">
            <!-- 前者顯示原價 -->
            <div class="h5" v-if="!item.price">原價{{item.origin_price}}</div>
             <!-- 後者顯示原價+ 優惠價 -->  
            <del class="h6" v-if="item.price">原價{{item.origin_price}}</del>
            <div class="h5" v-if="item.price">現在只要{{item.price}}</div>
        </div>
        </div>
        <div class="card-footer d-flex">
                                                    <!--item.id 每一項產品的id  -->
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getproduct(item.id)"> 
                <i class="fas fa-spinner fa-spin" v-if='status.isLoading ===item.id'></i>
                查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addcart(item.id)">
                <i class="fas fa-spinner fa-spin"  v-if='status.isLoading ===item.id'></i>
                加到購物車
            </button>
        </div>
    </div>
    </div>
        </div>        


<!-- 顯示產品列表卡片 -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
<!-- 產品表單內容 -->
     <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <div class="modal-body">
                        <img :src="product.imageUrl" class="img-fluid" alt="">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{ product.content }}</p>
                        <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                        </blockquote>
                            <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                            <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                        </div>
                        <select name="" class="form-control mt-3" v-model="product.num">
                    <option :value="num" v-for="num in 10" :key="num">
                        選購: {{num}} {{product.unit}}
                    </option>
                    </select>
                </div>
                        <div class="modal-footer">
                            <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                            </div>
                            <button type="button" class="btn btn-primary" 
                            @click="addcart(product.id,product.num)"> 
                            <!-- 方法 addcart product的id 和數量 -->
                            <i class="fas fa-spinner fa-spin"></i>
                            加到購物車
                            </button>
                        </div>
                </div>
            </div>
        </div>

    <!-- 新增購物車表單 -->
    <div class="mt-5 row justify-content-center">
    <table class="table col-6"> 
            <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
        <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removecart(item.id)">
                    <i class="far fa-trash-alt"></i>
                    </button>
                </td>
                <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                    </div>
                </td>
                <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr>
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
        </tfoot>
        </table>
    </div>
    <div class="md-5 row justify-content-center">
        <div class="input-group mb-3 input-group-sm col-6">
        <input type="text" class="form-control" placeholder="請輸入優惠碼">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode()">
            套用優惠碼
            </button>
        </div>
    </div>

    </div>


        <!-- 訂單建立及購物車頁面驗證模板 -->
        <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="creatOrder">
             <div class="form-group">
            <label for="useremail">*Email</label>
            <!-- v-validate="'required|email'" required為驗證方式 -->
            <!-- :class="{'is-invalid':errors.first('email')}" 如驗證失敗class跑出錯誤框 -->
            <!-- v-if="errors.has('email')" 判斷為錯誤會跳出訊息 -->
               <input type="email" class="form-control" name="email" id="useremail" placeholder="請輸入 Email"
                 v-model="form.user.email"  v-validate="'required|email'" :class="{'is-invalid':errors.first('email')}">
            <span class="text-danger" v-if="errors.has('email')">請輸入郵件</span>
            </div>
        
            <div class="form-group">
            <label for="username">*收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username" placeholder="輸入姓名" 
              v-model="form.user.name" v-validate="'required'" :class="{'is-invalid':errors.first('name')}">
            <span class="text-danger" v-if="errors.first('name')">必須輸入姓名</span>
            </div>
        
            <div class="form-group">
            <label for="usertel">*收件人電話</label>
             <input type="tel" class="form-control" id="usertel"  name="tel" placeholder="請輸入電話" v-model="form.user.tel"
                v-validate="'required|digits:10'" :class="{'is-invalid':errors.first('tel')}">
                <span class="text-danger" v-if="errors.first('tel')">請輸入電話</span>
            </div>
        
            <div class="form-group">
            <label for="useraddress">*收件人地址</label>
              <input type="text" class="form-control" name="address" id="useraddress" 
                placeholder="請輸入地址" v-model="form.user.address" v-validate="'required'" :class="{'is-invalid':errors.first('address')}">
            <span class="text-danger" v-if="errors.first('address')">地址欄位不得留空</span>
            </div>
        
            <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control" cols="30" rows="10"></textarea>
            </div>
            <div class="text-right">
               <button class="btn btn-danger">送出訂單</button>
            </div>
        </form>
        </div>


    </div>
</template>

<script>
import $ from 'jquery'


export default {
        data(){
        return {
            // 資料結構運用
            products:[], 
            product:{}, // 修改&刪除單一物件
            cart:{},  //購物車取的單一物件
            form :{  //結帳須填寫物件建立訂單
                user:{
                    name:'',
                    email:'',
                    tel: '' ,
                    address:'',
                },
                message:'',
            }, 
            status:{
                loadingitem:'',  
            },
            coupon_code:'',
            isLoading: false,
        };
        },
        methods:{
        getproducts(){
            const api = `https://vue-course-api.hexschool.io/api/font22/products`
            const vm = this 
            vm.isLoading = true  // 還沒抓到API 先轉圈圈(讀取)
            this.$http.get(api).then((response)=>{
                console.log(response.data)
                vm.products = response.data.products
                vm.isLoading = false // 抓到API 停止先轉圈圈(讀取)
            })
        },
        getproduct(id){
            const api = `https://vue-course-api.hexschool.io/api/font22/product/${id}`
            const vm = this 
            // vm.isLoading = true  // 還沒抓到API 先轉圈圈(讀取)
            vm.status.loadingitem = id
            this.$http.get(api).then((response)=>{
                console.log(response)
                vm.product = response.data.product
                $('#exampleModalLong').modal('show')
                vm.status.loadingitem = '';
            })
        },
        // 取得單一商品內加入購物車
        addcart(id, qty = 1 ){
            const api = `https://vue-course-api.hexschool.io/api/font22/cart`
            const vm = this
            vm.status.loadingitem = id;
            const cart = {
                product_id : id, // Cart 主要抓 product 的 id
                qty, //數量
            }
            // {data:cart} 以物件方式去新增
            this.$http.post(api,{data:cart}).then((response)=>{
                console.log(response)
                vm.status.loadingitem = '';
                vm.getaddcart() //把購物車取得回來
                $('#exampleModalLong').modal('hide') // 關掉產品列表
            })
        },
        // 取得購物車內所有商品
        getaddcart(){
            const api = `https://vue-course-api.hexschool.io/api/font22/cart`
            const vm = this 
            vm.isLoading = true  // 還沒抓到API 先轉圈圈(讀取)
            this.$http.get(api).then((response)=>{
                console.log(response.data)
                vm.cart = response.data.data
                vm.isLoading = false // 抓到API 停止先轉圈圈(讀取)
            })
        },
        // 刪除列表單一物件
        removecart(id){
            const api = `https://vue-course-api.hexschool.io/api/font22/cart/${id}`
            const vm = this 
            vm.isLoading = true  // 還沒抓到API 先轉圈圈(讀取)
            this.$http.delete(api).then((response)=>{
                console.log(response.data)
                vm.getaddcart() // 重新取得
                vm.isLoading = false // 抓到API 停止先轉圈圈(讀取)
            })
        },
        addCouponCode(){
            const api = `https://vue-course-api.hexschool.io/api/font22/coupon`
            const vm = this 
            const coupon ={
                code: vm.coupon_code,
            }
            vm.isLoading = true  // 還沒抓到API 先轉圈圈(讀取)
            this.$http.post(api,{data:coupon}).then((response)=>{
                console.log(response)
                vm.getaddcart() // 重新取得
                vm.isLoading = false // 抓到API 停止先轉圈圈(讀取)
            })
        },
        creatOrder(){
                const api = `https://vue-course-api.hexschool.io/api/font22/order`
                const vm = this 
                const order = vm.form
                // validator這個方法去驗證
                this.$validator.validate().then((result)=>{
                    if(result){
                    // 如結果符合input required 的標準時就可post資料出去
                    this.$http.post(api, {data:order}).then((response)=>{
                    console.log('訂單成立',response)
                    // vm.getaddcart() // 重新取得
                    if(response.data.success){
                        vm.orederId = response.data.orderId 
                        vm.$router.push(`/customerCheck/${response.data.orderId}`)//結帳頁面需要接收 orderId去判斷此訂單
                    }
                })
                    }else{
                        // 未符合(尚未填寫好) 會直接跳錯
                        console.log('Fail')
                        alert('表單尚未完成')
                    }
            })
         },
        },
        created() {
            this.getproducts()
            this.getaddcart()
        },
    }
</script>