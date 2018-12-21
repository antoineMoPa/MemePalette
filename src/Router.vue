<template>
  <div>
    <About v-if="route == 'about'"/>
    <Clear v-else-if="route == 'clear'"/>
    <App v-else/>
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
        this.route = route[0].replace("?","").replace('/MemePalette','');
    }
  }
};
</script>

<style>
</style>
