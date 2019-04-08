<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <el-button slot="header"
                               style="float: left; padding-top: 0" type="text">上传学生照片提示
                    </el-button>
                    <div class="promptMsg">
                        <ul>
                            <li>只能上传jpg/png文件</li>
                            <li>照片大小不可小于2M</li>
                        </ul>
                    </div>
                </el-card>
                <el-card style="margin-top:20px">
                    <el-button slot="header"
                               style="float: left; padding-top: 0" type="text">照片不合格学生列表
                    </el-button>
                    <div class="promptMsg">
                        <ul>
                            <li>以下学生照片无法被系统识别！</li>

                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <el-button slot="header"
                               style="float:left;padding-top:0" type="text">请在此处上传学生照片

                    </el-button>
                    <el-upload
                            ref="uploadStuPhotos"
                            :http-request="photos"
                            :auto-upload="false"
                            action="http://localhost8080/#/admin/uploadPhotos"
                            multiple
                            list-type="picture-card"
                            :before-upload="beforeUploadPhotos"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <div >
                        <el-button type="primary" @click="uploadStuPhotos">确认上传</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </el-card>
</template>

<script src="./uploadPhotos.js"></script>
<style scoped src="./uploadPhoto.css"></style>
