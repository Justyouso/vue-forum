<template>
  <div id="layout">
    <LayoutHeader />
    <!-- <LayoutNav /> -->
    <LayoutMain />
  </div>
</template>

<script>
import LayoutHeader from './Components/Header'
// import LayoutNav from './Components/Nav'
import LayoutMain from './Components/Main'

export default {
  name: 'layout',
  components: {LayoutHeader,LayoutMain},
  setup(props){

  }
}
</script>

<style lang="scss" scoped>
#layout {
    // overflow: scroll;
    // height: 100vh;
}
</style>