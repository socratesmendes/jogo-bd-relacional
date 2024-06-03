<template>
  <div class="game-container">
    <div class="hero-container">
      <div class="character">
        <h3>Herói</h3>
        <p>Vida: {{ heroHealth }}</p>
      </div>
      <div class="actions" v-if="!gameOver">
        <button @click="attack">Atacar</button>
        <button @click="defend">Defender</button>
        <button @click="usePotion">Usar Poção</button>
        <button @click="runAway">Correr</button>
      </div>
      <div v-else>
        <button @click="resetGame">Recomeçar o jogo</button>
      </div>
    </div>
    <div class="villain-container">
      <div class="character">
        <h3>Vilão</h3>
        <p>Vida: {{ villainHealth }}</p>
      </div>
    </div>
    <div class="log">
      <h3>Log de Ações</h3>
      <ul>
        <li v-for="(log, index) in logs" :key="index">
          {{ log?.log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Game",
  setup() {
    const heroHealth = ref(100);
    const villainHealth = ref(100);
    const logs = ref([]);
    const gameOver = ref(false);

    const getRandomDamage = () => Math.floor(Math.random() * 21) + 10;

    const attack = async () => {
      const heroDamage = getRandomDamage();
      villainHealth.value = Math.max(villainHealth.value - heroDamage, 0);
      const msg = `Herói atacou e causou ${heroDamage} de dano.`;

      await saveLog(msg);
      logs.value = await getLogs();
      if (villainHealth.value === 0) {
        endGame("Herói venceu!");
      } else {
        villainAttack();
      }
    };

    const defend = async () => {
      const msg = "Herói defendeu.";

      await saveLog(msg);
      logs.value = await getLogs();
      villainAttack(true);
    };

    const usePotion = async () => {
      const msg = "Herói usou uma poção e recuperou 50 de vida.";

      heroHealth.value = Math.min(heroHealth.value + 50, 100);
      await saveLog(msg);
      logs.value = await getLogs();
      villainAttack();
    };

    const runAway = async () => {
      const msg = "Herói tentou correr, mas o vilão atacou.";

      await saveLog(msg);
      logs.value = await getLogs();
      villainAttack();
    };

    const saveLog = async (msg) => {
      const response = await fetch("http://localhost:3000/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tipo de conteúdo
        },
        body: JSON.stringify({
          log: msg,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    };

    const getLogs = async () => {
      const response = await fetch("http://localhost:3000/logs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    };

    const villainAttack = (defending = false) => {
      const villainDamage = getRandomDamage();
      const damageTaken = defending
        ? Math.floor(villainDamage / 2)
        : villainDamage;
      heroHealth.value = Math.max(heroHealth.value - damageTaken, 0);
      logs.value.push(`Vilão atacou e causou ${damageTaken} de dano ao herói.`);
      if (heroHealth.value === 0) {
        endGame("Vilão venceu!");
      }
    };

    const endGame = (message) => {
      logs.value.push(message);
      gameOver.value = true;
    };

    const resetGame = () => {
      heroHealth.value = 100;
      villainHealth.value = 100;
      logs.value = [];
      gameOver.value = false;
    };

    return {
      heroHealth,
      villainHealth,
      logs,
      gameOver,
      attack,
      defend,
      usePotion,
      runAway,
      resetGame,
    };
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
}

.hero-container,
.villain-container {
  width: 30%;
  text-align: center;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.character {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.log {
  width: 35%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

.log ul {
  list-style: none;
  padding: 0;
}

.log li {
  margin-bottom: 10px;
}
</style>
