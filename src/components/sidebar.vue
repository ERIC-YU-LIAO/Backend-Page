<template>
    <div>
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link" href="#">
                    <span data-feather="home"></span>
                    管理員 <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/products">
                    <i class="fas fa-box-open"></i>
                    產品列表</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/finishorder">
                    <i class="fas fa-database"></i>
                    完成定單</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/admin/coupon">
                    <i class="fas fa-ticket-alt"></i>
                    優惠劵</router-link>
                </li>
                </ul>

                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>模擬功能</span>
                <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle"></span>
                </a>
                </h6>
                <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <router-link to='/customerorder' class="nav-link">
                    <i class="fas fa-list-ul"></i>
                     模擬訂單
                    </router-link>
                </li>
                </ul>
            </div>
            </nav>
    </div>
</template>