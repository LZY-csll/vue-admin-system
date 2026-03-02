<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container" :rules="rules">
            <h1>欢迎登录</h1>
            <el-form-item prop="username">
                <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { getMenu } from '@/api/apiData/loginData';
import { useAllDataStore } from '../stores';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const store = useAllDataStore()
const loginForm = reactive({
    username:'',
    password:''
})
const rules =reactive( {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})


const router = useRouter()
const handleLogin = async()=>{
    const res = await getMenu(loginForm)
    
    store.updateMenuList(res.menuList)
    store.token = res.token
    
    store.updateAuthPaths() //更新权限数组
    console.log('权限数组',store.authPaths);
    
    router.push("/home")
}
</script>

<style lang="less" scoped>
.body-login{
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/background.png");
    background-size: 100%;
    overflow: hidden;
}
.login-container{
    width: 400px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 350px auto;
    h1{
      text-align:center;
      margin-bottom:20px;
      color:#505450;
   }
   :deep(.el-form-item__content) {
      justify-content: center;
   }
}
</style>