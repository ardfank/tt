$(document).ready(function(){
  $.post('https://tt.networkreverse.com/tapi', {vid:'7358399196233288966',app:'tiktok'}, function(data) {
  console.log(data);
  });
});
