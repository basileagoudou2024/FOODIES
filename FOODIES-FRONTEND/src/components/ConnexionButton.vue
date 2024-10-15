<script setup lng="ts">
</script>


<template>
    
     <button @click="openLoginForm"  class="connexion">connexion</button>

</template>

<style scoped>

    button {
    display: flex;

    background-color:  #28a745;
    text-align: center;
    align-items: center;
  

    color: white;
    border-radius: 25px;
    border: none;
    padding: 0.6em 1em;
    font-size: 13px;
    cursor: pointer;
    margin: 10px;
    width: 80px;
    height: 35px;

    }

button:hover {
  background-color: #218838;
}


</style>