<template>
  <div id="app">
    <Login v-if="currentScreen === 'login'" @open-register="showRegister" @login-success="startGame" />
    <Register v-if="currentScreen === 'register'" @close-register="showLogin" />
    <Game v-if="currentScreen === 'game'" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Game from './components/Game.vue';

export default {
  name: 'App',
  components: {
    Login,
    Register,
    Game,
  },
  setup() {
    const currentScreen = ref('login');

    const showRegister = () => {
      currentScreen.value = 'register';
    };

    const showLogin = () => {
      currentScreen.value = 'login';
    };

    const startGame = () => {
      currentScreen.value = 'game';
    };

    return {
      currentScreen,
      showRegister,
      showLogin,
      startGame,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>