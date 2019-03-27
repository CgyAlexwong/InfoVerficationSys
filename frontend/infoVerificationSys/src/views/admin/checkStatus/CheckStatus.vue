<template>
    <div class="wrapper">
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%; margin: 0 auto;" max-height="1000px" stripe highlight-current-row
        >
            <el-table-column header-align="center" align="center" width="170px" ixed label="姓名" prop="name"></el-table-column>
            <el-table-column header-align="center" align="center" width="230px" label="身份证号码" prop="identityNum"></el-table-column>
            <el-table-column header-align="center" align="center" :width="checkWidth" label="人脸识别校验" prop="faceCheck">
                <template slot-scope="scope">
                    <el-button v-if="tableData.faceCheck" type="primary" plain disabled>通过</el-button>
                    <el-button v-if="!tableData.faceCheck" type="danger"  plain disabled>未通过</el-button>
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" :width="checkWidth" label="OCR校验" prop="ocrCheck">
                <template slot-scope="scope">
                    <el-button v-if="tableData.ocrCheck" type="primary" plain disabled>通过</el-button>
                    <el-button v-if="!tableData.ocrCheck" type="danger" plain disabled>未通过</el-button>
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" :width="checkWidth" label="基本信息校验" prop="infoCheck">
                <template slot-scope="scope">
                    <el-button v-if="tableData.infoCheck" type="primary"  plain disabled>通过</el-button>
                    <el-button v-if="!tableData.infoCheck" type="danger"  plain disabled>未通过</el-button>
                </template>
            </el-table-column>
            <el-table-column header-align="center" align="center" :width="checkWidth" label="电子签名认证" prop="signCheck">
                <template slot-scope="scope">
                    <el-button v-if="tableData.signCheck" type="primary"  plain disabled>通过</el-button>
                    <el-button v-if="!tableData.signCheck" type="danger"  plain disabled>未通过</el-button>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" style="width: 300px" size="medium" placeholder="请输入姓名搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="medium" round icon="el-icon-edit"  @click="handleInfoEdit(scope.row)">修改学生信息
                    </el-button>
                    <el-button size="medium" round icon="el-icon-star-off" type="danger" @click="handleStatusEdit(scope.row)">编辑学生审核状态
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="学生校验状态" :visible.sync="dialogFormVisible2" :before-close="handleDialogClose">
            <el-form :model="tableData">
                <el-form-item label="人脸识别校验">
                    <el-radio-group v-model="tableData.faceCheck">
                        <el-radio :label="false">未通过</el-radio>
                        <el-radio :label="true">已通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="OCR校验">
                    <el-radio-group v-model="tableData.ocrCheck">
                        <el-radio :label="false">未通过</el-radio>
                        <el-radio :label="true">已通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="基本信息校验">
                    <el-radio-group v-model="tableData.infoCheck">
                        <el-radio :label="false">未通过</el-radio>
                        <el-radio :label="true">已通过</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电子签名认证">
                    <el-radio-group v-model="tableData.signCheck">
                        <el-radio :label="false">未通过</el-radio>
                        <el-radio :label="true">已通过</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="editStatusSubmit">提交修改</el-button>
            </div>
        </el-dialog>
        <el-dialog title="学生基本信息" :visible.sync="dialogFormVisible">
            <el-form :model="stuInfoForm">
                <el-form-item label="考生号" :label-width="formLabelWidth" >
                    <el-input v-model="stuInfoForm.examNum"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.stuName"></el-input>
                </el-form-item>
                <el-form-item label="外文姓名" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.foreignName"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio-group v-model="stuInfoForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="民族" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.nation"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.birthdate"></el-input>
                </el-form-item>
                <el-form-item label="生源地" :label-width="formLabelWidth">
                    <el-radio-group v-model="stuInfoForm.originPlace">
                        <el-radio :label="1">台湾</el-radio>
                        <el-radio :label="2">香港</el-radio>
                        <el-radio :label="3">澳门</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="报考科类" :label-width="formLabelWidth">
                    <el-radio-group v-model="stuInfoForm.subject">
                        <el-radio :label="0">文科</el-radio>
                        <el-radio :label="1">理科</el-radio>
                        <el-radio :label="-1">不分文理</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="毕业时间" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.graduateDate"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.email"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="移动电话" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.mobileNumber"></el-input>
                </el-form-item>
                <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.identityNum"></el-input>
                </el-form-item>
                <el-form-item label="通行证" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.mtpNumber"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.postal"></el-input>
                </el-form-item>
                <el-form-item label="籍贯" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.nativePlace"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.address"></el-input>
                </el-form-item>
                <el-form-item label="毕业中学" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.graduateSchool"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.emergencyContact.emergencyContactPerson"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人电话" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.emergencyContact.emergencyContactNumber"></el-input>
                </el-form-item>
                <el-form-item label="紧急联系人地址" :label-width="formLabelWidth">
                    <el-input v-model="stuInfoForm.emergencyContact.emergencyContactAddress"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editInfoSubmit">提交修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src="./checkStatus.js"></script>
<style scoped src="./checkStatus.css"></style>
