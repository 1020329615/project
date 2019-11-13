<template>
    <div class="person">
        <div class="top">
            <van-icon name="setting-o"  size="0.4rem" info="10" @click="del()"/>
            <h1>个人中心</h1>
            <van-icon name="chat-o" size="0.4rem"/>
            <div class="head" @click="$router.push('/login')">
                <img :src="info.avatarUrl" alt="" v-if="flag">
            </div>
        </div>
        <div class="login">
            <h2 @click="$router.push('/login')" v-if="!flag">点击登录</h2>
            <h2 v-if="flag">{{info.signature}}</h2>
            <van-icon name="like-o" color="red"/>
            <span>点击收藏</span>
        </div>
        <div class="order">
            <h1>我的订单</h1>
            <h2>查看所有订单</h2>
        </div>
        <div class="active">
            <div>
                <img src="../../assets/images/icon_10.png" alt="">
                <p>待付款</p>
            </div>
            <div>
                <img src="../../assets/images/icon_14.png" alt="">
                <p>待发货</p>
            </div>
            <div>
                <img src="../../assets/images/icon_11.png" alt="">
                <p>待收货</p>
            </div>
            <div>
                <img src="../../assets/images/icon_12.png" alt="">
                <p>待评价</p>
            </div>
            <div>
                <img src="../../assets/images/icon_13.png" alt="">
                <p>售后退款</p>
            </div>
            
        </div>
        <div class="addres">
            <p>地址收货管理</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            info:'',
            phone:'',
            password:'',
            flag:false
        }
    },
    methods: {
        del(){
        // 点击将登录信息删除
            if(sessionStorage.username && sessionStorage.password){
                sessionStorage.removeItem('username')
                sessionStorage.removeItem('password')   
                this.$toast.success('退出登录成功')      
            }else{
                this.$toast('暂未登录')
            }
        }
    },
    mounted() {
        if(sessionStorage.password && sessionStorage.username){
            let a = sessionStorage.getItem('username')
            let b = sessionStorage.getItem('password')
            console.log(a,b,'登录信息')
            this.$http({
                    url:'http://localhost:3000/login/cellphone',
                    params:{
                        phone:a,
                        password:b
                    }
                })
                .then(res=>{
                    this.flag=true;
                    console.log(res,'本地session登录')
                    this.info = res.data.profile
                })
                .catch(err=>{
                    console.log(err,'登录失败')
                })
        }else{
            this.$toast('暂未登录')
        }
    },
}
</script>
<style scoped>
    .person{
        background: #f3f3f3;
    }
    .top{
        background: #ff9900;
        width: 6.9rem;
        height: 3rem;
        padding:0.3rem 0.3rem 0;
        color:#fff;
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .top h1{
        font-size:0.4rem;
    }
    .head{
        width: 1.8rem;
        height: 1.8rem;
        border:0.15rem solid #fff;
        background: #c9c9c9;
        border-radius: 50%;
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-1rem;
        margin-top:0.3rem;
        overflow: hidden;
    }
    .head img{
        width: 1.8rem;
        height: 1.8rem;
    }
    .van-icon{
        size:0.4rem;
    }
    .login{
        padding-top:0.9rem;
        padding-left:0.3rem;
        background: #fafafa;
        font:0.32rem/0.5rem '微软雅黑';
    }
    .login h2{
        text-align: center;
     }
    .login span{
        line-height: 1.1rem;
    }
    .order{
        display: flex;
        padding-left:0.4rem;
        justify-content: space-between;
        margin:0.1rem 0 1px;
        font:0.34rem/1.24rem '微软雅黑';
        background: #fafafa;
    }
    .order h2{
        color:#b1b1b1;
    }
    .active{
        padding:0.4rem 0 0.2rem; 
        background: #fafafa;
        display: flex;
    }
    .active img{
        height: 0.5rem;
    }
    .active div {
        color:#7c7c7c;
        margin:0 0.36rem;
        text-align: center;
    }
    .active p{
        font:0.24rem/0.7rem '微软雅黑';
    }
    .addres{
        margin-top:0.2rem;
        font:0.34rem/1.27rem '微软雅黑';
        background: #fafafa;
        padding-left:0.4rem;
        color:#c9c9c9;
    }
</style>

