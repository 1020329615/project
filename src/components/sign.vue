<template>
    <div>
        <div class="top">
            <van-icon name="arrow-left" @click="$router.go(-1)" />          
            <span>注册</span>
            <router-link to="/login">登录</router-link>
        </div>
        <div class="main">
            <div>
                <span>昵称：</span>
                <input type="text" v-model="nickname" @blur="(nickname?'':tips='昵称不能为空')">
            </div>
            <div>
                <span>手机号：</span>
                <input type="text" v-model="phone" @blur="phoneY()">
            </div>
            <div>
                <span>密码：</span>
                <input type="text" v-model="password" @blur="passY()">
            </div>
            <div>
                <span>验证码：</span>
                <input type="text" v-model="captcha">
                <input type="submit" @click="send()" v-model="msg" :disabled="isDisable">
            </div>
        </div>
        <van-button color="#ff9900" :disabled="(checked?false:true)" @click="sign()">下一步</van-button>
        <div class="require">
            <van-checkbox v-model="checked" shape="square" checked-color="#07c160">我已阅读并同意使用条款和隐私政策</van-checkbox>
        </div>
        <p id="tips">{{tips}}</p>
    </div>
</template>
<script>
let reg1 = /^1[0-9]{10}$/;
let reg2 = /^(?![A-z0-9]+$)(?![A-z~@*()_]+$)(?![0-9~@*()_]+$)([A-z0-9~@*()_]{6,15})$/;
let timer = null;
export default {
    data(){
        return {
            next:false,
            checked:false,
            isDisable:false,
            num:60,
            msg:'点击获取',
            nickname:'',
            phone:'',
            password:'',
            captcha:'',
            tips:''
        }
    },
    methods: {
        phoneY(){
            if(this.phone == ''){
                this.tips = '手机号不能为空'
            }else if(reg1.test(this.phone) == false){
                this.tips = '请输入正确的手机号'
            }else{
                this.tips = ''
            }
        },
        passY(){
            if(this.password == ''){
                this.tips = '密码不能为空'
            }else if(reg2.test(this.password)){
                this.tips = '密码为6-15位字母、数字、特殊字符的组合'
            }else{
                this.tips = ''
            }
        },
        send(){           
            // 手机号正确时，启动倒计时、获取验证码
            if(reg1.test(this.phone)){
                this.isDisable=true;
                timer = setInterval(()=>{
                    this.num--;
                    this.msg = this.num+'秒后可重新获取'
                    if(this.num == 0){
                        clearInterval(timer)
                        this.msg = '点击获取'
                    }
                },1000)
                this.$http({
                    url:'http://localhost:3000/captcha/sent',
                    params:{
                        phone:this.phone
                    }
                })
            }else{
                this.$toast('请输入正确的手机号')
            }
        },
        sign(){
            // 点击注册之前先验证验证码是否正确
             this.$http({
                url:'http://localhost:3000/captcha/verify',
                params:{
                    phone:this.phone,
                    captcha:this.captcha
                }
            }).then(res=>{
                console.log(res,'验证验证码')
                // 进行检测手机号是否已经注册
                 this.$http({
                    url:'http://localhost:3000/cellphone/existence/check',
                    params:{
                        phone:this.phone,
                    }
                }).then(res=>{
                    console.log(res,'检测手机号是否已经注册res')
                    if(res.data.exist == -1){
                        this.$toast('该手机号已经注册')
                    }
                }).catch(err=>{
                    console.log(err,'手机号是否已注册err')
                    console.log(err.response,'手机号是否已注册err.response')
                     // 手机号未进行注册时，进行注册
                    this.$http({
                        url:'http://localhost:3000/register/cellphone',
                        params:{
                            phone:this.phone,
                            password:this.password,
                            nickname:this.nickname,
                            captcha:this.captcha
                        }
                    }).then(res=>{
                        console.log(res,'注册成功')
                        this.$router.push('/home')
                    }).catch(err=>{
                        console.log(err,'注册失败')                        
                        this.$toast('注册失败')
                    })
                })               
            }).catch(err=>{
                console.log(err,'验证验证码失败')
                console.log(err.response,'response')
                this.$toast.fail(err.response.data.message)
            })
        }
    },
}
</script>
<style scoped>
    #tips{
        color:#fe0041;
        position: fixed;
        top:1.7rem;
        left:0.7rem;
    }
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
        color: #fff;
    }
    .van-icon {
        font-size: 0.4rem;
        color: #fff;
        
    }
    .main{
        padding:1rem 0.7rem 0;
    }
    .main div{
        width: 6rem;
        font:0.3rem/1.3rem '微软雅黑';
        border-bottom:2px solid #ccc;
    }
     .main div em{
         color:#fe0041;
         position: absolute;
         right: 0.75rem;
     }
    .van-button{
        width: 6rem;
        margin:0.95rem 0.74rem 0.3rem;
    }
    input[type=submit]{
        position: absolute;
        right: 0.75rem;
        background: #fff;
        color:#fe0041;
    }
    .require{
        font-size: 0.28rem;
        color:#999;
        text-align: center;
        padding-left:0.7rem;
    }
</style>

