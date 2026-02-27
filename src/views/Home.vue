<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <!-- 用户信息卡片 -->
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user" alt="头像">
                    <div class="user-info">
                        <p class="user-info-admin">admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2024-06-30</span></p>
                    <p>上次登录地点：<span>北京</span></p>
                </div>
            </el-card>
            <!-- 表格卡片 -->
            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData" >
                    <el-table-column 
                        v-for="value in tableLabel"
                        :key="value.props"
                        :prop="value.props" 
                        :label="value.label" 
                    
                    />
                    
                </el-table>
            </el-card>
        </el-col>
        <!-- 右边的数据 -->
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
                <el-card
                :body-style="{display:'flex',padding:0}"
                v-for="item in countData"
                :key="item.name"
            >
                <component :is="item.icon"  class = "icons" :style="{backgroundColor:item.color}"></component>
                <div class="detail">
                    <p class="num">￥{{ item.value }}</p>
                    <p class="txt">{{ item.name }}</p>
                </div>
            </el-card>
            </div>
            <el-card class="top-echart">
                <div ref="echart"  style="height:280px;"></div>
            </el-card>
            <div class="graph">
                <el-card>
                    <div ref="userEchart" style="height: 250px;" class="chat_container"></div>
                </el-card>
                <el-card>
                    <div ref="videoEchart" style="height: 250px;" class="chat_container"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref ,reactive,onMounted, onBeforeUnmount, onUnmounted} from 'vue'

import * as echarts from 'echarts';

import {getChartData,getCountData,getTableData} from "@/api/apiData/homeData"
// import axios from 'axios'
//拿到全局注册的api
// const {proxy} = getCurrentInstance()
const getImageUrl = (user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href
}
const tableData = ref([])
const countData = ref([])

// const tableData = ref([
//     {
//       name: "Java",
//       todayBuy: 100,
//       monthBuy: 200,
//       totalBuy: 300,
//     },
//     {
//       name: "Python",
//       todayBuy: 100,
//       monthBuy: 200,
//       totalBuy: 300,
//     }
// ])
const tableLabel = ref([
    {props:"name",label:"课程"},
    {props:"todayBuy",label:"今日购买"},
    {props:"monthBuy",label:"本月购买"},
    {props:"totalBuy",label:"总购买"},
])

// const getTableData =async ()=>{
//     const data = await proxy.$api.getTableData()
//     console.log(data);
//     tableData.value = data.tableData   
// }

const getData = async()=>{
    const tdata = await getTableData()
    const cdata = await getCountData()
    
    tableData.value = tdata.tableData
    countData.value = cdata 
    
    
}
const echart = ref(null)
let oneEchart = null
const userEchart = ref(null)
let twoEchart = null
const videoEchart = ref(null)
let threeEchart = null
const observer = ref(null)
const getEchart = async()=>{
    // const chData = await getChartData()   //获取有关echarts的数据
    // console.log(chData);
    const {orderData,userData,videoData} = await getChartData()
    xOptions.xAxis.data = orderData.date
    xOptions.series = Object.keys(orderData.data[0]).map(val=>({
        name:val,
        data:orderData.data.map(item=>item[val]),
        type:'line'
    }))
    if(!oneEchart) {
        oneEchart = echarts.init(echart.value)
    }
    oneEchart.setOption(xOptions)    

    // 对第二个图表进行渲染
    xOptions.xAxis.data = userData.map(item=>item.date) 
    xOptions.series = [
        {
            name:"新增用户",
            data:userData.map(item=>item.new),
            type:"bar"
        },
        {
            name:"活跃用户",
            data:userData.map(item=>item.active),
            type:"bar"
        }
    ]
    if(!twoEchart) {
        twoEchart = echarts.init(userEchart.value)
    }
    twoEchart.setOption(xOptions)  

    // 对第三个饼状图进行渲染
    pieOptions.series = [
        {
            data:videoData,
            type:"pie"
        }
    ]
    if(!threeEchart) {
        threeEchart = echarts.init(videoEchart.value)
    }
    threeEchart.setOption(pieOptions)  

    // 监听容器的变化
    observer.value = new ResizeObserver(()=>{
        oneEchart?.resize()
        twoEchart?.resize()
        threeEchart?.resize()
    })
    // 判断容器是否存在
    if(echart.value ) {
        observer.value.observe(echart.value)
    }
    if( userEchart.value ) {
        observer.value.observe(userEchart.value)
    }
    if(videoEchart.value) {
        observer.value.observe(videoEchart.value)
    }
} 


//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
})

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
})


// const main = ref(null)
// onMounted(()=>{
//     console.log(main.value);
//     const myChart = echarts.init(main.value);
//     // 绘制图表
// myChart.setOption({
//   title: {
//     text: 'ECharts 入门示例'
//   },
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// });
// })


onMounted(getData)
onMounted(getEchart)
onBeforeUnmount(()=>{
    oneEchart?.dispose()
    twoEchart?.dispose()
    threeEchart?.dispose()
    oneEchart=null
    twoEchart=null
    threeEchart=null
})
onUnmounted(()=>{
    if(observer.value) {
        observer.value.disconnect()
        observer.value = null
    }
})
</script>

<style lang="less" scoped>
.home{
   height:100%;
   overflow:hidden;
   .user{
      display:flex;
      align-items:center;
      border-bottom:1px solid #ccc;
      margin-bottom:20px;
      img{
         width:150px;
         height:150px;
         border-radius:50%;
         margin-right:40px; 

      }
      .user-info{
         p{
            line-height:40px;
         }
         .user-info-p{
            color:#999;
         }
         .user-info-admin{
            font-size:35px
         }
      }
   }
   .login-info{
      p{
         line-height:30px;
         font-size:14px;
         color:#999;
         span{
            color:#666;
            margin-left:60px;
         }
      }
   }
   .user-table{
    margin-top: 20px;
   }
   .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
    .icons{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num{
            font-size: 30px;
            margin-bottom: 10px;
        }
        .txt{
            font-size: 15px;
            text-align: center;
            color: #999;
        }
    }
   }
   .graph{
      margin-top:20px;
      display:flex;
      justify-content:space-between;
      .el-card{
         width:48%;
         height:300px;
         .chat_container{
            overflow: hidden;
         }
      }
   }
}
</style>