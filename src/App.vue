<template>
  <div id="app">
    <h1>YAY! IT WORKS!</h1>
    <div class="env">
      Env Flag: <strong>{{ env }}</strong>
      <div>
        <button v-if="!theme" @click="setTheme('dark')">
          Dark
        </button>
        <button v-if="!theme" @click="setTheme('colorful')">
          Colorful
        </button>
        <button v-else @click="theme = ''">
          Reset
        </button>
      </div>
      <div v-html="theme" />
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
    theme(value) {
      document.documentElement.className = value
    }
  },
  mounted() {
    document.documentElement.className = this.theme
    console.log(this.env)
  },
  methods: {
    setTheme(theme) {
      this.theme = this.theme === '' ? theme : ''

      const array = [1]
      for (const element of array) {
        console.log(element)
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/styles';
</style>
