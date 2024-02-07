
let dataO = {username: 'jimm', uid: 42314}

const data = fetch("http://127.0.0.1:5000/newuser", {
    method: "POST", 
    headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    body: JSON.stringify(dataO)
})

console.log(data)