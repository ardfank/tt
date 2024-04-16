$(document).ready(function(){
  $.post('https://ppwp.networkreverse.com/tapi', {vid:'7358399196233288966',app:'tiktok'}, function(data) {
  console.log(data);
  });
});
