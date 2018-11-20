<template>
  <div id="app">
    <selected :province="province" :city="city" :area="area"/>
  </div>
</template>

<script>
import selected from './lib/vue-selected.vue'
export default {
  name: 'app',
  data () {
    return {
      url:{
            province:'',//省接口地址
            city:'',//市接口地址
            area:''//县接口地址
          },
          province:"140000",//默认省id
          city:"140100",//默认市id
          area:"140106",//默认县id
          selected:[]
        }
    
  },
  components:{
    selected
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
