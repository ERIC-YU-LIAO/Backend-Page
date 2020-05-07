<template>
    <div>
        <div class="text-right">
            <button class="mt-3 btn btn-primary" @click="openModal(true)">
                建立優惠劵
            </button>
        </div>

        <table class="table mt-3">
            <thead>
                <th>訂單Title</th>
                <th>折扣數</th>
                <th>折扣截止日</th>
                <th>是否啟用</th>
                <th>修改</th>
            </thead>

            <tbody>
                <tr v-for="(item,key) in coupons" :key="key">
                    <td>{{item.title}}</td>
                    <td>{{item.percent}}%</td>
                    <td>{{item.due_date[0]}}-{{item.due_date[1]}}-{{item.due_date[2]}}</td>
                    <td>
                        <!-- is_enabled綁定( true/false ) 進行開關 -->
                        <span v-if="item.is_enabled" class="text-success">啟用</span>
                        <span v-else class="text-danger">未啟用</span>
                    </td>
                    <td>
                        <!-- 當判斷為 false 可以塞一個物件item 做改變 -->
                        <button class="btn btn-outline-dark btn-sm" @click="openModal(false,item)">編輯</button>
                        <br>
                        <button class="btn btn-outline-danger btn-sm" @click="delopenModel(item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>



        <!--  couponModal -->

<div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="couponModalLabel">
                <span>優惠券表單</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <div class="row">
                <div class="form-row">
                    <div class="form-group col-12">
                    <label for="title">優惠券說明</label>
                    <input type="text" class="form-control" id="title" placeholder="請輸入優惠券標題" v-model="temcoupon.title">
                    </div>
                <hr >
                    <div class="form-group col-12">
                    <label for="code">折扣碼</label>
                    <input type="text" class="form-control" id="code" placeholder="請輸入折扣碼"  v-model="temcoupon.code">
                    </div>
                </div>
                 <hr >
                <div class="form-row">
                    <div class="form-group col-4">
                    <label for="percent">折扣</label>
                    <input type="number" class="form-control" id="percent" placeholder="請輸入折扣"  v-model="temcoupon.percent" >
                    </div>
                     <hr >
                    <div class="form-group col-8">
                    <label for="due_date">到期日</label>
                    <input type="date" class="form-control" id="due_date" placeholder="請輸入到期日" v-model="temcoupon.due_date" >
                    </div>
                </div>
                </div>
                <div class="form-group">
                <div class="form-check">
                    <!--is_enabled綁定是否啟用  動態綁定value值  -->
                    <input class="form-check-input" type="checkbox" id="is_enabled" 
                    v-model="temcoupon.is_enabled" :true-value="1" :false-value="0"> 
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updatedCoupon">確認</button>
            </div>
            </div>
        </div>
        </div>


        
        <!-- 刪除 -->
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除優惠劵</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="text-left">
                <h4>
是否刪除
               
                 <span class="text-danger">{{temcoupon.title}}優惠劵</span>
 </h4>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="delCoupon">確認刪除</button>
            </div>
            </div>
        </div>
        </div>


        
        
    </div>
</template>
<style scoped>
*{
    /* border: 1px solid red; */
}

.modal-body{
    margin-left: 20%;
   /* position: relative; */
   /* right: -20%; */
   /* left: 50%; */
}
</style>

<script>
import $ from 'jquery'
export default {
    data(){
        return {
            coupons:[],
            isNew: false, //是否新增優惠劵
            temcoupon:{}, // 新增優患劵的物件
        }
    },
    methods:{
        getCoupon(){
          const api = `https://vue-course-api.hexschool.io/api/font22/admin/coupons`
          const vm = this
          this.$http.get(api).then((response)=>{
              console.log('response.data.coupons',response.data)
                vm.coupons = response.data.coupons; // 取得 API 資料至 coupons[] 中
                vm.coupons.forEach(function(item){
                    const dateTime = new Date(item.due_date).getTime();
                    const timeStamp = Math.floor(dateTime/ 1000);
                    const date = new Date(timeStamp * 1000);
                    const dateVaule =[
                        date.getFullYear(),
                        date.getMonth()+1,
                        date.getDate(),
                    ]
                    item.due_date = dateVaule,
                    vm.coupons.due_date = date;
                })
          });
          
        },
        openModal(isNew,item){
            if(isNew){
                this.temcoupon={};
                this.isNew = true
            }else{
                this.temcoupon = Object.assign({},item);  // {}為新增一個物件，item指的是原始建立檔案
                this.isNew = false
            }
            $('#couponModal').modal('show');
        },
        updatedCoupon() {
                let api = `https://vue-course-api.hexschool.io/api/font22/admin/coupon`
                let httpMethod = "post"
                const vm = this 
                if (!vm.isNew){
                    api =`https://vue-course-api.hexschool.io/api/font22/admin/coupon/${vm.temcoupon.id}`
                    httpMethod = 'put'
                }
                this.$http[httpMethod](api,{data:vm.temcoupon}).then((response)=>{
                    if(response.data.success){
                        $('#couponModal').modal('hide');
                        vm.getCoupon()
                    }else{
                        $('#couponModal').modal('hide');
                        vm.getCoupon()
                        alert('新增失敗')
                    }
                })
        },
        delopenModel(item){
            // 
            this.temcoupon = item
            $("#delCouponModal").modal('show');
            
        },
        delCoupon(){
            const vm = this
            const api = `https://vue-course-api.hexschool.io/api/font22/admin/coupon/${vm.temcoupon.id}` //temcoupon.id 單一個物件
            this.$http.delete(api).then((response)=>{
                // vm.coupons = response.data.coupons
                if(response.data.success){
                    console.log("temcoupon.id",response.data)
                    $("#delCouponModal").modal('hide');
                    vm.getCoupon()
                }else{
                      $("#delCouponModal").modal('hide');
                    vm.getCoupon()
                    alert('未刪除')
                }
            })
        }


    },
    created(){
        this.getCoupon();
    }
    
}
</script>