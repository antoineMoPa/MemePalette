import Vue from 'vue';
import Router from './Router';

Vue.config.productionTip = false;
window.Dropzone.autoDiscover = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Router },
  template: '<Router/>',
});
