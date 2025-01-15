<template>
  <div id="app">
    <h1>YAY! IT WORKS!</h1>
    <div class="env">Env Flag: <strong>{{ env }}</strong>
      <div>
        <button @click="setTheme('dark')" v-if="!theme">Dark</button>
        <button @click="setTheme('colorful')" v-if="!theme">Colorful</button>
        <button @click="theme = ''" v-else>Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      env: process.env.ENV_FLAG,
      theme: ''
    }
  },
  watch: {
    theme(val) {
      document.documentElement.className = val
    }
  },
  methods: {
    setTheme(theme) {
      if (this.theme === '') {
        this.theme = theme
      } else {
        this.theme = ''
      }
    }
  },
  mounted() {
    document.documentElement.className = this.theme
    console.log(this.env)
  }
}
</script>

<style lang="scss">
@import './assets/scss/styles';
</style>
