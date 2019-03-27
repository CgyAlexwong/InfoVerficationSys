<template>
  <div id="hello">
    <img src="../assets/form_logo.png" alt="welcome" height="200" width="200"/>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'end',
  data () {
    return {
      msg: '信息校验已经完成，感谢参与！'
    }
  }
}
</script>

<style scoped>

</style>
