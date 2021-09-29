<template>
  <div class="sidebar-nav">
    <slot />
  </div>
</template>

<style>
.sidebar-nav {
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  background: #222;
  text-align: left;
}

.sidebar-nav a {
  display: inline-block;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px 10px 10px;
}

.sidebar-nav a.router-link-exact-active {
  background: #333;
  color: #42b983;
}

.sidebar-nav a:hover {
  background: #111;
  color: #62c993;
}
</style>