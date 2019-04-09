<template>
    <el-container class="container">
        <el-header class="header">
            <i class="el-icon-menu icon-size"></i>南 京 大 学 台 港 澳 学 生 信 息 校 验 系 统
        </el-header>
        <el-container>
            <el-aside width="70px" class="aside">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo menu-style"
                        background-color="transparent"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-location"></i>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <div class="login">
                    <el-row>
                        <div class="login-text">
                            管理员登陆
                        </div>
                    </el-row>

                    <div>
                        <el-input style="width:250px;;" size="large" placeholder="请输入管理员账号" v-model="username" ></el-input>
                    </div>
                    <div>
                        <el-input style="width:250px;;" size="large" placeholder="请输入管理员密码" v-model="password" show-password></el-input>
                    </div>
                    <div>
                        <button class="login-button" @click="login">登陆</button>
                    </div>


                </div>

                <!--<router-link to="/admin">跳转至管理员界面</router-link>-->
            </el-main>
        </el-container>
    </el-container>
</template>

<script src="./adminLogin.js"></script>
<style scoped src="./adminLogin.css"></style>



