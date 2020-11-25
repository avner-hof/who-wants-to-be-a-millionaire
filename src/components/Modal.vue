<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" :disabled="isDisabled" @click="$emit('close')">
                {{ buttonText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Modal',

    props: {
      buttonText: {
        type: String,
        required: false,
        default: 'OK'
      },

      isDisabled: {
        type: Boolean,
        required: false
      }
    }
  }
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #000000;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: OpenSans, Helvetica, Arial, sans-serif;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  height: 69px;
  width: 150px;
  border-radius: 100px;
  border-width: 0;
  margin-right: 10px;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0;
  font-family: inherit;
  text-align: center;
  background-color: #FF8F48;
  color: #FFFFFF;
}

.modal-default-button:focus {
  outline: none;
}

.modal-default-button:disabled {
  background-color: #F0F0F0;
}

.modal-default-button:hover:enabled {
  background-color: #F68034;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
