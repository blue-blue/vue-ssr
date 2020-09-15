<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="要开始啦"
      @keyup.enter="addTodo"
    />
    <Item
      v-for="(todo, index) in resolveTodos"
      :todo="todo"
      @deleteTodo="deleTodoItem"
      :key="'item' + index"
    />
    <Tabs
      :todos="todos"
      :filter="filter"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>
<script>
import Item from './Item'
import Tabs from './Tabs'
export default {
  name: 'Todo',
  components: {
    Item,
    Tabs
  },
  data() {
    return {
      id: 1,
      todos: [],
      filter: 'all'
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 监听属性 类似于data概念
  computed: {
    resolveTodos() {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter((todo) => completed === todo.completed)
    }
  },
  // 方法集合
  methods: {
    addTodo(e) {
      let val = e.target.value.trim()
      if (!val) {
        alert('你不输入，我怎么知道你接下来要做什么呢？')
        return false
      }
      this.todos.unshift({
        id: this.id++,
        content: val,
        completed: false
      })
      e.target.value = ''
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed)
    },
    deleTodoItem(id) {
      this.todos.splice(
        this.todos.findIndex((todo) => todo.id === id),
        1
      )
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang="scss" scoped>
.real-app {
  width: 700px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
