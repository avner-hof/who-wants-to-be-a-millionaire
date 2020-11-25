<template>
  <div class="content-container">
    <div class="meta-data">
      <div>
        <span class="meta-data-caption">Lives: </span>
        <img class="heart-img" src="../assets/heart.svg" v-for="index in livesCount" :key="index">
      </div>
      <span>Questions: {{ currentQuestionNum }}/{{ numOfQuestions }} </span>
      <div>
        <span class="meta-data-caption">Points: {{ totalPoints }}</span>
      </div>
    </div>
    <div class="questions-answers-container">
      <div class="question-wrapper">
        <div class="question-text">
          <span class="question-num">Q:{{ currentQuestionNum }}</span>
          <div><strong>{{ currentQuestion }}?</strong></div>
        </div>
        <div>
          <span><strong>Time: </strong></span>
          <span class="timer">{{ secondsLeft }} Seconds</span>
        </div>
      </div>
      <div class="answers-wrapper">
        <template v-for="answer in currentAnswers">
          <div class="answer-container" tabindex="0" :key="answer" :disabled="selectedAnswer !== '' && chosenAnswer !== ''"
               :class="{'answer-selected': selectedAnswer === answer,
                        'correct-answer': answer === chosenAnswer && correctAnswer === answer,
                        'wrong-answer': answer === chosenAnswer && correctAnswer !== answer}"
               @click="selectedAnswer = answer">
            <img v-if="answer === chosenAnswer && correctAnswer === answer" alt="correct answer" src="../assets/correct_answer.png" class="answer-img">
            <img v-else-if="answer === chosenAnswer && correctAnswer !== answer" alt="wrong answer" src="../assets/wrong_answer.png" class="answer-img">
            <p>{{ answer }}</p>
          </div>
        </template>
      </div>
    </div>
    <div class="buttons-container">
      <div class="ok-continue-wrapper">
        <button v-if="showOkButton" class="btn ok-btn"
                :disabled="selectedAnswer === ''" @click="checkAnswer">OK</button>
        <button v-else class="btn ok-btn" @click="moveToNextQuestion">Continue</button>
      </div>
      <div class="skip-section">
        <button class="btn skip-btn" :disabled="maxSkips - skips === 0 || !showOkButton" @click="skipQuestion">SKIP</button>
        <div class="skips-text">{{maxSkips - skips}} Remaining</div>
      </div>
    </div>
    <div class="dots">
      <div v-for="index in numOfQuestions" :key="index" class="dot" :class="{'question-dot': index === currentQuestionNum}"></div>
    </div>
    <UserDetailsModal v-if="showUserDetailsModal" :correct-answers="numOfCorrectAnswers"
                      :num-of-questions="numOfQuestions" @close="saveScore"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UserDetailsModal from './UserDetailsModal';

export default {
  name: 'Questions',
  components: {
    UserDetailsModal
  },

  mounted() {
    this.currentQuestion = this.questions[0].question;
    this.currentAnswers = this.questions[0].answers;
    this.correctAnswer = this.questions[0].correctAnswer;

    this.setTimer();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  data() {
    return {
      livesCount: 3,
      currentQuestionNum: 1,
      numOfQuestions: this.$store.state.questions.length,
      totalPoints: 0,
      maxSkips: 3,
      skips: 0,
      secondsLeft: 20,
      selectedAnswer: '',
      chosenAnswer: '',
      correctAnswer: '',
      numOfCorrectAnswers: 0,
      currentQuestion: '',
      currentAnswers: [],
      timer: 0,
      questionsAnswers: {},
      showUserDetailsModal: false
    };
  },

  computed: {
    ...mapState(['questions']),

    showOkButton() {
      return this.chosenAnswer === '' && this.secondsLeft > 0
    }
  },

  methods: {
    ...mapActions(['updateShowBoard', 'saveUserScore']),

    checkAnswer() {
      clearInterval(this.timer);
      this.chosenAnswer = this.selectedAnswer;
      this.questionsAnswers[this.currentQuestion] = this.chosenAnswer;

      if (this.chosenAnswer === this.correctAnswer) {
        this.totalPoints += 10;
        this.numOfCorrectAnswers++;
      } else {
        this.livesCount --;
      }
    },

    resetQuestionData() {
      this.selectedAnswer = '';
      this.chosenAnswer = '';
      this.secondsLeft = 20;

      this.currentQuestion = this.questions[this.currentQuestionNum].question;
      this.currentAnswers = this.questions[this.currentQuestionNum].answers;
      this.currentAnswers = this.questions[this.currentQuestionNum].answers;
      this.correctAnswer = this.questions[this.currentQuestionNum].correctAnswer;

      this.currentQuestionNum++;

      this.setTimer();
    },

    moveToNextQuestion() {
      if (this.livesCount === 0 || this.currentQuestionNum === this.numOfQuestions) {
        this.showUserDetailsModal = true;
      } else {
        this.resetQuestionData();
      }

    },

    skipQuestion() {
      clearInterval(this.timer);
      this.skips++;
      this.questionsAnswers[this.currentQuestion] = null;
      this.resetQuestionData();
    },

    setTimer() {
      this.timer = setInterval(() => {
        this.secondsLeft--;
        if (this.secondsLeft === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },

    saveScore(username) {
      this.saveUserScore({
        username,
        totalScore: this.totalPoints,
        questions: this.questionsAnswers
      });

      this.updateShowBoard(true);
    }
  }
}
</script>

<style scoped>
.meta-data {
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  margin-bottom: 40px;
}

.meta-data-caption {
  margin-right: 10px;
}

.heart-img {
  width: 25px;
  height: 25px;
  margin: auto 0;
  vertical-align: middle;
}

.questions-answers-container {
  margin: 0 200px 47px 200px;
}

.question-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.question-text {
  width: 70%;
  text-align: left;
  display: flex;
}

.question-num {
  height: 43px;
  width: 53px;
  font-weight: bold;
  font-size: 32px;
  color: #0D7BAB;
  letter-spacing: 0;
  margin-right: 40px;
}

.timer {
  color: red;
  font-weight: bold;
}

.answers-wrapper {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  align-content: space-between;
  height: 365px;
}

.answer-container {
  width: 570px;
  height: 164px;
  background: #FAFAFA;
  border: 2px solid #D9E6EB;
  border-radius: 23px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  color: #496472;
  letter-spacing: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.answer-container:hover:not([disabled]) {
  box-shadow: 5px 5px 5px #e8e8e8;
}

.answer-container:focus {
  outline: none;
}

.answer-selected:not([disabled]) {
  border: 4px solid #0D7BAB;
}

/*.answer-container:focus:not([disabled]) {*/
/*  border: 4px solid #0D7BAB;*/
/*}*/

.correct-answer {
  border: 4px solid #33C933;
  color: #33C933;
  padding-left: 10px;
}

.wrong-answer {
  border: 4px solid #FB4343;
  color: #FB4343;
  padding-left: 10px;
}

.answer-img {
  height: 70px;
  width: 70px;
  left: 37px;
  top: 47px;
}

.buttons-container {
  display: grid;
  grid-template-columns: 37.5% 25% 37.5%;
  margin-bottom: 57px;
}

.ok-continue-wrapper {
  grid-column-start: 2;
}

.btn {
  height: 69px;
  border-radius: 100px;
  border-width: 0;
  margin-right: 10px;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0;
  font-family: inherit;
  text-align: center;
}

.btn:focus {
  outline: none;
}

.ok-btn {
  width: 375px;
  background-color: #FF8F48;
  color: #FFFFFF;
}

.ok-btn:hover:enabled {
  background-color: #F68034;
}

.btn:disabled {
  background-color: #F0F0F0;
}

.skip-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column-start: 3;
  justify-self: start;
}

.skip-btn {
  color: #0D7BAB;
  width: 150px;
  background-color: #FFFFFF;
  border: 1px solid #F0F0F0;
}

.skip-btn:hover:enabled {
  box-shadow: 5px 5px 5px #e8e8e8;
}

.skip-btn:disabled {
  box-shadow: none;
  color: #FFFFFF;
}

.skips-text {
  font-size: 18px;
}

.dots {
  width: 375px;
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
}

.dot {
  height: 15px;
  width: 15px;
  background-color: #C9CFD3;
  border-radius: 50%;
}

.question-dot {
  background-color: #0D7BAB;
}
</style>
