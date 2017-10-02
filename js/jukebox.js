SC.initialize({
 client_id: 'fd4e76fc67798bfa742089ed619084a6'
});




function Jukebox(element){
 this.playlist = [
   {id: 242618729, name:"Yoste", title: "Yoste - Chihiro", artwork_url: "https://i.ytimg.com/vi/N9fDDjZAenU/maxresdefault.jpg", genre:"Emo", profile: "https://soundcloud.com/yoste" },
   {id: 330264858, name:"Yoste", title: "Yoste - Moon", artwork_url: "https://i.ytimg.com/vi/aThWDTpO1rc/maxresdefault.jpg", genre:"Emo", profile:"https://soundcloud.com/yoste"},
   {id: 343280755, name:"Khalid", title: "Perfect (rough draft)", artwork_url: "https://f4.bcbits.com/img/a2611571174_10.jpg", genre:"R&B & Soul", profile:"https://soundcloud.com/thegreatkhalid"},
   {id: 209546078, name:"Jai Wolf", title: "Jai Wolf - Indian Summer", artwork_url: "https://i.ytimg.com/vi/rNrs-wMwL1k/maxresdefault.jpg", genre:"Hip-hop & Rap", profile:"https://soundcloud.com/jaiwolfmusic"}
 ];
 this.currentSong = 0;
 this.jukebox = element;
 this.elCurrentSong = element.querySelector(".currentSong");
 this.elGenre = element.querySelector(".genre");
 this.elProfile = element.querySelector(".profile");
 this.elName = element.querySelector(".name");

}

Jukebox.prototype = {
 play: function(){
   console.log("inside play", this)
   let song = this.playlist[this.currentSong];
   if( song.player ) {
     song.player.seek(0);
     song.player.play();
   } else {
     SC.stream(`/tracks/${song.id}`).then(function(player){
       song.player = player;
       player.play();
     });
   }
 },
 pause: function(){
   console.log("this:", this);
   if(this.playlist[this.currentSong].player)
     this.playlist[this.currentSong].player.pause();
 },

 back: function(){
   this.pause();
      this.currentSong = (this.currentSong + this.playlist.length - 1) % this.playlist.length;
     this.updateUI();
 },
 forward: function(){
   this.pause();
     this.currentSong = (this.currentSong + 1) % this.playlist.length;
     this.updateUI();

 },
 updateUI: function(){
     // update the content of the current Song
     this.elCurrentSong.innerText = this.playlist[this.currentSong].title;
     document.querySelector(".artwork").src = this.playlist[this.currentSong].artwork_url
     this.elGenre.innerText = `Genre: ${this.playlist[this.currentSong].genre}`;
     document.querySelector("a").href=this.playlist[this.currentSong].profile
     document.querySelector("a").innerText = `Artist Profile: ${this.playlist[this.currentSong].name}`;
     document.querySelector(".tracks").href=this.playlist[this.currentSong].tracks
     document.querySelector(".tracks").innerText = `All Tracks: ${this.playlist[this.currentSong].title}`;
     this.play();
 }
};


let jukebox
, elControls
, elBack
, elPlay
, elPause
, elForward
;

 document.addEventListener("DOMContentLoaded",function(){
   console.log("loaded")
   elPlayer = document.querySelector("audio");
   // store the jukebox and pass the elPlayer through to it
   jukebox = new Jukebox(document.querySelector(".jukebox"));
   elControls = document.querySelector(".controls")
   elBack = document.querySelector(".fa-backward");
   elPlay = document.querySelector(".fa-play");
   elPause = document.querySelector(".fa-pause");
   elForward = document.querySelector(".fa-forward");


   console.log(jukebox)
   elPlay.addEventListener("click", function(){
     jukebox.play();
   });

   elPause.addEventListener("click", function(){
       jukebox.pause();
   });

   elForward.addEventListener("click", function(){
       jukebox.forward();
   });

   elBack.addEventListener("click", function(){
       jukebox.back();
      });
  
});


SC.resolve("https://soundcloud.com/skrillex/kendrick-lamar-humble-skrillex-remix").then(function(data){
console.log(data)
});