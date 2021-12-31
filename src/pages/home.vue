<script setup lang='ts'>
import TodoList from "../components/TodoList.vue"
import { useUserStore } from "../store/modules/user"
import { computed, ref } from 'vue'

const store = useUserStore()
console.log("store",store);

const token = ref(store.token)

</script>

<template>
  <h1>home</h1>
  <h2>token: {{ token }}</h2>
  <TodoList />
</template>