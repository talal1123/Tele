import Vue from 'nativescript-vue';
import Home from './components/Home.vue';

// Register elements for NativeScript
Vue.registerElement('Gradient', () => require('@nativescript/core').Gradient);

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start();