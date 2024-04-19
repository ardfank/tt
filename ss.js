var im;
function gg(s,t){
  // console.log(im.format[t].format_note);
  if(s<1){
    $('#test').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[t-1].url+"' onerror='gg(this.videoHeight,"+(t-1)+")' onloadedmetadata='gg(this.videoHeight,"+(t-1)+")'></video>");
    // console.log(s,t);
  }
}
function hf(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
$(document).ready(function(){
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
