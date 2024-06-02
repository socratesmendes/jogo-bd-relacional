<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Usuário:</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div>
          <label for="password">Senha:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">Entrar</button>
        <button type="button" @click="openRegister">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Login',
    setup(props, { emit }) {
      const username = ref('');
      const password = ref('');
  
      const handleLogin = () => {
       
        console.log('Username:', username.value);
        console.log('Password:', password.value);
        
        if (username.value === 'user' && password.value === 'pass') {
          emit('login-success');
        } else {
          alert('Usuário ou senha incorretos!');
        }
      };
  
      const openRegister = () => {
        emit('open-register');
      };
  
      return {
        username,
        password,
        handleLogin,
        openRegister,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  </style>