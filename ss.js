var im;
let region=navigator.languages[2]??navigator.languages[1]??'id';
function cp(){
    $(".responsive").mouseenter(function(){
      $(this).children('.cp').fadeIn();
    });
    $(".responsive").mouseleave(function(){
      $(this).children('.cp').slideUp();
    });
}
function los(os,f){
	var rect = document.getElementsByTagName("footer")[0].getBoundingClientRect();
    // console.log(os,rect.top,window.innerHeight,rect.bottom);
	if(rect.top-os < window.innerHeight && rect.bottom >= 0){
		f();
	}
}
function changeVideoSource(blob,f) {
  var blobUrl = URL.createObjectURL(blob);
  console.log(`Changing video source to blob URL "${blobUrl}"`)
  var a = document.createElement("a");
  a.href = blobUrl;
  a.setAttribute("download", f);
  a.click();
}

function fetchVideo(url) {
  return fetch(url).then(function(response) {
    return response.blob();
  });
}

function dl(s,f){
  // event.preventDefault();
  fetchVideo(s).then(function(blob) {
    changeVideoSource(blob,f);
  });
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
  // $('#res').fadeIn();
  let rd = await fetch('https://www.tikwm.com/api/feed/list?region='+region.replace('en','id')+'&count=4');
  let radj = await rd.json();
  if(radj.data!==undefined){
    for(const radf of radj.data){
      let dur=(radf.duration>0)?radf.duration:0;
      let atl=(radf.size>0)?"🎡 "+hfz(radf.size)+" - 👁 "+radf.play_count.toLocaleString():"👁 "+radf.play_count.toLocaleString();
      var ct=uts(radf.create_time);
      $('#gal').append("<div class='responsive' title='@"+radf.author.unique_id+"\n"+dur+"\" ("+atl+")\n"+ct+"' alt='"+dur+"\" ("+atl+") "+ct+"' onclick='location.assign(\"?q=https://www.tiktok.com/@"+radf.author.unique_id+"/video/"+radf.video_id+"\")'><span class='cp'>@"+radf.author.unique_id+"<br/>"+ct+"<br/>"+dur+"\" ("+atl+")</span><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"'></video></div>");
      $('#res').fadeOut();
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
  let galb=document.getElementById('gal').getBoundingClientRect();
  let contb=document.getElementById('cont').getBoundingClientRect();
  if(contb.bottom>galb.bottom){
    rad();
  }
  cp();
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
      $('#gal').append("<div class='responsive' title='@"+radf.author.unique_id+"\n"+dur+"\" ("+atl+")\n"+ct+"' alt='"+dur+"\" ("+atl+") "+ct+"' onclick='location.assign(\"?q=https://www.tiktok.com/@"+radf.author.unique_id+"/video/"+radf.video_id+"\")'><span class='cp'>@"+radf.author.unique_id+"<br/>"+ct+"<br/>"+dur+"\" ("+atl+")</span><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"'></video></div>");
      $('#res').fadeOut();
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
  let galb=document.getElementById('gal').getBoundingClientRect();
  let contb=document.getElementById('cont').getBoundingClientRect();
  if(contb.bottom>galb.bottom){
    rud(u,radj.data.cursor);
  }
  cp();
}
async function rsd(u,c){
  // $('#res').fadeIn();
  c=c??0;
  let dr = await fetch('https://www.tikwm.com/api/feed/search?keywords='+u+'&count=15&cursor='+c);
  let radj = await dr.json();
  if(radj.data!==undefined){
    for(const radf of radj.data.videos){
      let dur=(radf.duration>0)?radf.duration:0;
      let atl=(radf.size>0)?"🎡 "+hfz(radf.size)+" - 👁 "+radf.play_count.toLocaleString():"👁 "+radf.play_count.toLocaleString();
      var ct=uts(radf.create_time);
      $('#gal').append("<div class='responsive' title='@"+radf.author.unique_id+"\n"+dur+"\" ("+atl+")\n"+ct+"' alt='"+dur+"\" ("+atl+") "+ct+"' onclick='location.assign(\"?q=https://www.tiktok.com/@"+radf.author.unique_id+"/video/"+radf.video_id+"\")'><span class='cp'>@"+radf.author.unique_id+"<br/>"+ct+"<br/>"+dur+"\" ("+atl+")</span><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"'></video></div>");
      $('#res').fadeOut();
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
  let galb=document.getElementById('gal').getBoundingClientRect();
  let contb=document.getElementById('cont').getBoundingClientRect();
  if(contb.bottom>galb.bottom){
    rsd(u,radj.data.cursor);
  }
  cp();
}
async function red(s,u){
  $('#gal').html("");
  $('#res').fadeIn();$('#ult').fadeOut();$('#link').html("");
  $.post('https://tt.networkreverse.com/tapi', {vid:s},function(data) {
    im=data;
  }).done(function(){
    im.format.forEach(el=>{
      if(el.url.includes('api')){return}
      $('#link').prepend("<a target='_blank' onclick='event.preventDefault();dl(\""+el.url+"\",\""+im.uploader+"-"+im.id+".mp4\")' href='"+el.url+"' note='"+el.format_note+"' download='"+im.uploader+"-"+im.id+"'>"+el.resolution+"-"+hf(el.filesize)+"<br/>("+el.vcodec+")</a>");
      $('#res').fadeOut();$('#ult').fadeIn();
    })
    let ttl=(im.fulltitle!==null)?im.fulltitle:"No Title";
    document.title=ttl+" - "+im.uploader+" - "+im.id+" - "+uts(im.timestamp)+" - User video search - Network Reverse";
    $('meta[property="og:title"]').attr('content', im.uploader+' - '+ttl+' - '+im.id+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
    $('meta[name="twitter:title"]').attr('content', im.uploader+' - '+ttl+' - '+im.id+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
    $('meta[property="og:description"]').attr('content', im.uploader+' - '+ttl+' - '+im.id+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
    $('meta[name="twitter:description"]').attr('content', im.uploader+' - '+ttl+' - '+im.id+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
    $('meta[name="description"]').attr('content', im.uploader+' - '+ttl+' - '+im.id+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
    $('#pp').html("<div class='clearfix'/><h1>"+ttl+"</h1><h4><a href='?q=user:"+im.uploader+"'>@"+im.uploader+"</a> at "+uts(im.timestamp)+" | 👁 "+im.view_count.toLocaleString()+" ⭐ "+im.bodydance_score+"</h4>");
    $('#pr').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[im.format.length-1].url+"' onerror='gg(this.videoHeight,im.format.length-1)' onloadedmetadata='gg(this.videoHeight,im.format.length-1)'></video>");
  });
  rud(u);
}
function hf(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
$(document).ready(function(){
  $('meta[property="og:url"]').attr('content', location.href);
  $('link[rel="canonical"]').attr('href', location.href);
  let query=getSearchOrHashBased(location.href);
  if(query.length>1){
    query=getJsonFromUrl(query);
  };
  // console.log(!query.q);
  if(!query.q){
    $('#res').fadeIn();
    rad();
  }else{
    let idv=query.q.match(/https:\/\/www.tiktok.com\/(.*)\/video\/(\d+)/);
    if(idv!==null && idv[2]!==null){
      $('#res').fadeIn();
      red(idv[2],idv[1]);
    }else if(query.q.includes('user:')){
      document.title=query.q.replace('user:','')+" - User video search - Network Reverse";
      $('meta[name="twitter:title"]').attr('content', query.q.replace('user:','')+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[property="og:title"]').attr('content', query.q.replace('user:','')+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[name="description"]').attr('content', query.q.replace('user:','')+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[name="twitter:description"]').attr('content', query.q.replace('user:','')+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[property="og:description"]').attr('content', query.q.replace('user:','')+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('#res').fadeIn();
      rud(query.q.replace('user:',''));
    }else{
      document.title=query.q+" - video search - Network Reverse";
      $('meta[name="og:title"]').attr('content', query.q+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[name="twitter:title"]').attr('content', query.q+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[name="description"]').attr('content', query.q+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[name="twitter:description"]').attr('content', query.q+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('meta[name="og:description"]').attr('content', query.q+' - Tiktok Video Downloader - Network Reverse. Download and preview Video from Tiktok without watermark with many different format, serach keyword, user search');
      $('#res').fadeIn();
      rsd(query.q);
    }
  }
  // rad();
  $('#vid').on('change',function(){
    let vid=$(this).val();
    location.href='?q='+vid;
  });
  document.onkeydown = function(e) {
    if(e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
      switch (e.keyCode) {
          case 190:
              $("html,body").animate({ scrollTop: 0 },"slow");
              break;
          case 188:
              $('html,body').animate({scrollTop: document.body.scrollHeight},"slow");
              break;
      }
    }
  }
});
