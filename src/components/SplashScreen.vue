<template>
  <div class="splashscreen">
    <img src="@/assets/cashflow-icon.svg" alt="Logo" />
    <h1><span>Cash</span>App</h1>
  </div>
</template>

<style scoped>
.splashscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
h1 {
  font-weight: bold;
  color: var(--brand-blue);
}
h1 span {
  color: var(--brand-green);
}
</style>
