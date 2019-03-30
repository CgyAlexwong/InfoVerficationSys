<template>
    <el-container>
        <el-table :data='feedback' style="width: 100%; margin: 0 auto;" max-height="1000px" stripe
                  highlight-current-row :default-sort="{prop: 'isHandle', order: 'descending'}">
            <el-table-column header-align="center" align="center" fixed label="姓名"
                             width="180px" prop="stuName">

            </el-table-column>
            <el-table-column header-align="center" align="center" fixed label="联系方式"
                             width="300px" prop="contact">

            </el-table-column>
            <el-table-column header-align="center" align="center" fixed label="备注"
                             width="500px" prop="remark">

            </el-table-column>
            <el-table-column header-align="center" align="center" fixed label="处理状态"
                             width="100px" prop="isHandle" sortable >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isHandle" type="primary" plain disabled>已处理</el-button>
                    <el-button v-if="!scope.row.isHandle" type="danger" plain disabled>未处理</el-button>
                </template>

            </el-table-column>
            <el-table-column align="right" >
                <template slot-scope="scope">
                    <el-button size="medium" round icon="el-icon-star-off" type="danger"
                               @click="changeFeedback(scope.row)"
                               :disabled="scope.row.isHandle===true">标记为已处理
                    </el-button>
                </template>
            </el-table-column>


        </el-table>
    </el-container>
</template>

<script src="./checkFeedback.js"></script>

<style scoped src="./checkFeedback.css"></style>
