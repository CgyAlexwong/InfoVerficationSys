<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <el-button slot="header"
                               style="float: left; padding-top: 0" type="text">上传学生信息提示
                    </el-button>
                    <div>
                        <span >⚠️</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <el-button slot="header"
                               style="float:left; padding-top:0 " type="text">请在此处上传Excel</el-button>
                    <el-upload
                            class="upload"
                            :auto-upload="false"
                            drag multiple
                            action="=admin/uploadExcel">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <div class="footer">
                        <el-button type="primary" @click="uploadStuExcel">确认上传</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script src="./uploadExcel.js"></script>

<style scoped src="./uploadExcel.css"></style>
