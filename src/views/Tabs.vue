<template>
  <div class="helper">
    <span class="left">{{ unFinishedTodoLen }} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 监听属性 类似于data概念
  computed: {
    unFinishedTodoLen() {
      return this.todos.filter((todo) => todo.completed === false).length
    }
  },
  // 方法集合
  methods: {
    toggleFilter(state) {
      this.$emit('toggle', state)
    },
    clearAllCompleted() {
      this.$emit('clearAllCompleted')
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang="scss" scoped>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #fff;
  font-size: 14px;
  font-smoothing: antialiased;
}
.left,
.clear,
.tabs {
  padding: 0 10px;
  box-sizing: border-box;
  font-weight: bold;
}
.left,
.clear {
  width: 150px;
}
.left {
  text-align: left;
}
.clear {
  text-align: right;
  cursor: pointer;
}
.tabs {
  width: 200px;
  display: flex;
  justify-content: space-around;
  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);
    &.actived {
      border-color: rgba(175, 47, 47, 0.4);
      border-radius: 5px;
    }
  }
}
</style>
