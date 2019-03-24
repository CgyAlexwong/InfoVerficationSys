<template>
    <el-container class="container">
        <el-header class="header">
            <el-menu background-color="transparent" router text-color="#000000" active-text-color="#d3d3d3" class="nav"
                     mode="horizontal" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-message" style="color: #ffffff" ></i>上传学生信息
                    </template>
                    <router-link to='/admin/uploadExcel'>
                        <el-menu-item index="1-1">
                            <i class="el-icon-document" style="color: darkblue"></i>上传Excel
                        </el-menu-item>
                    </router-link>
                    <router-link to="/admin/uploadPhotos">
                    <el-menu-item route="/admin/uploadPhotos" index="1-2">
                        <i class="el-icon-picture" style="color: darkblue"></i>上传照片</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-menu-item index="2" route="/admin/checkStudentStatus" style="margin-left:5px">
                    <i class="el-icon-picture" style="color: #ffffff"></i>查看学生状态
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="50px" class="aside">
                <!-- <div class="title-font">南京大学台港澳学生信息校验系统</div>-->
            </el-aside>
            <el-main class="main">
                <template>
                    <div class="block">
                        <span class="demonstration">默认 Hover 指示器触发</span>
                        <el-carousel height="150px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3>{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="block">
                        <span class="demonstration">Click 指示器触发</span>
                        <el-carousel trigger="click" height="150px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3>{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </template>

            </el-main>
        </el-container>
    </el-container>
</template>


<script>
  import {Vue, Component} from 'vue-property-decorator'

  export default {
    name: 'Admin',
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },

    }
  }
</script>

<style scoped src="./admin.css"></style>
