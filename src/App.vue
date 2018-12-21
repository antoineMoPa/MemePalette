<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Nav v-on:search="onSearch"/>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <div v-for="image in images" v-bind:key="image.id" v-bind:class="'meme-block ' + (is_shown(image.name)? '':'not-shown')">
          <input v-model="image.name" class="name-input">
          <img v-bind:src="image.dataURL" class="meme-image">
          <a href="#" class="delete-link" v-on:click="deleteimage(image.id)" onclick="event.preventDefault()">Delete</a>
        </div>
        <p v-if="images.length == 0">
          <br>
          You have no images. Start uploading pictures to see them appear here!
        </p>

        <h2>Upload</h2>
        <p>Click in the box bellow or drag and drop images in the box.</p>
        <div class="dropzone" id="dropzone">
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {
      search: '',
      images: [],
      shown_popup: false
    };
  },
  methods: {
    onSearch(data) {
      this.search = data;
    },
    newFile(image){
      const app = this;
      
      let reader = new FileReader();
      reader.onload = (e) => {
        let im = {
          id: app.images.length,
          name: image.name,
          dataURL: e.target.result
        };
        app.images.push(im);
        app.update_ls();
      };

      // read the image file as a data URL.
      reader.readAsDataURL(image);

      // I don't want normal dropzonejs previews
      document.querySelectorAll('.dz-preview').forEach((el) => {el.parentNode.removeChild(el)});
    },
    update_ls() {
      let app = this;
      let images = [];
      let i = 0;
      this.images.map((im) => {
        images.push({
          id: i,
          name: im.name,
          dataURL: im.dataURL
        });
        i++;
      });
      // Ask for permanent storage
      navigator.storage.persist().then((granted) => {
        if (granted) {
          caches.open('images').then(cache => {
            var resp = new Response(JSON.stringify(images));
            return cache.put('images', resp)
          });
        } else {
          if(!app.shown_popup){
            app.shown_popup = true;
            alert("Image might not be stored permanently. (Note: in chrome, you have to bookmark the site)");
          }
        }
      });

      
    },
    deleteimage(i){
      this.images.splice(i,1);
    },
    is_shown(name) {
      let search = this.search;

      if(search == ""){
        return true;
      }

      let distance = levenrotate(search, name);
      if(distance < Math.floor(0.2 * search.length)+1){
        return true;
      }
      return false;
    }
  },
  watch: {
    images(){
      this.update_ls();
    }
  },
  mounted(){
    let app = this;

    var dz = new Dropzone("#dropzone", {
      url: "#",
      maxFilesize: 4, // MB,
      uploadMultiple: true,
      parallelUploads: 100,
      maxFiles: 100,
      init() {
        this.on("addedfile", app.newFile);
      }
    });

    try{
      caches.open('images').then(cache => {
        cache.match('images').then(res => {
          res.json().then((images) => {
            images.map((im) => {
              app.images.push(im);
            });
          });
        })
      });
    } catch (e) {
      console.log("no prior readable data");
    }
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
  color: #333;
}
.mdl-layout__content{
  width:100%;
}
.page-content{
  padding-top:60px;
}
.dropzone{
  background:#eee;
  width:300px;
  text-align:center;
  line-height:200px;
  height:200px;
  margin:auto;
  border:3px dashed #3af;
  margin-bottom:30px;
}
.dropzone.dz-drag-hover {
  border:8px dashed #3af;
  box-shadow:0 0 30px rgba(0,0,0,0.3);
}
.meme-block{
  max-width:300px;
  box-shadow:0 0 8px rgba(0,0,0,0.3);
  margin:20px;
  padding:20px;
  display:inline-block;
}
.meme-image{
  max-width:100%;
}
.name-input:not(:focus){
  border:none;
  font-weight:bolder;
}
.name-input{
  margin-bottom:10px;
}
.instructions,h1,h2,h3,p{
  padding-left:20px;
  padding-right:20px;
}
.meme-block.not-shown{
  display:none;
}
.delete-link{
  display:block;
  text-align:center;
  margin-top:10px;
  margin-bottom:-5px;
}
</style>
