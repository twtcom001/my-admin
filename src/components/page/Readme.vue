<template>
  <div class="hello">
    <h1>清蒸庄园管理后台</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      url: '/api/v1.0/users'
    }
  },
  created(){
      this.getData();
  },
  methods: {
    getData(){
      let self = this;
      console.log ('init');
      self.$axios.get(self.url).then((res) => {
        self.tableData = res.data.list;

      },res=>{
        console.log (self.url+'调用失败');      
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
