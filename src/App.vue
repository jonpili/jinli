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

<style lang="scss">
  #app {
    font-family: 'Rubik', 'Noto Sans JP', "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  $space-array: (
    50: $basespace-50,
    100: $basespace-100,
    200: $basespace-200,
    300: $basespace-300,
    400: $basespace-400,
    500: $basespace-500,
    600: $basespace-600
  );

  @each $i, $space-name in $space-array {
    .mt-#{$i} {
      margin-top: $space-name;
    }

    .mr-#{$i} {
      margin-right: $space-name;
    }

    .mb-#{$i} {
      margin-bottom: $space-name;
    }

    .ml-#{$i} {
      margin-left: $space-name;
    }

    .my-#{$i} {
      margin-top: $space-name;
      margin-bottom: $space-name;
    }

    .mx-#{$i} {
      margin-right: $space-name;
      margin-left: $space-name;
    }

    .pt-#{$i} {
      padding-top: $space-name;
    }

    .pr-#{$i} {
      padding-right: $space-name;
    }

    .pb-#{$i} {
      padding-bottom: $space-name;
    }

    .pl-#{$i} {
      padding-left: $space-name;
    }

    .py-#{$i} {
      padding-top: $space-name;
      padding-bottom: $space-name;
    }

    .px-#{$i} {
      padding-right: $space-name;
      padding-left: $space-name;
    }
  }

  .mr-a {
    margin-right: auto;
  }

  .ml-a {
    margin-left: auto;
  }

  // FontSize
  .fs-700 {
    font-size: $fontsize-700;
  }

  .fs-600 {
    font-size: $fontsize-600;
  }

  .fs-500 {
    font-size: $fontsize-500;
  }

  .fs-400 {
    font-size: $fontsize-400;
  }

  .fs-300 {
    font-size: $fontsize-300;
  }

  .fs-200 {
    font-size: $fontsize-200;
  }

  .fs-100 {
    font-size: $fontsize-100;
  }

  .fw-bold {
    font-weight: 700!important;
  }
</style>
