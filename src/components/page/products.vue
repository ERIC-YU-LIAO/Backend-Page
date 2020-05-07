<template>
    <div>
      <div class="text-right">
        <!-- isLoading 元件讀取效果 -->
        <loading :active.sync="isLoading"></loading> 
        <button class="mt-3 btn btn-primary" 
        @click="openModel(true)">建立產品</button>
      </div>
      <table class="table mt-3">
        <thead>
          <th width="200">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="160">是否啟用</th>
          <th width="160">編輯</th>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key='item.id'>
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | currency }}</td>
            <td class="text-right">{{item.price |currency }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>不啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-primary" 
               @click="openModel(false,item)">編輯</button>
              <button class="btn btn-outline-danger" @click.prevent="deletemodel(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>


    <!-- 分頁Template  pagination 說明-->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- disabled 無法點擊 當pagination為最前頁 -->
        <li class="page-item" :class="{'disabled': !pagination.has_pre}" > 
          <!-- @click 方法 當getproducts( pagination.目前頁-1 )方法內 -->
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getproducts(pagination.current_page -1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 如是在現在頁籤會執行 動態 active 動作 -->
        <li class="page-item" v-for="page in pagination.total_pages" :key='page' :class="{'active':pagination.current_page == page}">
          <!-- getproducts(page) 目前預設為 第一頁 -->
          <a class="page-link" href="#" @click.prevent="getproducts(page)"> {{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <!-- @click 方法 當getproducts( pagination.目前頁+1 )方法內 -->
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getproducts(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
 
 <!-- modal 模板 -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結" v-model="demoproducts.imageUrl">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-spinner fa-spin"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadImg">
            </div>
            <img class="img-fluid" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="demoproducts.title">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category"
                  placeholder="請輸入分類"  v-model="demoproducts.category">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價" v-model="demoproducts.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price"
                  placeholder="請輸入售價" v-model="demoproducts.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                placeholder="請輸入產品描述" v-model="demoproducts.description"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容" v-model="demoproducts.content"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_enabled" 
                  v-model="demoproducts.is_enabled"
                  :true-value='1'
                  :flase-value='0'
                  >
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click.prevent="getdemoproducts">確認</button>
      </div>
    </div>
  </div>
</div>

<!-- 刪除模板 -->
<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除 <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click.prevent="deleteproduct">刪除</button>
      </div>
    </div>
  </div>
</div>

</div>
    <!-- </div> -->
</template>



<script>
import $ from 'jquery'
export default {
    data(){
      return {
        products:[],
        pagination:{},  //pagination 分頁內容
        demoproducts:{},
        isNew:false,
        isLoading: false,
      };
    },
      methods: {
        // page = 1 參數先預設為1 
        getproducts(page){
          const vm = this 
          const api = `https://vue-course-api.hexschool.io/api/font22/products?page=${page}`
          vm.isLoading = true  // 還沒抓到API 先轉圈圈(讀取)
          this.$http.get(api).then((response)=>{
            console.log('取得資料',response.data)
            vm.products = response.data.products
            vm.isLoading = false // 抓到API 停止先轉圈圈(讀取)
            vm.pagination = response.data.pagination  //分頁內容 = 我抓到到的Data.pagination
          })
        },
        // isNew 判斷為Y/N , item 為物件 
        openModel(isNew,item){
          // 如果沒有填寫的話
          if(isNew){
            // model 為空的
            this.demoproducts = {};
            this.isNew = true; //新曾的
            // 如果有填寫的話
          }else{
            // model 為有資料的
            //Object.assign()被用來複製一個或多個物件自身所有可數的屬性到另一個目標物件。回傳的值為該目標物件。
            this.demoproducts = Object.assign({},item)
            this.isNew = false //舊的
          }
            $('#exampleModal').modal('show');
        },

        // issue 無法確認更新是因同源政策Cookie無法存取你的api ，此政策下瀏覽器無法存取跨域的Cookie，需再瀏覽器設定值。
        // https://paper.dropbox.com/doc/Vue-API-28OrjdvBouPMjspZUM7h7
        //同源政策 (Same-origin policy) (https://developer.mozilla.org/zh-TW/docs/Web/Security/Same-origin_policy)
        getdemoproducts(){
          const vm = this;
          let api = `https://vue-course-api.hexschool.io/api/font22/admin/product`;
          //切換httpmethod 方法
          let httpMethod = 'post';
          // 如果model有填寫api 需更換put方法 做更新的動作
          if(!vm.isNew){
                api = `https://vue-course-api.hexschool.io/api/font22/admin/product/${vm.demoproducts.id}`
                httpMethod = 'put';
          }
          // 使用post方法新增至demoproducts內的物件
          this.$http[httpMethod](api, {data:vm.demoproducts}).then((response)=>{
            console.log('demoproducts',response.data)
            //products [] = demoproducts{} 兩個須同步 demoproducts 用v-model綁定exampleModal的Modal
            // vm.products = response.data.demoproducts
            //取得 getproducts()的方法 
            // 結束完立即關閉
            if(response.data.success){
            $('#exampleModal').modal('hide');
              vm.getproducts()
            }else{
            $('#exampleModal').modal('hide');
              // vm.getproducts()
            console.log('新增失敗')
            }
          })
        },
        // 跳出刪除模板
        deletemodel(item){
          $('#delProductModal').modal('show');
          this.demoproducts = item
        },
        // 刪除功能
        deleteproduct(){
          const vm = this 
          const api =`https://vue-course-api.hexschool.io/api/font22/admin/product/${vm.demoproducts.id}`
          this.$http.delete(api).then((response)=>{
            console.log(response.data);
            if(response.data.success){
              $('#delProductModal').modal('hide');
                vm.getproducts()
            }else{
              $('#delProductModal').modal('hide');
                vm.getproducts()
                console.log('Fail')
            }
          })
        },
        uploadImg(){
          console.log(this) //指向vue 元件
          const uploadfile = this.$refs.files.files[0]
          const vm = this
          const formData = new FormData()  // 傳統表單待形式
          formData.append('file-to-upload',uploadfile)  // 'file-to-upload' 為form 得欄位 uploadImg為檔案(data)
          const api = "https://vue-course-api.hexschool.io/api/font22/admin/upload"
          this.$http.post(api,formData,{
            headers:{
              'content-type':'multipart/form-data',
            }
          }).then((response)=>{
            console.log(response.data,'img')
            //成功的話
            if(response.data.success){ 
              // vm.demoproducts.imageUrl = response.data.imageUrl
                vm.$set(vm.demoproducts,'imageUrl', response.data.imageUrl)// $set強制寫入
              console.log(vm.demoproducts,'以傳入')
            }else{
              this.$bus.$emit('message:push', response.data.message, 'danger')
            }
          })
        }
      },
      created() {
        this.getproducts();
        // alert 元件使用 eventbus方法與外層溝通 --------------------------------------------------
        // $bus方法使用 $emit 讓子元件直接與Root溝通
        // 'message:push' 方法 
        // '靠' message 
        //  primary  為bootstrap '樣式模板
        // this.$bus.$emit('message:push', '靠', 'primary')
        // ----------------------------------------------------
      },   
}
</script> 