<template>
  <center>
    <h1>404</h1>
    <p>
      Oops, something went wrong!
    </p>
    <b-button href="/">
      Back to home <span style="padding-left: 0.2em;"><font-awesome-icon icon="fa-solid fa-house" /></span>
    </b-button>
  </center>
</template>

<script>

  export default {
    name: 'NotFound'
  }

</script>

<style scoped>

  center {
    margin: 15vw;
  }

  h1 {
    color: black;
    font-family: Modak, tahoma, sans-serif;
    font-size: 12vw;
    font-weight: bold;
    opacity: 0.8;
  }

</style>