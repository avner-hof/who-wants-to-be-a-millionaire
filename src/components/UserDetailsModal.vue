<template>
  <Modal :button-text="'Save'" :is-disabled="!isUsernameValid" @close="close">
    <template #header>
      <h3>Game Over!</h3>
    </template>
    <template #default>
    <p class="game-stats">You answered correctly on:<br/>
      <span class="questions">{{ correctAnswers }} out of {{ numOfQuestions }} questions</span>
    </p>
    <h3 class="name-title">Please enter your name:</h3>
    <div class="user-details">
      <input class="username-input" v-model="username"/>
      <div v-show="!isUsernameValid" class="validator">{{ validationMessage }}</div>
    </div>
  </template>
  </Modal>
</template>

<script>
import Modal from './Modal';

const alphaNumericRegex = /^[a-z0-9]+$/i;

export default {
  name: 'UserDetailsModal',
  components: {
    Modal
  },

  data() {
    return {
      username: '',
      isUsernameValid: false,
      validationText: {
        empty: 'Name can not be empty',
        alphaNum: 'Name can contain only alpha-numeric characters'
      },
      validationMessage: ''
    }
  },

  props: {
    correctAnswers: {
      type: Number,
      required: true
    },
    numOfQuestions: {
      type: Number,
      required: true
    }
  },

  methods: {
    close() {
      this.$emit('close', this.username);
    }
  },

  watch: {
    username(value) {
      if (!value) {
        this.isUsernameValid = false;
        this.validationMessage = this.validationText.empty;
      } else if (!alphaNumericRegex.test(value)) {
        this.isUsernameValid = false;
        this.validationMessage = this.validationText.alphaNum;
      } else {
        this.isUsernameValid = true;
      }
    }
  }
}
</script>

<style scoped>

.modal-header > h3 {
  margin-top: 0;
  color: #FFFFFF;
}

.user-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100px;

}

.name-title {
  color: #FFFFFF;
}

.username-input {
  height: 30px;
  width: 200px;
  text-align: center;
  font-size: 30px;
  /*flex: 1;*/
}

.username-input:focus {
  outline: none;
}

.validator {
  margin-left: 20px;
  color: red;
}

.game-stats {
  color: #FFFFFF;
  overflow: hidden;
}

.questions {
  color: #33C933;
  font-weight: bold;
}

</style>
