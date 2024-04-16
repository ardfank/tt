// let fetchRes = fetch('https://api22-normal-c-alisg.tiktokv.com/aweme/v1/feed/?version_name=26.1.3&version_code=260103&build_number=26.1.3&manifest_version_code=260103&update_version_code=260103&_rticket=1711540893031&ts=1711540893&device_brand=Google&device_type=ASUS_Z01QD&device_platform=android&resolution=1080%2A2400&dpi=420&os_version=14&os_api=29&carrier_region=US&sys_region=US®ion=US&app_name=musical_ly&app_language=en&language=en&timezone_name=America%2FNew_York&timezone_offset=-14400&channel=googleplay&ac=wifi&mcc_mnc=310260&is_my_cn=0&ssmix=a&as=a1qwert123&cp=cbfhckdckkde1&iid=7318518857994389254&device_id=7318517321748022790&aweme_id=7350534485013974278', { method: "GET", mode: 'no-cors', headers: { 'Content-Type': 'application/json',}});
// fetchRes.then(res =>
//     res.json()).then(d => {
//     console.log(d)
// });
var payload = {
    a: 1,
    b: 2
};

var data = new FormData();
data.append( "json", JSON.stringify( payload ) );
fetch('https://ppwp.networkreverse.com/tapi',{
  method: "POST",
  body: data,
   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
})
.then(function(res){ return res.json(); })
.then(function(data){ alert( JSON.stringify( data ) ) })
