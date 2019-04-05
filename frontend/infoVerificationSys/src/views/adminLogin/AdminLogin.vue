<template>
    <el-container class="container">
        <el-header class="header">
            <i class="el-icon-menu icon-size"></i>南京大学台港澳学生信息校验系统
        </el-header>
        <el-container>
            <el-aside width="200px" class="aside">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo menu-style"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="transparent"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>

            </el-aside>
            <el-main class="main">
                <router-link to="/admin">跳转至管理员界面</router-link>
            </el-main>
        </el-container>
    </el-container>
</template>

<script src="./adminLogin.js"></script>
<style scoped src="./adminLogin.css"></style>



