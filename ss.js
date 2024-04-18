$(document).ready(function(){
  $('#vid').on('change',function(){
    let vid=$(this).val();
    $.post('https://tt.networkreverse.com/tapi', {vid:vid,app:'tiktok'}, function(data) {
    $('#test').append(data);
    });
  });
});
