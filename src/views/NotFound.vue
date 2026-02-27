<template>
    <div class="container">
        <div class="error-code">404</div>
        <div class="error-message">
            抱歉，您访问的页面不存在<br>
            可能是网址输入错误或页面无权限访问
        </div>
        <button class="back-home" @click="gohome">返回首页</button>
        
    </div>
</template>

<script setup>
import { useAllDataStore } from '../stores';
import { useRouter } from 'vue-router';
const store = useAllDataStore()
const router = useRouter()
const gohome = ()=>{
    if(store.token) {
        router.push('/home')
    }else{
        router.push('/login')
    }
}
</script>

<style lang="less" scoped>
    .container{
        background-color: #f8f9fa;
            color: #333;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
    }
/* 404数字样式 */
        .error-code {
            font-size: 8rem;
            font-weight: 700;
            color: #6c757d;
            margin-bottom: 20px;
        }

        /* 错误提示文本 */
        .error-message {
            font-size: 1.2rem;
            margin-bottom: 30px;
            text-align: center;
            color: #495057;
        }

        /* 返回首页按钮 */
        .back-home {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 1rem;
            transition: background-color 0.2s ease;
        }

        .back-home:hover {
            background-color: #0056b3;
        }

        /* 底部版权/备注信息 */
        .footer {
            position: absolute;
            bottom: 20px;
            font-size: 0.9rem;
            color: #868e96;
        }
</style>