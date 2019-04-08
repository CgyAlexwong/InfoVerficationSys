<template>
    <el-card>

        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <el-button slot="header"
                               style="float: left; padding-top: 0" type="text">上传学生信息提示
                    </el-button>
                    <div class="promptMsg">
                        <ul>
                            <li>请上传Excel文件,文件后缀需为'xls'或'xlsx'</li>
                            <li>请一次上传一个文件</li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <el-button slot="header"
                               style="float:left; padding-top:0 " type="text">请在此处上传Excel
                    </el-button>
                    <el-upload
                            ref="uploadStuExcel"
                            :http-request="excel"
                            :auto-upload="false"
                            :before-upload="beforeUploadExcel"
                            drag action="http://localhost8080/#/admin/uploadExcel">
                        <i class="el-icon-upload"><div style="font-size: 5px">将文件拖到此处，或点击上传</div></i>
                    </el-upload>
                    <div >
                        <el-button type="primary" @click="uploadStuExcel">确认上传</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script src="./uploadExcel.js"></script>

<style scoped src="./uploadExcel.css"></style>
