<template>
  <div>
    <App v-if="route == '/'"/>
    <About v-if="route == 'about'"/>
    <Clear v-if="route == 'clear'"/>
  </div>
</template>

<script>
import App from './App';
import About from './About';
import Clear from './Clear';

export default {
  name: 'Router',
  components: { App, About, Clear},
  data() {
    return {
      route: '',
      images: [],
    };
  },
  mounted(){
    let route = window.location.href.match(/\?.*$/);
    if(route == null){
        this.route = "/";
    } else {
        this.route = route[0].replace("?","");
    }
  }
};
</script>

<style>
</style>
