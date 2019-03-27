<template>
    <el-container class="container">
        <el-header class="header">
            <el-menu :default-active="$route.path" background-color="transparent" router text-color="#000000"
                     active-text-color="#d3d3d3" class="nav" mode="horizontal" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-message" style="color: #ffffff"></i>上传学生信息
                    </template>
                    <el-menu-item index="/admin/uploadExcel">
                        <i class="el-icon-document" style="color: darkblue"></i>上传Excel
                    </el-menu-item>
                    <el-menu-item index="/admin/uploadPhotos">
                        <i class="el-icon-picture" style="color: darkblue"></i>上传照片
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="2" route="/admin/checkStudentStatus" style="margin-left:5px">
                    <i class="el-icon-picture" style="color: #ffffff"></i>查看学生状态
                </el-menu-item>
                <el-menu-item index="3" route="/admin/checkFeedback" style="margin-left:5px">
                    <i class="el-icon-menu" style="color:#ffffff"></i>查看学生反馈
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="50px" class="aside">
                <!-- <div class="title-font">南京大学台港澳学生信息校验系统</div>-->
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
    export default {
        name: 'Admin',
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath)
            },

        }
    }
</script>

<style scoped src="./admin.css"></style>
