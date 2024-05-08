async function userf(a,b){
let gb=[];
await fetch(a)
  .then(response => {
    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }
    // Get headers
    const headers = response.headers;
    // Loop through headers and log them
    headers.forEach((value, name) => {
      // gb.push([`${name}:${value}`]);
      gb.push(`${name}:${value}`);
	  // console.log(name)
    });
	return response.text();
  }).then(data=>{
	  gb.push(data);
})
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  console.log(/*JSON.stringify(gb)*/);
  b(JSON.stringify(gb));
}
module.exports = {
  userf
};
