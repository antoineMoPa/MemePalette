<template>
  <header class="mdl-layout__header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <i class="material-icons" style="position:relative;top:-2px;font-size:35px;margin-right:10px;">burst_mode</i>
      <a href="/" class="mdl-layout-title">MemePalette</a>
      &nbsp;
      <input class="mdl-textfield__input nav-search-input" type="text" placeholder="search" v-model="search">
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation. We hide it in small screens. -->
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/?about"><i class="material-icons">info</i> About</a>
      </nav>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="/?clear"><i class="material-icons">delete</i> Clear All</a>
      </nav>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="https://github.com/antoineMoPa/MemePalette"><i class="material-icons">code</i> Github</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      search: '',
    };
  },
  watch:{
    search(data) {
      window.localStorage.search = data;
      this.$emit('search', data);
    }
  },
  mounted(){
    if(window.localStorage.search != undefined){
      this.search = window.localStorage.search;
    }
    document.querySelectorAll(".nav-search-input")[0].focus();
  }
};
</script>

<style scoped>
.mdl-layout__header-row{
  padding-left:20px;
}
.mdl-layout-title{
  margin-right:20px;
}
.nav-search-input{
  max-width:300px;
}
a.mdl-layout-title{
  color:#fff;
  text-decoration: none;
}
::placeholder { color: #eee; }
</style>
