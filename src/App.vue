<template>
  <div class="wrap">
    <div class="cover"></div>
    <Header />
    <Todo />
    <Footer />
  </div>
</template>
<script>
import Header from './views/Header'
import Footer from './views/Footer.jsx'
import Todo from './views/Todo'
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    Todo
  },
  data() {
    return {
      title: 'vue app'
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .cover {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    width: 100%;
    background-color: #999;
    opacity: 0.5;
  }
}
</style>
