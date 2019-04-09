<template>
    <el-card>

        <el-row :gutter="20">
            <el-col :span="4">
                <el-card>
                    <el-button slot="header"
                               style="float: left; padding:0" type="text">未上传照片学生列表
                    </el-button>

                    <el-table :data="noUpload" style="width: 100%" max-height="250" class="table">
                        <el-table-column fixed prop="identityNum" label="身份证号" width="150"></el-table-column>
                    </el-table>

                </el-card>

            </el-col>
            <el-col :span="14">
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
                            :on-preview="handlePictureCardPreview">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                    <div class="promptMsg">
                        <p>只能上传jpg/png文件</p>
                        <p>照片大小不可超过2M</p>
                    </div>
                    <div>
                        <el-button type="primary" @click="uploadStuPhotos" style="margin-top:30px">确认上传</el-button>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="6">
                <el-card>
                    <el-button slot="header"
                               style="float: left; padding-top: 0" type="text">照片不合格学生列表
                    </el-button>
                    <el-table :data="failedUpload" style="width: 100%" max-height="250" class="table">
                        <el-table-column fixed prop="identityNum" label="身份证号" width="150"></el-table-column>
                        <el-table-column fixed prop="msg" label="错误信息" width="150"></el-table-column>
                    </el-table>

                </el-card>
            </el-col>

        </el-row>

    </el-card>
</template>

<script src="./uploadPhotos.js"></script>
<style scoped src="./uploadPhoto.css"></style>
