<template>
    <div class="car">
        <div class="top">
            <van-icon name="arrow-left" @click="$router.go(-1)"/>
            <span>购物车</span>
        </div>
        <div class="main" v-if="flag">
            <h3>杭州保税区仓</h3>
            <div class="con"  v-for="(goods,i) in list" :key="i" @touchstart.stop='startMove($event)' @touchmove.stop='move($event)' @touchend.stop='endMove($event)'>
                <van-checkbox v-model="goods.checked" checked-color="#ff9900" color="#333" @click="checkOne(i)"></van-checkbox>
                <img :src="goods.img" alt="">
                <div class="message">
                    <p>{{goods.name}}</p>
                    <span>{{goods.size}};{{goods.age}}</span>
                    <van-stepper v-model=goods.buyNum />
                </div>
                <div>
                    <h2>￥{{goods.buyNum * goods.price}}</h2>
                </div>
                <div class="delete" @click="del(i)">删除</div>
            </div>
        </div>
        <div v-if="!flag" class="null">
            <h1>购物车空空的呢 快去加购吧！</h1>
        </div>
        <div class="bottom">
            <div>
                <van-checkbox v-model="checkAll" checked-color="#ff9900" color="#333" @click="checkA()"></van-checkbox>
                <span >全选</span>
            </div>
            <div>
                <van-checkbox v-model="edit" checked-color="#ff9900" color="#333"></van-checkbox>
                <span>编辑</span>
            </div>
            <div>
                <p>合计：￥{{allPrice}}</p>
                <p>（不含运费）</p>
            </div>
        </div>
        <div class="gobuy">
            去结算
        </div>
        <div class="mask"></div>
    </div>
</template>
<script>
    
export default {
    data() {
        return {
            start:0,
            end:0,
            scale:false,    //判断是否滑动的标志
            flag:false,     //判断本地存储是否有值时，与空购物车切换
            checkAll:false, //全选按钮
            edit:false,     //编辑按钮
            list:[],
        }
    },
    methods: {
        // 全选事件
        checkA(){
            console.log(this.checkAll,'checkall')
            if(this.checkAll){
                 this.list.map((item,i)=>{
                    item.checked = false;
                })
            }else{
                this.list.map((item,i)=>{
                    item.checked = true;
                })
            }
        },
        // 单选事件
        checkOne(i){
            console.log(this.list[i].checked,'checked One')
            // this.list[i].checked = !this.list[i].checked;
            this.$set(this.list[i],'checked',!this.list[i].checked)
            let result = this.list.map((item,index)=>{
                return item.checked
            })
            console.log(result,'result')
            let bool = result.every((item,i)=>{
                return item==true
            })
            console.log(bool,'bool')
            if(bool){
                this.checkAll = true
            }else{
                this.checkAll = false
            }
        },
        // 删除购物车事件
        del(i){
            let a = JSON.parse(localStorage.getItem('arrCar'))
            a.splice(i,1)
            localStorage.setItem('arrCar',JSON.stringify(a))
            console.log(i,a,'删除购物车')
            this.$router.go(0)
        },
        startMove(e){
            this.start = e.touches[0].clientX
            console.log(e,'触摸开始1')

        },
        move(e){
            // console.log(e,'触摸滑动2')
            this.end = e.touches[0].clientX
        },
        endMove(e){
            console.log(e,'触摸结束3')
            /* if(this.start-this.end >10){
                console.log('从右往左滑动')
                console.log(this,'this')
                this.scale = true;
                // this.style.marginLeft = -1+'rem'       
            }
            if(this.start-this.end <10){
                console.log('从左往右滑动')
                console.log(this,'this')
                 this.scale = false;
                // this.style.marginLeft = 1+'rem'       
            } */
        }
    },
    computed: {
        allPrice() {
            let sum = 0;
            this.list.map((item, i) => {
                //如果单选选中就计算金额 否则 不计算
                if(item.checked){
                    sum += item.price * item.buyNum
                }
            })
            return sum
        }
        
    },
    mounted() {
        if(localStorage.getItem('arrCar')){
            this.flag = true;
            this.list = JSON.parse(localStorage.getItem('arrCar'))
        }else{
            this.flag = false
        }
        console.log(this.list,'购物车商品')
        // this.list[1].checked
    },
    
};
</script>
<style scoped>
.null{
    text-align: center;
    font:0.3rem/2rem '微软雅黑';
    color:#999;
}
.mask{
    width: 100%;
    height: 100%;
    background: #fafafa;
    position: fixed;
    top:0;
    left:0;
    z-index: -10;
}
.top {
  font-size: 0.4rem;
  padding: 0.25rem 0;
  text-align: center;
  background: #ff9900;
  color: #fff;
  position: relative;
}
.van-icon {
  font-size: 0.5rem;
  color: #fff;
  position: absolute;
  left: 0.4rem;
  top: 0.25rem;
}
input{
    -webkit-appearance: checkbox;
    width: 0.3rem;
    height: 0.3rem;
    border:1px solid #ff9900;
}
/* -webkit-appearance: none; */
.main{
    overflow: hidden;
}
.main img{
    height: 1.55rem;
}
.van-stepper{
    height: 0.4rem;
    font-size: 0.4rem;
}
h2{
    font: 0.35rem/1.55rem '微软雅黑';
}
.con{
    height: 2.1rem;
    width: 7.5rem;
    margin-left:0;
    transform: 2s;
    display: flex;
    justify-content: space-around;
    margin-left:0rem;
}
.delete{
    color:#fff;
    background: #ff9900;
    height: 2rem;
    width: 0.6rem;
    font:0.3rem/2rem '微软雅黑';
    text-align: center;
}
.marginEnd{
    margin-left:-1rem;
}
.con p{
    font:0.32rem/0.44rem '微软雅黑';
}
.message span{
    font:0.32rem/0.44rem '微软雅黑';
    color:#999;
    position: absolute;
    top:0.4rem;
    right:0.2rem;
    background: #fafafa;
    padding:0 0.2rem;
}
.message{
    width: 2.9rem;
    position: relative;
}
.main h3{
    padding-left: 1rem;
    color:#999;
    font-size: 0.3rem;
    line-height: 1.2rem;
}

.bottom{
    width: 5.15rem;
    height: 1.1rem;
    position: fixed;
    bottom:1.35rem;
    left:0;
    display: flex;
    align-items: center;
    color:#999;
    background: #fff;
    border-top:1px solid #eee;
    -webkit-box-orient: justify;
}
.bottom div{
    padding:0 0.2rem;
    text-align: center;
}
.bottom p{
    font:0.24rem/.32rem '微软雅黑';
}
.bottom span{
    line-height: .4rem;
}
.gobuy{
    color:#fff;
    background: #ff9900;
    text-align: center;
    font:0.4rem/1.1rem '微软雅黑';
    width: 2.35rem;
    height: 1.1rem;
    padding:0;
    position: fixed;
    bottom:1.35rem;
    right:0;
}
</style>


