import Vue from 'vue'
import Vuex from 'vuex';
const questionsData = require('./questions.json');

Vue.use(Vuex);

const shuffleAnswers = answers => {
  let currentIndex = answers.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = answers[currentIndex];
    answers[currentIndex] = answers[randomIndex];
    answers[randomIndex] = temporaryValue;
  }

  return answers;
};

const questions = questionsData.results.sort(
  (qFirst, qSecond ) => {
    if (qFirst.difficulty < qSecond.difficulty) { return -1; }
    if (qFirst.difficulty < qSecond.difficulty) { return 1; }
    return 0;
  }).map(question => ({
    question: question.question,
    correctAnswer: question.correct_answer,
    answers: shuffleAnswers([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));


export default new Vuex.Store({
  state: {
    questions,
    showBoard: false,
    scores: []
  },

  getters: {
    boardScores: state =>
      [...state.scores].sort((firstScore, secondScore) => {
          if (firstScore.totalScore > secondScore.totalScore) return -1;
          return firstScore.totalScore < secondScore.totalScore ? 1 : 0;
        })
  },

  mutations: {
    SHOW_BOARD: (state, show) => state.showBoard = show,

    SAVE_USER_SCORE: (state, { username, totalScore, questions }) => {
      state.scores.push({
        username,
        totalScore,
        questions,
        date: new Date()
      });
    }
  },
  actions: {
    updateShowBoard: ({ commit }, show) => commit('SHOW_BOARD', show),

    saveUserScore: ({ commit }, { username, totalScore, questions }) =>
      commit('SAVE_USER_SCORE', { username, totalScore, questions })
  }
});
