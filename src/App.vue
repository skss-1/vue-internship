<template>
  <div id="app">
    <header>
      <ul>
        <li>
          <router-link to="/todo">Home</router-link>
        </li>
        <li>
          <router-link to="/history">TodoHistory</router-link>
        </li>
      </ul>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.input-area {
  border-top: 5px solid #131c25;
  border-bottom: 5px solid #131c25;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  background-color: #d3e7fb;
  input {
    padding: 5px 10px;
    font-size: 1.2em;
    font-weight: bold;
  }
  textarea {
    min-height: 80px;
    padding: 5px 10px;
  }
  button {
    padding: 5px 20px;
    font-size: 1.4em;
    font-weight: bold;
    border-radius: 10px;
    background-color: #2c3e50;
    color: white;
    border: none;
  }
  div {
    font-size: 1.1em;
    input {
      margin-right: 5px;
      vertical-align: middle;
      height: 20px;
      width: 20px;
    }
  }
}

.task-area {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1.3em;
  .task-item {
    border-left: 10px solid rgb(0, 78, 70);
    border-right: 10px solid rgb(0, 78, 70);

    span:hover {
      font-weight: bold;
    }
    button {
      margin: 0px 5px;
      border-radius: 5px;
      font-size: 0.8em;
    }
    input {
      margin: 5px;
      border-radius: 10px;
      padding: 0 5px;
    }
    textarea {
      margin: 5px;
      border-radius: 10px;
      padding: 5px;
      font-size: 1em;
    }
    .task-checkbox {
      vertical-align: middle;
      height: 25px;
      width: 25px;
    }
    .high-priority {
      background-color: rgb(215, 75, 50);
      color: white;
      width: 50%;
      margin: 5px auto;
    }
  }
  .item-checked span {
    text-decoration: line-through;
  }
  background-color: #f2f8ff;
}

header {
  margin-top: 20px;
  ul {
    display: flex;
    justify-content: center;
    gap: 30px;
    li {
      a {
        text-decoration: none;
      }
      list-style-type: none;
    }
  }
}
</style>
