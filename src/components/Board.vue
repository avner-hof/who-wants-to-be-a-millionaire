<template>
  <div class="content-container board-container">
    <div class="header">
      <div class="start-game-btn" @click="updateShowBoard(false)">Start Game</div>
    </div>
    <h2 class="title">LEADER BOARD</h2>
    <div class="users-wrapper">
      <div v-for="(boardScore, index) in boardScores" :key="index" class="user-score">
        <span>{{ boardScore.username }}</span>
        <span>{{ boardScore.totalScore }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Board",

  computed: {
    ...mapGetters(['boardScores'])
  },

  methods: {
    ...mapActions(['updateShowBoard'])
  }
}
</script>

<style scoped>
.board-container {
  background-color: #2D2F31;
  height: 100vh;
}

.start-game-btn {
  padding: 10px;
  width: 200px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.5);
  border: thick solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin: 25px 25px
}

.start-game-btn:hover {
  border-color: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.title {
  color: rgb(254, 247, 166);
  margin-bottom: 30px;
}

.users-wrapper {
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
  overflow-y: scroll;
}

.user-score {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: start;
  color: rgba(254, 247, 166, 0.9);
  font-size: 32px;
}

</style>
