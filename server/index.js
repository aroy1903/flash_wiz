
let dataO = {username: 'fasdfasd', uid: "TfmAnq0a5ehoxP1PGsg2tqymnXi1"}

const data = fetch("http://127.0.0.1:5000/alldecks").then((r)=> r.json()).then((data)=>

console.log(data)

)





/*const data = fetch("http://127.0.0.1:5000/alldecks", {
    method: "POST", 
    headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    body: JSON.stringify(dataO)
}) 
*/