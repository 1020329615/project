<template>
    <div>
        <!-- <h1>这是index </h1> -->       
        <router-view></router-view>
        <div class="footer">
            <div>
                <router-link to="/home" activeClass="active">
                    <van-icon name="wap-home-o" />
                    <p>首页</p>
                </router-link>
            </div>
            <div>
                <router-link to="/sort" activeClass="active">
                    <van-icon name="apps-o" />
                    <p>分类</p>
                </router-link>
            </div>
            <div>
                <router-link to="/car" activeClass="active">
                    <van-icon name="shopping-cart-o" />
                    <p>购物车</p>
                </router-link>
            </div>
            <div>
                <router-link to="/person" activeClass="active">
                    <van-icon name="contact" />
                    <p>个人</p>
                </router-link>
            </div>
        </div>
                
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .footer{
        width: 7.5rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left:0;
        display: flex;
        border-top:1px solid #eee;
        justify-content: space-around;
    }
    .footer div{
        /* width: 0.5rem; */
        margin:0 0.6rem;
        text-align: center;
        padding:0.2rem 0 0.2rem ;
        font-size: 0.24rem;
        line-height: 0.35rem;
    }
    .van-icon{
        font-size: 0.5rem;
    }
    .footer .active{
        color:#ff9900;
    }
</style>


