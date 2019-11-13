<template>
    <div id="describe">
        <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="swiper in Detail.swiperImgArr"><img :src="swiper" alt=""></van-swipe-item>
            </van-swipe>
            <div class="icon one" @click="$router.go(-1)"><van-icon name="arrow-left" /></div>
            <div class="icon two" @click="$router.push('/car')"><van-icon name="cart-o" /></div>
            <div class="icon three"><van-icon name="ellipsis" /></div>
        </div>
        <hr>
        <div class="detail">
            <div class="message">
                <span>{{Detail.name}}</span>
                <div>
                    <img src="../assets/images/collect.png" alt="">
                    <p>收藏</p>
                </div>
            </div>
            <div class="price">
                <p class="first"><a>￥{{Detail.original_price}}</a><span>{{Math.round(Detail.allowance*1000)/100}}折</span><span v-if="Detail.isFreeShip">包邮</span><span v-if="!Detail.isFreeShip">不包邮</span></p>
                <p class="second"><a>￥{{Detail.reduct_price}}</a><span v-for="describe in Detail.describe">{{describe}}</span></p>
            </div>
        </div>
        <p class="hr">1</p>
        <div class="goods">
            <div class="nav">
                <div :class="[flag?'active':'']" @click="flag=true">商品详情</div>
                <div :class="[flag?'':'active']" @click="flag=false">卖家口碑</div>
            </div>
            <div v-if="flag" class="shopDes">
                <img :src="shopDes" alt="" v-for="(shopDes,index) in Detail.shopDes" :key="index">
            </div>
            <div v-if="!flag" class="evaluate">
                <div >
                    <div>
                        <a :class="[num == i?'active':'']" @click="change(arr.sort,i)" v-for="(arr,i) in arr" :key="arr.val">{{arr.val}}</a>
                    </div>
                    <p class="p">|</p>
                    <div class="client" v-for="allval in Detail.buyerReviews[temp]">
                        <h3>{{allval.buyerName}}</h3>
                        <img :src="postImg" alt="" v-for="postImg in allval.postImg">
                        <p>{{allval.postDescribe}}客户发表的评论</p>
                        <div>
                            <p>管理员：{{allval.adminReviews}}</p>
                        </div>
                        <em>{{allval.createTime}}</em>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div><p>总价：<em>￥{{Detail.reduct_price}}</em></p></div>
            <div @click="show=true">加入购物车</div>
            <div>立即购买</div>
        </div>

        <div v-if="show" class="mask">
            <div class="con">            
                <div class="header">
                    <div><img src="../assets/images/details01.png" alt=""></div>
                    <div>
                        <h2>￥{{Detail.reduct_price}}</h2>
                        <p>库存{{Detail.total}}件</p>
                        <p>请选择商品属性</p>
                    </div>
                </div>
                <div>
                    <span>购买数量</span>
                    <van-stepper v-model="buyNum" />
                </div>
                <div class="select">
                    <h3>{{Detail.buySelect[0].name}}</h3>
                    <a :class="[sizeNum==listI ?'active':'']" v-for="(list,listI) in Detail.buySelect[0].list" :key="listI" @click="sizeNum=listI">{{list}}</a>
                </div>
                <div class="select">
                    <h3>{{Detail.buySelect[1].name}}</h3>
                    <a :class="[ageNum==ageI ?'active':'']" v-for="(age,ageI) in Detail.buySelect[1].list" :key="ageI" @click="ageNum=ageI">{{age}}</a>
                </div>
                
                
                <div class="bottom">
                    <div class="allP">总价：<span>￥{{Detail.reduct_price * buyNum}}</span></div>
                    <div class="shop" @click="gocar">加入购物车</div>
                    <div class="buy" @click="gobuy">立即购买</div>
                </div>
                <em @click="show=false"><van-icon name="close" size="0.5rem"/></em>
            </div>
        </div>        
        
    </div>
</template>
<script>
export default {
  // el:"#describe",
  data() {
    return {
      buyNum:1,
      sizeNum:0,
      ageNum:0,
      num:0,
      arr:[{
          sort:'all',
          val:'全部评价',
      },{
          sort:'good',
          val:'好评',
      },{
          sort:'bad',
          val:'差评',
      },{
          sort:'postForm',
          val:'晒单',
      }],
      show: false,      //控制购物信息的出现    
      flag: true,       //详情与口碑的切换
      Detail: {},
      temp:'all',
    };
  },
  computed: {
    
  },
  mounted() {
      let pid = this.$route.query.pid
      console.log(pid,'pid ID')
    this.$http({
        url:'http://yd.msword.top/getDetails',
        params:{
            pid
        }
    })
    .then(res=>{
        console.log(res,'详情数据')
        this.Detail = res.data.data
    })
    .catch(err=>{
        console.log(err,'详情数据失败')
    })
  },
  methods: {
    change(val,i){
    this.num = i;
    this.temp = val;
    },
    // 点击加入购物车
    gocar(){
        let arr = [];
        let obj = {
            name:this.Detail.name,
            size:this.Detail.buySelect[0].list[this.sizeNum],
            age:this.Detail.buySelect[1].list[this.ageNum],
            buyNum:this.buyNum,
            price:this.Detail.reduct_price,
            allPrice:this.Detail.reduct_price * this.buyNum,
            img:'http://yd.msword.top/static/img/details01.png',
            checked:false
        }
        if(localStorage.getItem('arrCar')){
            arr = JSON.parse(localStorage.getItem('arrCar'))
            arr.push(obj)
            localStorage.setItem('arrCar',JSON.stringify(arr))
            this.$toast.success('快去购物车看看吧');
        }else{
            arr.push(obj)
            localStorage.setItem('arrCar',JSON.stringify(arr))
            this.$toast.success('快去购物车看看吧');
        }
    },
    // 点击立即购买
    gobuy(){
        let arr = [];
        let obj = {
            name:this.Detail.name,
            size:this.Detail.buySelect[0].list[this.sizeNum],
            age:this.Detail.buySelect[1].list[this.ageNum],
            buyNum:this.buyNum,
            price:this.Detail.reduct_price,
            allPrice:this.Detail.reduct_price * this.buyNum,
            img:'http://yd.msword.top/static/img/details01.png',
            checked:false
        }
        if(localStorage.getItem('arrCar')){
            arr = JSON.parse(localStorage.getItem('arrCar'))
            arr.push(obj)
            localStorage.setItem('arrCar',JSON.stringify(arr))
            this.$toast('加入到购物车了');
        }else{
            arr.push(obj)
            localStorage.setItem('arrCar',JSON.stringify(arr))
            this.$toast('加入到购物车了');
        }
       
        console.log(obj)
    }
  }
};
</script>
<style scoped>
.select .active{
    background: #ff9900;
    color: #fff;
}
.select h3{
    font:.34rem/.9rem '微软雅黑';
    color:#333;
}
.select a{
    font:.28rem/.4rem '微软雅黑';
    padding:0.06rem 0.4rem;
    color:#999;
    background: #ddd;
    border-radius: 0.2rem;
    margin:0.1rem;
}
/* 购物车弹出的框的样式 */
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    left:0;
    top:0;
    background: rgba(0, 0, 0, 0.4);
}
.con{
    width: 7.5rem;
    background: #fff;
    position: absolute;
    bottom:0;
    left:0;
}
.con em{
    position: absolute;
    top:0.1rem;
    right:0.1rem;
}
.header{
    display: flex;
}
.header img{
    width: 2rem;
    vertical-align: bottom;
}
.header div:nth-of-type(1){
    width: 2rem;
    height: 2rem;
    border:3px solid #ccc;
    overflow: hidden;
}
.bottom{
    border-top:.01rem solid #eee;
    height: 0.95rem;
    font:0.34rem/0.95rem '微软雅黑';
    display: flex;
    text-align: center;
}
.allP{
    width: 3.5rem;
    color:#999;
}
.allP span{
    color:#e71f19;
}
.shop,.buy{
    width: 2rem;
    color:#fff;
}
.shop{
    background: #ff9900;
}
.buy{
    background: #e71f19;
}


.p {
  color: #fff;
  line-height: 0.2rem;
}
.goods .evaluate {
  padding: 0.1rem 0.3rem 2rem;
}
.evaluate a {
  margin-right: 0.1rem;
  color: #fff;
  padding: 0.05rem 0.4rem;
  background: rgba(0, 0, 0, 0.4);
  font-size: 0.3rem;
  line-height: 0.5rem;
  border-radius: 0.25rem;
}
.evaluate .client {
  border-top: 1px solid #999;
  /* border-bottom: 1px solid #999; */
  position: relative;
  padding-bottom: 0.3rem;
}
.evaluate .client h3 {
  color: #ff9900;
  font: 0.2rem/0.65rem "微软雅黑";
}
.evaluate .client img{
    width: 1.5rem;
    max-height: 2rem;
}
.evaluate .client em {
  position: absolute;
  top: 0.3rem;
  right: 0.4rem;
  font-size: 0.2rem;
  color: #999;
}
.evaluate .client p:nth-of-type(1) {
  font: 0.2rem/0.4rem "微软雅黑";
  color: #999;
}
.evaluate .client div p:nth-of-type(1) {
  font: 0.2rem/0.3rem "微软雅黑";
  color: #333;
  background: #ddd;
  border-radius: 0.2rem;
  padding: 0.2rem 0.1rem;
}
.evaluate .active {
  background: #ff9900;
  color: #fff;
}
.hr {
  background: #eee;
  line-height: 0.3rem;
  color: #eee;
}
.banner img {
  height: 5.4rem;
  position: relative;
}
.icon {
  width: 0.57rem;
  height: 0.57rem;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 50%;
  line-height: 0.57rem;
  text-align: center;
  font-size: 0.34rem;
  position: absolute;
  top: 0.1rem;
}
.one {
  left: 0.2rem;
}
.two {
  right: 1.2rem;
}
.three {
  right: 0.25rem;
}
.detail {
  padding: 0.2rem 0 0.2rem 0.2rem;
}
.detail .message {
  display: flex;
}
.detail .message div {
  width: 0.7rem;
  height: 0.7rem;
  border-left: 1px solid #dedede;
  padding-left: 0.3rem;
  margin-left: 0.5rem;
}
.detail .message span {
  font: 0.3rem/0.4rem "微软雅黑";
  color: #333;
}
.detail .message img {
  width: 0.36rem;
}
.detail .message p {
  font-size: 0.16rem;
  line-height: 0.3rem;
  color: #e71f19;
}
.detail .first a {
  color: #e71f19;
  font-size: 0.32rem;
  line-height: 0.46rem;
}
.detail .first span {
  color: #fff;
  background: #ff9900;
  margin: 0 0 0 0.3rem;
  font-size: 0.24rem;
  line-height: 0.3rem;
  padding: 0 0.15rem;
}
.detail .second {
  margin: 0.1rem 0 0.3rem 0;
}
.detail .second a {
  color: #ccc;
  font-size: 0.3rem;
  line-height: 0.3rem;
  text-decoration: line-through;
}
.detail .second span {
  color: #ff9900;
  font-size: 0.24rem;
  background: #fff;
  line-height: 0.3rem;
  margin: 0 0.2rem 0 0;
  border: 0.01rem solid #ff9900;
  padding: 0 0.1rem;
}
.goods .nav {
  margin-bottom: 0.3rem;
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-around;
  /* text-align: center; */
}
.goods .nav div {
  padding: 0 0.25rem;
  font-size: 0.26rem;
  line-height: 0.5rem;
  /* background: pink; */
}
.shopDes{
    text-align: center;
    max-width: 7.3rem;
}
.goods img{
    max-width: 7.3rem;
}
.goods .nav .active {
  border-bottom: 0.03rem solid #ff9900;
  color: #ff9900;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  height: 0.98rem;
  line-height: 0.98rem;
  font-size: 0.3rem;
}
.footer div:nth-of-type(1) {
  background: #dedede;
  color: #333;
  width: 3.5rem;
  text-indent: 1em;
}
.footer div:nth-of-type(1) em {
  color: #e71f19;
}
.footer div:nth-of-type(2) {
  text-align: center;
  width: 2rem;
  background: #ff9900;
  color: #fff;
}
.footer div:nth-of-type(3) {
  text-align: center;
  width: 2rem;
  background: #e71f19;
  color: #fff;
}
</style>
