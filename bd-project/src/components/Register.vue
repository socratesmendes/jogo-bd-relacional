<template>
  <div class="register-container">
    <h2>Cadastro</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="newUsername">Usuário:</label>
        <input id="newUsername" v-model="newUsername" type="text" required />
      </div>
      <div>
        <label for="newPassword">Senha:</label>
        <input
          id="newPassword"
          v-model="newPassword"
          type="password"
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
      <button type="button" @click="closeRegister">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Register",
  setup(props, { emit }) {
    const newUsername = ref("");
    const newPassword = ref("");

    const handleRegister = async () => {
      console.log("New Username:", newUsername.value);
      console.log("New Password:", newPassword.value);

      const response = await fetch("http://localhost:3000/users", {
        method: "POST", // Método HTTP
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo
        },
        body: JSON.stringify({
          name: "",
          email: newUsername.value,
          password: newPassword.value,
        }), // Corpo da solicitação
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Usuário cadastrado com sucesso!");
    };

    const closeRegister = () => {
      emit("close-register");
    };

    return {
      newUsername,
      newPassword,
      handleRegister,
      closeRegister,
    };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>
