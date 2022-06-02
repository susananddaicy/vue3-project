
<template>
  <div>
    <div @click="add">
      {{ count }}
    </div>
    <div @click="asyncAdd">
      {{ count }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '../store/gvuex'

let store = useStore()
let count = computed(() => store.state.count)
let double = computed(() => store.getters.double)

function add() {
  store.commit('add')
}

function asyncAdd(){
  store.dispatch('asyncAdd')
}

</script>