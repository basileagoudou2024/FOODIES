<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <!----<div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>-->

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/images/image1.jpg" class="d-block w-100" alt="Image 1">
        <div class="carousel-caption d-none d-md-block">
     <!----    <h5>Première image</h5>
          <p>Description de la première image.</p> -->
        </div>
      </div>

      <div class="carousel-item">
        <img src="/images/image2.jpg" class="d-block w-100" alt="Image 2">
        <div class="carousel-caption d-none d-md-block">
      <!----<h5>Deuxième image</h5>
          <p>Description de la deuxième image.</p>  -->
        </div>
      </div>

      <div class="carousel-item">
        <img src="/images/image3.jpg" class="d-block w-100" alt="Image 3">
        <div class="carousel-caption d-none d-md-block">
       <!----<h5>Troisième image</h5>
          <p>Description de la troisième image.</p>  -->
        </div>
      </div>

      <div class="carousel-item">
        <img src="/images/image4.jpg" class="d-block w-100" alt="Image 4">
        <div class="carousel-caption d-none d-md-block">
       <!----   <h5>Troisième image</h5>
          <p>Description de la troisième image.</p>  -->
        </div>
      </div>

      <div class="carousel-item">
        <img src="/images/image5.jpg" class="d-block w-100" alt="Image 3">
        <div class="carousel-caption d-none d-md-block">
       <!----<h5>Troisième image</h5>
          <p>Description de la troisième image.</p> -->
        </div>
      </div>
    </div>

    <!-- Boutons de contrôle -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Précédent</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Suivant</span>
    </button>
  </div>
</template>

<script setup lang="ts">
// Aucune logique JavaScript supplémentaire n'est nécessaire ici
</script>

<style scoped>
.carousel-inner img {
  height: 15vh;
  width: 2%;
  object-fit: cover; /* Ajuste l'image dans le conteneur */
}
</style>
