var im;
let region=navigator.languages[2]??navigator.languages[1]??'id';
function los(os,f){
	var rect = document.getElementsByTagName("footer")[0].getBoundingClientRect();
    // console.log(os,rect.top,window.innerHeight,rect.bottom);
	if(rect.top-os < window.innerHeight && rect.bottom >= 0){
		f();
	}
}
function getSearchOrHashBased(url) {
  if(!url) url = location.href;
  var question = url.indexOf("?");
  var hash = url.indexOf("#");
  if(hash==-1 && question==-1) return {};
  if(hash==-1) hash = url.length;
  return question==-1 || hash==question+1
    ? url.substring(hash)
    : url.substring(question+1, hash);
}

function getJsonFromUrl(query) {
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.split("+").join(" "); // + to space, regexp-free version
    var eq = part.indexOf("=");
    var key = eq>-1 ? part.substr(0,eq) : part;
    var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    var from = key.indexOf("[");
    if(from==-1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf("]",from);
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}
function hfz(size) {
    var i = (size == 0 || size == null) ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
function uts(ts){
    return new Date(ts*1000).toLocaleString('id-ID');
}
function gg(s,t){
  if(s<1){
    $('#pr').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[t-1].url+"' onerror='gg(this.videoHeight,"+(t-1)+")' onloadedmetadata='gg(this.videoHeight,"+(t-1)+")'></video>");
  }
}
async function rad(){
  let rd = await fetch('https://www.tikwm.com/api/feed/list?region='+region.replace('en','id')+'&count=15');
  let radj = await rd.json();
  if(radj.data!==undefined){
    for(const radf of radj.data){
      let dur=(radf.duration>0)?radf.duration:0;
      let atl=(radf.size>0)?"🎡 "+hfz(radf.size)+" - 👁 "+radf.play_count.toLocaleString():"👁 "+radf.play_count.toLocaleString();
      var ct=uts(radf.create_time);
      $('#gal').append("<div class='responsive' title='@"+radf.author.unique_id+"\n"+dur+"\" ("+atl+")\n"+ct+"' alt='"+dur+"\" ("+atl+") "+ct+"'><span class='cp'>@"+radf.author.unique_id+"<br/>"+ct+"<br/>"+dur+"\" ("+atl+")</span><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"' onclick='location.assign(\"?q=https://www.tiktok.com/@"+radf.author.unique_id+"/video/"+radf.video_id+"\")'></video></div>");
    }
    $(window).on('resize scroll',function(){los(5,function(){
      if(radj.data.hasMore===false){
        $('footer img').attr('src','loading2.gif');
      }else{
        rad();
      }
      $(window).off('resize scroll');
    });});
  }
}
async function rud(u,c){
  c=c??0;
  let rd = await fetch('https://www.tikwm.com/api/user/posts?unique_id='+u+'&count=15&cursor='+c);
  let radj = await rd.json();
  if(radj.data!==undefined){
    for(const radf of radj.data.videos){
      let dur=(radf.duration>0)?radf.duration:0;
      let atl=(radf.size>0)?"🎡 "+hfz(radf.size)+" - 👁 "+radf.play_count.toLocaleString():"👁 "+radf.play_count.toLocaleString();
      var ct=uts(radf.create_time);
      $('#gal').append("<div class='responsive' title='@"+radf.author.unique_id+"\n"+dur+"\" ("+atl+")\n"+ct+"' alt='"+dur+"\" ("+atl+") "+ct+"'><span class='cp'>@"+radf.author.unique_id+"<br/>"+ct+"<br/>"+dur+"\" ("+atl+")</span><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"' onclick='location.assign(\"?q=https://www.tiktok.com/@"+radf.author.unique_id+"/video/"+radf.video_id+"\")'></video></div>");
    }
    $(window).on('resize scroll',function(){los(5,function(){
      if(radj.data.hasMore===false){
        $('footer img').attr('src','loading2.gif');
      }else{
        rud(u,radj.data.cursor);
      }
      $(window).off('resize scroll');
    });});
  }
}
async function rsd(u,c){
  c=c??0;
  let dr = await fetch('https://www.tikwm.com/api/feed/search?keywords='+u+'&count=15&cursor='+c);
  let radj = await dr.json();
  if(radj.data!==undefined){
    for(const radf of radj.data.videos){
      let dur=(radf.duration>0)?radf.duration:0;
      let atl=(radf.size>0)?"🎡 "+hfz(radf.size)+" - 👁 "+radf.play_count.toLocaleString():"👁 "+radf.play_count.toLocaleString();
      var ct=uts(radf.create_time);
      $('#gal').append("<div class='responsive' title='@"+radf.author.unique_id+"\n"+dur+"\" ("+atl+")\n"+ct+"' alt='"+dur+"\" ("+atl+") "+ct+"'><span class='cp'>@"+radf.author.unique_id+"<br/>"+ct+"<br/>"+dur+"\" ("+atl+")</span><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"' onclick='location.assign(\"?q=https://www.tiktok.com/@"+radf.author.unique_id+"/video/"+radf.video_id+"\")'></video></div>");
    }
    $(window).on('resize scroll',function(){los(5,function(){
      if(radj.data.hasMore===false){
        $('footer img').attr('src','loading2.gif');
      }else{
        rsd(u,radj.data.cursor);
      }
      $(window).off('resize scroll');
    });});
  }
}
async function red(s,u){
  $('#gal').html("");
  $('#res').fadeIn();$('#ult').fadeOut(); $('#link').html("");
  $.post('https://tt.networkreverse.com/tapi', {vid:s},function(data) {
    im=data;
  }).done(function(){
    im.format.forEach(el=>{
      $('#link').prepend("<a href='"+el.url+"' note='"+el.format_note+"' download='"+im.uploader+"-"+im.id+"'>"+el.resolution+"-"+hf(el.filesize)+"<br/>("+el.vcodec+")</a>");
      $('#res').fadeOut();$('#ult').fadeIn();
    })
    $('#pr').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[im.format.length-1].url+"' onerror='gg(this.videoHeight,im.format.length-1)' onloadedmetadata='gg(this.videoHeight,im.format.length-1)'></video>");
  });
  rud(u);
}
function hf(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
$(document).ready(function(){
  let query=getSearchOrHashBased(location.href);
  if(query.length>1){
    query=getJsonFromUrl(query);
  };
  // console.log(!query.q);
  if(!query.q){
    rad();
  }else{
    let idv=query.q.match(/https:\/\/www.tiktok.com\/(.*)\/video\/(\d+)/);
    // console.log();
    if(idv!==null && idv[2]!==null){
      red(idv[2],idv[1]);
    }else{
      rsd(query.q);
    }
  }
  // rad();
  $('#vid').on('change',function(){
    let vid=$(this).val();
    location.href='?q='+vid;
  });
});
