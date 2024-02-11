
let dataO = {username: 'fasdfasd', uid: "TfmAnq0a5ehoxP1PGsg2tqymnXi1"}

const data = fetch("http://127.0.0.1:5000/test", {
    method: "POST", 
    headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    body: JSON.stringify(dataO)
})
