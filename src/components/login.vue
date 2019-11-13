<template>
    <div>
        <div class="top">
            <van-icon name="arrow-left" @click="$router.go(-1)" />
            <span>登录</span>
            <router-link to="/sign">注册</router-link>
        </div>
        <div class="main">
            <div>
                <span>手机号：</span>
                <input type="text" v-model="phone">
            </div>
            <div>
                <span>密码：</span>
                <input type="text" v-model="password">
            </div>
        </div>
        <van-button color="#ff9900" @click="login()">登录</van-button>
    </div>
</template>
<script>
let reg1 = /^1[0-9]{10}$/;
let reg2 = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
export default {
    data(){
        return {
            phone:'',
            password:'',
            disable:''
        }
    },
    methods: {
        login(){
            this.disable = !(reg1.test(this.phone) && reg2.test(this.password),this.password)
            console.log(this.disable,reg2.test(this.password))
            // 也就是disable为false 验证都通过时 执行登录
            if(!this.disable){
                this.$http({
                    url:'http://localhost:3000/login/cellphone',
                    params:{
                        phone:this.phone,
                        password:this.password
                    }
                })
                .then(res=>{
                    console.log(res,'登录')
                    sessionStorage.setItem('username', this.phone)
                    sessionStorage.setItem('password', this.password)
                    this.$router.push('/person')
                })
                .catch(err=>{
                    console.log(err,'登录失败')
                })
            }
            
        }
    },
}
</script>
<style scoped>
    .top {
        font-size: 0.36rem;
        padding: 0.25rem 0.2rem;
        text-align: center;
        background: #ff9900;
        color: #fff;
        display: flex;
        justify-content: space-between;
    }
    .top a{
        color:#fff;
    }
    .van-icon {
        font-size: 0.4rem;
        color: #fff;
        
    }
    .main{
        padding:2rem 0.7rem 0;
    }
    .main div{
        width: 6rem;
        font:0.3rem/1.3rem '微软雅黑';
        border-bottom:2px solid #ccc;
    }
    .van-button{
        width: 6rem;
        margin:0.95rem 0.74rem;
    }

</style>

