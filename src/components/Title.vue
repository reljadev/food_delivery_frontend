<template>
    <div class="splash-container">
      <div class="center-container">
        <h1>{{ title }}</h1>
        <div class="component-container">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "Title",
    props: ["title"]
}

</script>

<style scoped>

.splash-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
  background-color: green;
}

.center-container {
  align-self: center;
}

.center-container > h1 {
  color: white;
  font-family: Modak, tahoma, sans-serif;
  font-size: 5.3vw;
  text-align: center;
  opacity: 0.9;
}

.component-container {
  display: flex;
  justify-content: center;
}

</style>