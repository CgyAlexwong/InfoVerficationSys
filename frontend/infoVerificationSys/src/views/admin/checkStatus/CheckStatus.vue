<template>
    <div class="wrapper">
        <el-table
                :data="filteredTableData" style="width: 100%; margin: 0 auto;" stripe
                highlight-current-row
        >
            <el-table-column header-align="center" align="center" width="200px" ixed label="姓名"
                             prop="stuName"></el-table-column>
            <el-table-column header-align="center" align="center" width="250px" label="身份证号码"
                             prop="identityNum"></el-table-column>
            <el-table-column sortable header-align="center" align="center" :width="checkWidth" label="基本信息校验"
                             prop="basicInfoCheck">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.basicInfoCheck===1" type="primary" plain disabled>已完成</el-button>
                    <el-button v-if="scope.row.basicInfoCheck===0" type="danger" plain disabled>未完成</el-button>
                    <el-tooltip class="top item" effect="dark" content="点击查看存疑信息" placement="top">
                        <el-button @click="handleQueryEdit(scope.row)" v-if="scope.row.basicInfoCheck===2"
                                   type="warning" plain>存疑
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column sortable header-align="center" align="center" :width="checkWidth" label="其他信息校验"
                             prop="otherInfoCheck">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.otherInfoCheck===1" type="primary" plain disabled>已完成</el-button>
                    <el-button v-if="scope.row.otherInfoCheck===0" type="danger" plain disabled>未完成</el-button>
                </template>
            </el-table-column>
            <!--<el-table-column sortable header-align="center" align="center" :width="checkWidth" label="基本信息校验" prop="infoCheck">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button v-if="scope.row.infoCheck" type="primary" plain disabled>通过</el-button>-->
            <!--<el-tooltip class="top item" effect="dark" content="点击修改状态" placement="top">-->
            <!--<el-button @click="changeInfo(scope.row)" v-if="!scope.row.infoCheck" type="danger" plain >未通过</el-button>-->
            <!--</el-tooltip>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column sortable header-align="center" align="center" :width="checkWidth" label="电子签名认证" prop="signCheck">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button v-if="scope.row.signCheck" type="primary" plain disabled>通过</el-button>-->
            <!--<el-tooltip class="top item" effect="dark" content="点击修改状态" placement="top">-->
            <!--<el-button @click="changeSign(scope.row)" v-if="!scope.row.signCheck" type="danger" plain >未通过</el-button>-->
            <!--</el-tooltip>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center">
                <template slot-scope="scope">
                    <el-button size="medium" round icon="el-icon-edit" @click="handleInfoEdit(scope.row)">修改学生信息
                    </el-button>
                    <!--<el-button size="medium" round icon="el-icon-star-off" type="danger"-->
                    <!--@click="totalStatusEdit(scope.row)"-->
                    <!--:disabled="scope.row.faceCheck===true&&scope.row.ocrCheck===true&&scope.row.infoCheck===true&&scope.row.signCheck===true">一键修改为已通过-->
                    <!--</el-button>-->
                </template>
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" style="width: 300px" size="medium" placeholder="请输入姓名搜索"/>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="学生存疑信息" :visible.sync="queryFormVisible" :before-close="handleDialogClose">
            <el-form>
                <el-form-item v-for="(info,index) in queryInfo" :key="index" :label="info.prop">
                    <template>
                        <el-radio v-model="info.selectedInfo" :label="info.databaseInfo">{{info.databaseInfo}}
                        </el-radio>
                        <el-radio v-model="info.selectedInfo" :label="info.studentInfo">{{info.studentInfo}}</el-radio>
                        <el-radio  label="其他">
                            其他 <el-input v-model="info.selectedInfo" style="margin-left: 10px;width: 100px" clearable></el-input>
                        </el-radio>

                    </template>
                </el-form-item>
            </el-form>

            <img :src="ocrPhoto">
            <div slot="footer" class="dialog-footer">
                <el-button @click="queryFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editQuerySubmit">提交修改</el-button>
            </div>
        </el-dialog>


        <el-dialog title="学生基本信息" :visible.sync="dialogFormVisible" :before-close="handleDialogClose">
            <el-form :model="stuInfoForm">
                <el-form-item label="考生号" :label-width="formLabelWidth">
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

<script src="./checkStatus.js">

</script>
<style scoped src="./checkStatus.css"></style>
