import selectarea from './vue-selected.vue'
selectarea.install = function(Vue) {
    Vue.component('selectarea', selectarea)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(selectarea)
}

export default selectarea