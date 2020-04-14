<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Home msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Home from './components/pages/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  // data () {
  //   return {
  //     xxx: データの置き場所
  //   }
  // },
  // props: {
  //   xxx: データの受け取り
  // },
  // computed: {
  //   xxx () {
  //     return データの自動算出
  //   }
  // },
  // watch: {
  //   xxx () {
  //     データ変更時にメソッドを実行
  //   }
  // },
  // methods: {
  //   xxx () {
  //     メソッドの組み込み
  //   }
  // },
  // created () {
  //   インスタンスが作成された後に同期的に呼ばれるフック
  // },
  // mounted () {
  //   インスタンスがマウントされたちょうど後に呼ばれるフック
  // }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
