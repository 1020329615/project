<template>
    <div class="box">
        <div class="banner">
            <input type="text" placeholder="请输入搜索关键词" v-model="value" />           
            <img src="../assets/images/index_bg.png" alt="">                  
            <img src="../assets/images/banner.png" alt="">
        </div>
        <div :class="[i == 0?'hot':'baby']" v-for="(list,i) in goodsList" :key="i">
            <div class="title">
                <h2><img :src="title[i].img" alt="">{{title[i].name}}</h2>
            </div>
            <div class="goods">
                <div v-for="item in list.list" :key="item.id" @click="detail(item.id)">
                    <img :src="item.thumbnail" alt="">
                    <h3>￥{{item.original_price}}</h3>
                    <p>{{item.name}}</p>
                    <span>￥{{item.reduct_price}}</span>
                </div>
            </div>
        </div>
       <!--  <div class="baby">
            <div class="title">
                <h2><img src="../assets/images/baby.jpg" alt="">{{hotList.name}}</h2>
            </div>
            <div class="goods">
                <div v-for="babyList in babyList">
                    <img :src="babyList.img" alt="">                   
                    <p>{{babyList.message}}</p>
                    <h3>{{babyList.prise}}</h3>
                    <span>{{babyList.priseLine}}</span>
                </div>
            </div>
        </div>
        <div class="beauty">
            <div class="title">
                <h2><img src="../assets/images/icon_04.jpg" alt="">美妆</h2>
            </div>
            <div class="goods">
                <div v-for="item in beautyList">
                    <img :src="item.img" alt="">                   
                    <p>{{item.message}}</p>
                    <h3>{{item.prise}}</h3>
                    <span>{{item.priseLine}}</span>
                </div>
            </div>
        </div>
        <div class="life">
            <div class="title">
                <h2><img src="../assets/images/icon_04.jpg" alt="">家具</h2>
            </div>
            <div class="goods">
                <div v-for="item in beautyList">
                    <img :src="item.img" alt="">                   
                    <p>{{item.message}}</p>
                    <h3>{{item.prise}}</h3>
                    <span>{{item.priseLine}}</span>
                </div>
            </div>
        </div>
        <div class="food">
            <div class="title">
                <h2><img src="../assets/images/icon_04.jpg" alt="">食物</h2>
            </div>
            <div class="goods">
                <div v-for="item in beautyList">
                    <img :src="item.img" alt="">                   
                    <p>{{item.message}}</p>
                    <h3>{{item.prise}}</h3>
                    <span>{{item.priseLine}}</span>
                </div>
            </div>
        </div>
        <div class="buy">
            <div class="title">
                <h2><img src="../assets/images/icon_06.jpg" alt="">直邮</h2>
            </div>
            <div class="goods">
                <div v-for="item in beautyList">
                    <img :src="item.img" alt="">                   
                    <p>{{item.message}}</p>
                    <h3>{{item.prise}}</h3>
                    <span>{{item.priseLine}}</span>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    export default{
        data(){
            return{
                value:'',
                goodsList:'',
                title:[{
                    name:'今日疯抢',
                    img:require('../assets/images/icon_01.png')
                },{
                    name:'母婴专区',
                    img:require('../assets/images/icon_02.jpg')
                },{
                    name:'美妆护肤',
                    img:require('../assets/images/icon_03.jpg')
                },{
                    name:'家具生活',
                    img:require('../assets/images/icon_04.jpg')
                },{
                    name:'营养食品',
                    img:require('../assets/images/icon_05.jpg')
                },{
                    name:'全球直邮',
                    img:require('../assets/images/icon_06.jpg')
                }],               
                hotList:[{
                    img:require('../assets/images/goods.jpg'),
                    prise:'$88.00',
                    priseLine:'$96.00',
                    message:'美国/SUPER MILD沐 浴露500ml'
                }],
            }
        },
        methods: {
            detail(pid){
                this.$router.push({
                    path:'/detail',
                    query:{
                        pid:pid
                    }
                })
            }
        },
        mounted() {
            this.$http('http://yd.msword.top/getIndexData')
            .then(res=>{
                console.log(res,'首页数据')
                if(res.data.code == 200){
                    this.goodsList = res.data.data;
                }
            })
            .catch(err=>{
                console.log(err,'首页数据失败')
            })
        },
    }
</script>
<style scoped>
    van-search{
        position: absolute;
        top:0.5rem;
        left:0.5rem;
        background: url(../assets/images/index_bg.png) no-repeat;
        width: 5.2rem;
        height: 0.6rem;
    }
    .banner input{
        position: absolute;
        top:0.5rem;
        left:1.2rem;
        width: 4.76rem;
        height: 0.65rem;
        vertical-align: center;
        border-radius: 0.1rem;
        color:#999;
        padding:0 0.2rem;
        background:rgba(254,220,2529,0.6) url(../assets/images/search.png) no-repeat 4.3rem 0 ;
    }
    .box{
        background: #fafafa;
        font-size: 0.28rem;
        color:#333;
        padding-bottom:2rem;
    }
    .title{
        padding:0.26rem 0
    }
    h2{
        font:0.28rem/0.4rem '微软雅黑';
        align-items: baseline;
    }
    h2 img{
        width: 0.4rem;
        vertical-align: bottom;
        margin-right: 0.1rem;
    }
    .banner img{
        vertical-align: bottom;
        width: 7.5rem; 
        font-size: 0;
    }
    .hot,.baby,.beauty,.life,.food,.buy{
        padding-left:0.2rem;
    }
    
     .goods{
        display: flex;
    }
     .goods img{
        height: 3.1rem;
        max-width: 2.84rem;
    }
     .goods div{
        position: relative;
        margin-right: 0.25rem;
        width: 2.84rem;
        /* height: 4.64rem; */
        padding:0 0.2rem 0.2rem;
        color:#666;
        border:1px solid #ccc;
        background: #fff;
    }
    .hot .goods h3{
        color:#e60012;
        line-height: 0.6rem;
    }
     .goods p, .goods span{
        line-height: 0.4rem;
    }
    .hot .goods span{
        font-size: 0.2rem;
        position: absolute;
        text-decoration: line-through;
        right:.26rem;
        bottom:1.1rem;
    }
    
    .goods h3{
        color:#ffa002;
        line-height: 0.6rem;
    }
    .goods span{
        color:#888;
        position: absolute;
        right:0.2rem;
        bottom:0.3rem;
    }
</style>


