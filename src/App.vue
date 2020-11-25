<template>
  <div id="app">
    <div class="header">
      <img alt="header" class="header-img" src="./assets/header_footer_image.png"/>
      <img alt="header title" class="header-title" src="./assets/zoom_info_header.png"/>
    </div>

    <Board v-if="showBoard"></Board>
    <Questions v-else></Questions>

    <div class="footer">
      <img alt="footer" class="footer-img" src="./assets/header_footer_image.png"/>
    </div>
  </div>
</template>

<script>
import Questions from './components/Questions';
import Board from './components/Board';

import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Board,
    Questions
  },

  computed: {
    ...mapState(['showBoard'])
  }
}
</script>

<style>
#app {
  font-family: OpenSans, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  font-size: x-large;
}

.header,
.footer {
  height: 104px;
  width: 100vw;
  position: relative;
  border: 0;
}

.header-img {
  transform: scaleY(-1);
  width: 100%;
}

.footer-img {
  width: 100%;
}

.header-title {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
  margin: auto;
}

.content-container {
  display: flex;
  flex-direction: column;
  margin: 30px;
}

</style>
