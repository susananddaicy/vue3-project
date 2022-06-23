
<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>

    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">
          哥，你啥也没输入！
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
let title = ref("");
let todos = ref([{ title: '学习Vue', done: false }])

let showModal = ref(false);



function addTodo() {


  watchEffect(() => console.log(todos.value))

  if(!title.value) { 
    showModal.value = true;
    setTimeout(()=>{ 
      showModal.value = false;
      }, 1500) 
    return;
  }

  todos.value.push({ title: title.value, done: false }); 
  title.value = "";
}
function clear() {
  todos.value = todos.value.filter((v) => !v.done);
}
let active = computed(() => {
  return todos.value.filter((v) => !v.done).length;
});
let all = computed(() => todos.value.length);

let allDone = computed({
  get: function () {
    return active.value === 0;
  },
  set: function (value) {
    todos.value.forEach((todo) => {
      todo.done = value;
    });
  },
});
</script>

<style>
  .modal-enter-from {
    opacity: 0;
    transform: translateY(-60px);
  }
  .modal-enter-active {
    transition: all 0.3s ease;
  }
  .modal-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }
  .modal-leave-active {
    transition: all 0.3s ease;
  }
</style>