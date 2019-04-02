<template>
  <div>
    <div id = "header">
      <mt-header fixed title="台港澳信息校验系统">
        <router-link to="/stu" slot="left">
          <mt-button icon="back">首页</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div id="hello">
      <!--新的header-->
      <img id='helloPic' src="../assets/da8e974dc.jpg" alt="welcome" height="200" width="200"/>
      <p id="end">信息校验已经完成<br>感谢参与！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'end'
}
</script>

<style scoped>
  #helloPic{
    border-radius: 50%;
    padding-top: 10px;
  }
  #end {
    margin: 10px;
    font-family: STKaiti, serif;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
</style>
