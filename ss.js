var im;
function gg(s,t){
  // console.log(im.format[t].format_note);
  if(s<1){
    $('#test').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[t-1].url+"' onloadedmetadata='gg(this.videoHeight,"+(t-1)+")'></video>");
    // console.log(s,t);
  }
}

$(document).ready(function(){
  $('#vid').on('change',function(){
    let vid=$(this).val();
    $.post('https://tt.networkreverse.com/tapi', {vid:vid,app:'tiktok'},function(data) {
      im=data;
    }).done(function(){
      im.format.forEach(el=>{
        $('#link').append("<a href='"+el.url+"' download='"+im.uploader+"-"+im.id+"'>"+el.resolution+"-"+el.filesize+"-"+el.vcodec+"-"+el.format_note+"</a>");
      })
      $('#test').html("<video preload='metadata' id='video' loop muted controls src='"+im.format[im.format.length-1].url+"' onloadedmetadata='gg(this.videoHeight,im.format.length-1)'></video>");
    });
  });
});
