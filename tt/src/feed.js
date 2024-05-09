async function userf(a,b){
let gb=[];let bg="";
await fetch("https://www.tiktok.com/api/post/item_list/?WebIdLastTime=0&aid=1988&app_language=en&app_name=tiktok_web&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Linux%20x86_64&browser_version=5.0%20%28X11%3B%20Linux%20x86_64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F124.0.0.0%20Safari%2F537.36&channel=tiktok_web&cookie_enabled=true&count=35&coverFormat=2&cursor=0&device_id=7316086886253118994&device_platform=web_pc&focus_state=true&from_page=user&history_len=2&is_fullscreen=false&is_page_visible=true&language=en&odinId=7316086680083022866&os=linux&priority_region=&referer=&region=ID&screen_height=1080&screen_width=1920&secUid=MS4wLjABAAAA3Wucr9GRJJJ27VgDdCAQi1XLbiMIVuDclRh9avu8SS6VLOIAAKPFJzYHjK2J46pN&tz_name=Asia%2FMakassar&webcast_language=en&msToken=T7WlonkROVoSooLIQxNtwCzhLKLRqx3kd9jqJhxHJfhtqpT1wwDiBa77h-VsTXOc_T8fikS8juOoE488_LfGYyqKcyWn6S7kl4df_8ZWOnMgJgp51U85oh9TcKa9qCoQrg==&X-Bogus=DFSzswVOqDTANJ3otR7lO2CU9Oh-&_signature=_02B4Z6wo00001EMZdNwAAIDBSx28qEdamUBDGXBAAHcB1e", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,id;q=0.8",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    // "cookie": "ttwid=1%7CNRLOJzLLKSJUlEm115BN8ZVTH_lcpGH-xOo6XXU6W5g%7C1703409233%7Cea5d4501289f689af5fd2427eac87f7b13aedc922199936d1153c3ad4ed54962; tt_chain_token=j6BDhTvBnqarK2ts3cCq1g==; odin_tt=038255f3cb6dad4d39078b03bc90c98244648f3032e68f9e71952dfb449e338db244223935400b2807ca3a214ddff76c3ee621ff392b48ea3bfa1a74b7db9bdc45d11a683d65b37121707b20d4e7d49f; passport_csrf_token=6688732d2375fc18f07ded0a9079c588; passport_csrf_token_default=6688732d2375fc18f07ded0a9079c588; tiktok_webapp_theme=dark; living_user_id=701696677954; msToken=MuX0yBxaNEwtsAAwsut8bM-4BEZCLQUYj7-DnCCTmkOWIyGX_zjKHOGWf1M3fQ5VMRB15UB_UGbxOEzNZJcY4kuK7bAL4ByqR3zT-xj9OvvoRJ2bgffsb039kGpXRcMGjw==; tt_csrf_token=IN3GplQu-LF_oDjiU307P-Ltz7DjNsooPdHQ; msToken=CzOYk9ExfXgltgm2Xm1PrlWZxPgT8W61Nwtr6EYbRSGmcSp6Rp05oFmbxssFHKTC4P4t6DzLlqx1ABzLJKavEljkWrW88AdZM7NqeMk8xv7eUCwOMpEewfFjj0K0x-tasw==; ak_bmsc=4EB120B71EB692DEA5113B935CBD34E0~000000000000000000000000000000~YAAQfr4vF7hHGU6PAQAAHGrGWxeD3d90azmNOD1TzTHoi6oEQERDH/QMGOGDul/i5Fq9Dq+3ubETVJlqtwgru9Iv/e5pnQtDC9FH0cuIblG+/JNvLo5go8QXiK7oIk7M6hvgsOHQ/itaJ0+Zkn05+7xwskrJjO8Fpw8vphOhNx8OAheszbk52QFy+8CXDkL4WBdgV6iPs4eFphoumyMWtoDPPAHT36wGI5kCMwk1F3h4PP7HLU7ez4en1HV6o9qG2mKgEOhqxy3rKq0lToIag+Rjf+GfQ4UPrqI7JyYzoNFi1Njlnne8lUhaj0PBEwY+YiBY57SXBnBhJhx2nqqbANKhR9b4JbpFb3mgtTWRlolKUjAHLByiAIhnNOw=",
    "Referer": "https://www.tiktok.com/@vinaaalstni",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  // "body": null,
  "method": "GET"
})
  .then(response => {
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    // Get headers
    const headers = response.headers;
    // Loop through headers and log them
    headers.forEach((value, name) => {
      console.log([`${name}:${value}`]);
      gb.push(`${name}:${value}`);
	  // console.log(name)
    });
	return response.text();
  }).then(data=>{
	  bg=data;
})
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  console.log(/*JSON.stringify(gb)*/);
  b(JSON.stringify(gb),bg);
}
module.exports = {
  userf
};
