async function userf(a,b){
let gb=[];let bg="";
await fetch(a,{
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-US,en;q=0.9,id;q=0.8",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "ttwid=1%7CNRLOJzLLKSJUlEm115BN8ZVTH_lcpGH-xOo6XXU6W5g%7C1703409233%7Cea5d4501289f689af5fd2427eac87f7b13aedc922199936d1153c3ad4ed54962; tt_chain_token=j6BDhTvBnqarK2ts3cCq1g==; odin_tt=038255f3cb6dad4d39078b03bc90c98244648f3032e68f9e71952dfb449e338db244223935400b2807ca3a214ddff76c3ee621ff392b48ea3bfa1a74b7db9bdc45d11a683d65b37121707b20d4e7d49f; passport_csrf_token=6688732d2375fc18f07ded0a9079c588; passport_csrf_token_default=6688732d2375fc18f07ded0a9079c588; tiktok_webapp_theme=dark; living_user_id=701696677954; msToken=T7WlonkROVoSooLIQxNtwCzhLKLRqx3kd9jqJhxHJfhtqpT1wwDiBa77h-VsTXOc_T8fikS8juOoE488_LfGYyqKcyWn6S7kl4df_8ZWOnMgJgp51U85oh9TcKa9qCoQrg==; msToken=MuX0yBxaNEwtsAAwsut8bM-4BEZCLQUYj7-DnCCTmkOWIyGX_zjKHOGWf1M3fQ5VMRB15UB_UGbxOEzNZJcY4kuK7bAL4ByqR3zT-xj9OvvoRJ2bgffsb039kGpXRcMGjw=="
  },
  "body": null,
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
