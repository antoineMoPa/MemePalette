<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Nav v-on:search="onSearch"/>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <h1>The problem</h1>
        <p>A lot of people have family/friend memes that can be shared in group conversations.</p>
        <p>I wanted to have a quick tool to store and search memes.</p>
        <h1>Solution: MemePalette</h1>
        <p class="instructions">MemePalette is a tiny app that lets you quickly add images and search them.</p>
        <p class="instructions">The goal is to have quick response images available a few keystrokes away.</p>
        <p class="instructions">The images are stored in your browser's cache.</p>
        <h3>Instructions</h3>
        <p class="instructions">Right-Click -> Copy and paste in any application!</p>
        <p class="instructions">Click image title to change it.</p>
        <h3>Persisting storage in Chrome/Chromium</h3>
        <p>
            For Chrome to allow persistent storage, according to 
            <a href="https://developers.google.com/web/updates/2016/06/persistent-storage">
            Google Developers blog</a> 
            either make sure that&nbsp;:
            <ul>
            <li>The site is bookmarked (and the user has 5 or less bookmarks)</li>
            <li>The site has high site engagement</li>
            <li>The site has been added to home screen</li>
            </ul>
        </p>
        <p>Chrome has a weird behaviour on this one, I suggest just using Firefox, a free independent browser.</p>

        <h3>Download a copy of your memes</h3>
        <p>Download as a zip folder, extract and re-upload files to other computers.</p>
        <p>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" v-on:click="download">
                Download archive
            </button>
        </p>
        <br><br>
      </div>
    </main>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'About',
  components: {
    Nav,
  },
  data() {
    return {
      search: '',
      images: [],
    };
  },
  methods: {
    onSearch(val){
      window.location.href = "/";
    },
    download(){
      caches.open('images').then(cache => {
        cache.match('images').then(res => {
          res.json().then((images) => {
            var zip = new JSZip();
            images.map((im) => {
              zip.file(im.name, im.dataURL.replace(/^data:image.*;base64,/, ""), {base64: true});
            });
            zip.generateAsync({type:"blob"}).then(function(content) {
              saveAs(content, "memepalette_backup.zip");
            });
          });
        })
      });  
    }
  }
};
</script>

<style scoped>
#app {
  font-family: sans-serif;
  color: #333;
}
.mdl-layout__content{
  width:100%;
}
.page-content{
  padding-top:60px;
  padding-left:20px;
  padding-right:20px;
  font-size:120%;
}
.instructions,h2,h3,p{
  padding-left:20px;
  padding-right:20px;
}
</style>
