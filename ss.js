var im;
function gg(s,t){
  if(s<1){
    $('#test').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[t-1].url+"' onerror='gg(this.videoHeight,"+(t-1)+")' onloadedmetadata='gg(this.videoHeight,"+(t-1)+")'></video>");
  }
}
async function rad(){
  let rad = await fetch('https://www.tikwm.com/api/feed/list?region=ID&count=4');
  let radj = await rad.json();
  for(const radf of radj.data){
    $('#gal').append("<div class='responsive'><video preload='none' poster='"+radf.origin_cover+"' src='"+radf.play+"' id='"+radf.video_id+"' onclick='red(\""+radf.video_id+"\")'></video></div>");
  }
}
function red(s){
  $('#vid').val(s);
  $('#vid').trigger('change');
}
function hf(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
$(document).ready(function(){
  rad();
  $('#vid').on('change',function(){
    let vid=$(this).val();
    $.post('https://tt.networkreverse.com/tapi', {vid:vid,app:'tiktok'},function(data) {
      im=data;
    }).done(function(){
      im.format.forEach(el=>{
        $('#link').prepend("<a href='"+el.url+"' note='"+el.format_note+"' download='"+im.uploader+"-"+im.id+"'>"+el.resolution+"-"+hf(el.filesize)+"<br/>("+el.vcodec+")</a>");
      })
      $('#test').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[im.format.length-1].url+"' onerror='gg(this.videoHeight,im.format.length-1)' onloadedmetadata='gg(this.videoHeight,im.format.length-1)'></video>");
    });
  });
});
