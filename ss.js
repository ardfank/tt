$(document).ready(function(){
  $.post('https://tt.networkreverse.com/tapi', {vid:'7357960040021593349',app:'tiktok'}, function(data) {
  $('body').append(data);
  });
});
