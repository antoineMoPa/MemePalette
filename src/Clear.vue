<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Nav v-on:search="onSearch"/>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <h3>Delete all stored gifs</h3>
        
        <p>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="clear">
                Clear All Data
            </button>
        </p>
        <br><br>
      </div>
    </main>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'Clear',
  components: {
    Nav,
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    onSearch(val){
      window.location.href = "/";
    },
    clear(){
      caches.delete("images").then(function(result) {
        alert("Everything is gone!");
        window.location.reload();
      });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: sans-serif;
  color: #333;
}
.mdl-layout__content{
  width:100%;
}
.page-content{
  padding-top:60px;
  padding-left:20px;
  padding-right:20px;
  font-size:120%;
}
.instructions,h2,h3,p{
  padding-left:20px;
  padding-right:20px;
}
</style>
