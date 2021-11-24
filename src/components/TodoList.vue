<template>
  <div>
    <h2>{{ h2 }}</h2>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没有输入！</div>
      </div>
    </transition>
  </div>
</template>
<script setup lang='ts'>
import { watchEffect, computed, ref } from 'vue'
import {useUserStoreWithOut} from "../store/modules/user"
console.log("useUserStore",useUserStoreWithOut());
const useUserStore = useUserStoreWithOut()
useUserStore.setToken('123')
console.log("useUserStore",useUserStore.token);

interface Todo {
  title: string,
  done: boolean
}

const h2 = ref('tolist')
const title = ref('')
const todos = ref<Todo[]>([])
const showModal = ref(false)
todos.value = [
  { title: '吃饭', done: false },
  { title: '睡觉', done: true },
]

function addTodo() {
  if (!title.value) {
    showModal.value = true
    setTimeout(() => {
      showModal.value = false
    }, 1500);
    return
  }
  todos.value.push({
    title: title.value,
    done: false
  })
  title.value = ''
}

function clear() {
  todos.value = todos.value.filter(v => !v.done)
}

// 计算属性
const active = computed(() => {
  return todos.value.filter(v => !v.done).length
})
const all = computed(() => todos.value.length)
const allDone = computed({
  get: () => {
    return active.value === 0
  },
  set: val => {
    todos.value.forEach(todo => {
      todo.done = val
    })
  }
})


// 监听
// watchEffect(() => {

// })
</script>
<script>

</script>
<style>
.done {
  color: gray;
  text-decoration: line-through;
}
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}
.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active {
  transform: all 0.3s ease;
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.modal-enter-active {
  transition: all 0.3s ease;
}
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active{
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to{
  opacity: 0;
  transform: translateX(30px);
}
</style>