<template>
    <div>
        <div class="top">
            <input type="text" value="11" placeholder="请输入内容">
        </div>
        <div class="main">
            <div class="tab">
                <ul>
                    <li v-for="(name,i) in aside" @click="get(i,name)" :key="i" ><a :class="[num == i? 'active':'']" >{{name}}</a></li>
                </ul>
            </div>
            <div class="goods" v-for="(goods,index) in goods" :key="index">
                <div v-for="(item,i) in goods.list" :key="i" v-if="msg==goods.name" @click="detail(item.id)">
                    <img :src="item.thumbnail" alt="">
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            aside:['母婴专区','美妆护肤','家具生活','营养食品','全球直邮'],
            num:0,
            msg:'母婴专区',
            goods:[]
        }
    },
    methods: {
        get(i,item){
            this.num = i;
            this.msg = item
            console.log(this.msg)
        },
        detail(id){
            /* this.$router.push({
                path:'/detail',
                query:{
                    pid:id
                }
            }) */
            console.log(id,'商品ID')
        }
    },
    mounted() {
        this.$http('http://yd.msword.top/getClassify')
        .then(res=>{
            console.log(res,'分类数据')
            this.goods = res.data.data;
        })
        .catch(err=>{
            console.log(err,'分类数据失败')
        })
    },
}
</script>
<style scoped>
.main{
    display:flex;
}
.top{
    /* height: 0.94rem; */
    background: #ff9900;
    text-align: center;
    padding: 0.16rem 0;
}
.top input{
    width: 4.76rem;
    height: 0.65rem;
    vertical-align: center;
    border-radius: 0.1rem;
    color:#999;
    padding:0 0.2rem;
    background:rgba(225,225,255,0.6) url(../../assets/images/search.png) no-repeat 4.3rem 0 ;
}
.tab{
    background: #fafafa;
}
.tab a{
    text-align: center;
    display: block;
    width: 2.25rem;
    height: 0.96rem;
    color:#686868;
    font:.26rem/0.96rem '微软雅黑';
}
.tab .active{
    border-left:0.1rem solid #1d84a7;
    color:#ff9900;
    background: #fff;
}
    .goods{
        background: #fff;
        padding-top:0.2rem;
    }
    .goods div{
        float: left;
        margin:0 0 0.2rem 0.2rem;
        padding-top:0.2rem;
        text-align: center;
        width: 2.25rem;
        height: 2.15rem;
        border:2px solid #1d84a7;
        color:#333;
        font:0.24rem/0.46rem '微软雅黑';
        border-radius: 0.1rem;
    }
    .goods img{
        width: 1.64rem;
        height: 1.7rem;
    }
    .goods p{
        background: #1d84a7;
       
    }
</style>

