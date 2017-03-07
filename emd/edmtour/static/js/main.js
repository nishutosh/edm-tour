var current;
var sl;
var playlist= new Object();
var mouseactive;
var moveslider;
var songid;
var timeout;
var limit;

var song= new Audio();  
  $.ajax({
  url:"/topdownloads",
  type:"get",
  dataType:"json",
  data:{},
  success:function(response){
      $("#td").css("color","#0065ba");
      var obj=JSON.parse(response);
      for(var i=0;i<obj.length;i++){
     html='<div class="col-md-2"><div id='+ i+' class="musicbox"><p class="dis"><br><span class="artist"></span></br></p><img class="img-responsive albumimg"><a><img class="download" class="img-responsive" src="static/images/down.png" ></a><img class="download play" class=" img-responsive"src="static/images/play1.png" ></div></div>';
     $("#playall").append(html);
     $("#"+i).children(".albumimg").attr("src","media/"+(obj[i].fields.album_pic));
    $("#"+i).children(".dis").html(obj[i].fields.album_name.toUpperCase()+"<br><span class='artist'>"+(obj[i].fields.artist)+"</span>");
   $("#"+i).children("a").attr("href","edm/"+(obj[i].pk));
   $("#"+i).children("img").attr({
   'data-songname' : obj[i].fields.album_name, 
   'data-artist' : obj[i].fields.artist,  
   value : "media/"+obj[i].fields.music_upload, 
   'data-song' : obj[i].pk,}
   );      
        
      }
      $(".play").click(function(){
          limit=obj.length;
          for(var i=0;i<obj.length;i++){
            var mydata={"album":obj[i].fields.album_name,
                          "artist":obj[i].fields.artist,
                           "url":"media/"+obj[i].fields.music_upload,
                           "pk":obj[i].pk                              
                          };
          playlist[i]=mydata;
              console.log("l"+i+obj.length )
          
          
          }
              
          
    for(var i=0;i<obj.length;i++){ 
    
    if(playlist[i].pk==$(this).attr("data-song")){       
        current=i;
    }}
/*-----------------*/
    $(".player").fadeIn(400);
    song.src=playlist[current].url; 
    song.play();
    $("title").text(playlist[current].album +" - "+playlist[current].artist+" | EDM TOUR") ;     
     $("#liked").attr("src","static/images/like.png");
    $("#song").text(playlist[current].album);
    $("#art").text(playlist[current].artist);
    songid=playlist[current].pk;    
    $("#playpause").attr("current","play");
    var a=$("#playpause").attr("src");
    var b=a.slice(0,15)+"pause.png";
    $("#playpause").attr("src",b);
})
    },
  error:function(){
      alert("failed");}
  
  
  
  
  
  });






$("#playpause").click(function(){
    if($("#playpause").attr("current")=="play"){
    song.pause();
      window.clearTimeout(timeout);
    $("#playpause").attr("current","pause");
    var a=$("#playpause").attr("src");
    var b=a.slice(0,15)+"play.png";
      $("#playpause").attr("src",b);
    }
    else{
          song.play();
          timeout=window.setInterval(currenttime,1000);
         $("#playpause").attr("current","play");
        var a=$("#playpause").attr("src");
        var b=a.slice(0,15)+"pause.png";
        $("#playpause").attr("src",b);        
    }    
});


song.onloadedmetadata=function(){
    clearInterval(timeout);
    timeout = setInterval(currenttime,1000);
    $("#totaltime").text(caltime(song.duration));
    clearInterval(sl);
    sl=setInterval(slidermoveregular,100);
    acmoveslider=setInterval(acslidermove,10);

}
song.onended=function(){
    
    next();
}
$("#repit").click(function(){
    if(song.loop){
    song.loop=false; 
    $("#repit").attr("src","static/images/repeat.png") ;   
        
    }
    else{
    $("#repit").attr("src","static/images/loopit.png") ;  
    song.loop=true;   
        
    }
   
});


function next(){
    if(current==limit-1){
        console.log("playlistend;")
    }
    else{
         console.log(limit)
    current=current+1;
     $("#playpause").attr("current","play");
      var a=$("#playpause").attr("src");
      var b=a.slice(0,15)+"pause.png";
      $("#playpause").attr("src",b); 
     /*$(".musicbox").css("border","1px solid green");
    $(playlist[current]).parent().css("border","1px solid blue");*/
     $("#liked").attr("src","static/images/like.png");
    
    song.src=playlist[current].url; 
    song.play();
    $("#song").text(playlist[current].album);
    $("#art").text(playlist[current].artist);
    $("title").text(playlist[current].album +" - "+playlist[current].artist+" | EDM TOUR") ;   
    songid=playlist[current].pk;}
    
}
function previous(){
    if(current==limit){ console.log("playlistend");}
    else{
        console.log(limit)
    current=current-1;
     $("#playpause").attr("current","play");
    var a=$("#playpause").attr("src");
    var b=a.slice(0,15)+"pause.png";
    $("#playpause").attr("src",b); 
    $("#liked").attr("src","static/images/like.png");
    song.src=playlist[current].url; 
    song.play();
    $("#song").text(playlist[current].album);
    $("#art").text(playlist[current].artist);
    $("title").text(playlist[current].album +" - "+playlist[current].artist+" | EDM TOUR") ;   
    songid=playlist[current].pk;
}}
$(".forward").on("click",next);
$(".back").on("click",previous);

function currenttime(){ 
   $("#timepassed").text(caltime(song.currentTime));    
}

function slidermoveregular(){
    ctime=song.currentTime;
    ttime=song.duration;
    slide=(ctime/ttime)*100;
    $("#slider").val(slide);    
}

$("#slider").mousedown(function(){
    clearInterval(sl);
    clearInterval(timeout);
    mouseactive=true;
    t=setInterval(timemove,100);
    

});
$(document).mouseup(function(event){if(mouseactive){
     clearInterval(t);
    timeout=setInterval(currenttime,1000)
     song.currentTime=($("#slider").val()/100)*song.duration;
     mouseactive=false;
    currenttime();
     sl=setInterval(slidermoveregular,100);   
    
}});
   
function timemove(){
     $("#timepassed").text(caltime(($("#slider").val()/100)*song.duration));
    
}
function acslidermove(){
    
     $("#sslider").css("width",$("#slider").val()+"%");

    
}

   

function caltime(time)
{
    time=Math.floor(time);
    min=Math.floor(time/60);
    sec=time%60
    if(min<10){
        min="0"+min;        
    }
    if(sec<10){
        
        sec="0"+sec;
    }
   totaltime=min+":"+sec;
return totaltime;        
}
function albumplay(){
    
    
    
}
$("#liked").click(function(){

  $.ajax({
  url:"/like",
  type:"get",
  data:{likeid:songid},
  success:function(){
    
    $("#liked").attr("src","static/images/liked.png"); },
  error:function(){
      alert("failed");}
  
  
  
  
  
  }); 
  
  });
$("#td,#lt").click(function(){
    $("li").css("color","#333");
   var urluse;
        if($(this).attr("id")=="td"){
            urluse="/topdownloads";
            $("#td").css("color","#0065ba");
        }
    else if($(this).attr("id")=="lt"){
            urluse="/mostliked";
        $("#lt").css("color","#0065ba");
        }
    
  $.ajax({
  url:urluse,
  type:"get",
  dataType:"json",
  data:{},
  success:function(response){
      $("#playall").html("");
      var obj=JSON.parse(response);
      $("#charts").html("");
      for(var i=0;i<obj.length;i++){
     html='<div class="col-md-2"><div id='+ i+' class="musicbox"><p class="dis"><br><span class="artist"></span></br></p><img class="img-responsive albumimg"><a><img class="download" class="img-responsive" src="static/images/down.png" ></a><img class="download choice" class=" img-responsive"src="static/images/play1.png" ></div></div>';
     $("#playall").append(html);
     $("#"+i).children(".albumimg").attr("src","media/"+(obj[i].fields.album_pic));
    $("#"+i).children(".dis").html(obj[i].fields.album_name+"<br><span class='artist'>"+(obj[i].fields.artist)+"</span>");
   $("#"+i).children("a").attr("href","edm/"+(obj[i].pk));
   $("#"+i).children("img").attr({
   'data-songname' : obj[i].fields.album_name, 
   'data-artist' : obj[i].fields.artist,  
   value : "media/"+obj[i].fields.music_upload, 
   'data-song' : obj[i].pk,}
   );      
        
      }
      $(".musicbox").fadeIn("slow");
      $(".choice").click(function(){
          limit=obj.length;
          for(var i=0;i<obj.length;i++){
            var mydata={"album":obj[i].fields.album_name,
                          "artist":obj[i].fields.artist,
                           "url":"media/"+obj[i].fields.music_upload,
                           "pk":obj[i].pk                              
                          };
          playlist[i]=mydata;
              console.log("click"+i+obj[i].pk )
          
          
          }
              
          
    for(var i=0;i<obj.length;i++){ 
    
    if(playlist[i].pk==$(this).attr("data-song")){       
        current=i;
    }}
    $(".player").fadeIn(400);
    song.src=playlist[current].url; 
    song.play();
    $("title").text(playlist[current].album +" - "+playlist[current].artist+" | EDM TOUR") ;     
     $("#liked").attr("src","static/images/like.png");
    $("#song").text(playlist[current].album);
    $("#art").text(playlist[current].artist);
    songid=playlist[current].pk;    
    $("#playpause").attr("current","play");
    var a=$("#playpause").attr("src");
    var b=a.slice(0,15)+"pause.png";
    $("#playpause").attr("src",b);
    
  })
    },
  error:function(){
      alert("failed");}
  
  
  
  
  
  });
    
});
    
$("#searchform").on("submit",function(event){
    event.preventDefault();
     $("#charts").html("");
  console.log("Djd")  
$.ajax({
url:"/search",
type:"get",
data:{"search":$("#put").val()},
success:function(response){
    $("#playall").html("")
      $(".musicbox").css("display","none");
      var obj=JSON.parse(response);
    console.log(response);
    console.log(obj.length);
      for(var i=0;i<obj.length;i++){
     html='<div class="col-md-2"><div id='+ i+' class="musicbox"><p class="dis"><br><span class="artist"></span></br></p><img class="img-responsive albumimg"><a><img class="download" class="img-responsive" src="static/images/down.png" ></a><img class="download searchclass" class=" img-responsive"src="static/images/play1.png" ></div></div>';
     $("#playall").append(html);
     $("#"+i).children(".albumimg").attr("src","media/"+(obj[i].fields.album_pic));
    $("#"+i).children(".dis").html(obj[i].fields.album_name+"<br><span class='artist'>"+(obj[i].fields.artist)+"</span>");
   $("#"+i).children("a").attr("href","media/"+(obj[i].pk));
   $("#"+i).children("img").attr({
   'data-songname' : obj[i].fields.album_name, 
   'data-artist' : obj[i].fields.artist,  
   value : "media/"+obj[i].fields.music_upload, 
   'data-song' : obj[i].pk,}
   );  $("#"+i).fadeIn("slow");    
        
      }
    

     $(".searchclass").click(function(){
         limit=obj.length;
          for(var i=0;i<obj.length;i++){
            var mydata={"album":obj[i].fields.album_name,
                          "artist":obj[i].fields.artist,
                           "url":"media/"+obj[i].fields.music_upload,
                           "pk":obj[i].pk                              
                          };
              console.log(i )
          playlist[i]=mydata;
              console.log(i)
          
          
          }
              
          
    for(var i=0;i<obj.length;i++){ 
    
    if(playlist[i].pk==$(this).attr("data-song")){       
        current=i;
    }}
/*-----------------*/
    $(".player").fadeIn(400);
    song.src=playlist[current].url; 
    song.play();
    $("title").text(playlist[current].album +" - "+playlist[current].artist+" | EDM TOUR") ;     
     $("#liked").attr("src","static/images/like.png");
    $("#song").text(playlist[current].album);
    $("#art").text(playlist[current].artist);
    songid=playlist[current].pk;    
    $("#playpause").attr("current","play");
    var a=$("#playpause").attr("src");
    var b=a.slice(0,15)+"pause.png";
    $("#playpause").attr("src",b);
    
  })
    },
  error:function(){
      alert("failed");}
  
  
  
  
  
  });
    
    
    
    
    
    
    
    
});
$("#se").click(function(){
    $("li").css("color","#333");
    $("#se").css("color","#0065ba");
$.ajax({

url:"/charts",
type:"get",
data:{"search":$("#put").val()},
success:function(response){
    console.log(response);
    var obj=JSON.parse(response);
    html=" <p>TOP CHARTS</p><thead><tr><th>SONG</th><th><img class='timg' src='static/images/liked.png' ></th><th><img class='timg' src='static/images/down.png' ></th></tr></thead><tbody >";
      for(var i=0;i<obj.length;i++){
          html=html+"<tr><td>"+obj[i].fields.album_name+" by "+
              obj[i].fields.artist+"</td><td>"+obj[i].fields.likes+"</td><td>"+obj[i].fields.downloads+"</td></tr>"
          
    
    
    
    
          
}
    html=html+"</tbody>";
     $("#playall").html("");
    $("#charts").html(html);
    
    
},
error:function(){
      alert("f");}
  


}









);    
    
    
    
    




});


  
          