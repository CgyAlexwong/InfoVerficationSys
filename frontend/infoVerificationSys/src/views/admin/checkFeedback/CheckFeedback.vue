<template>
    <el-transfer
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入城市拼音"
            v-model="value2"
            :data="data2">
    </el-transfer>
</template>

<script src="./checkFeedback.js"></script>

<style scoped src="./checkFeedback.css"></style>
