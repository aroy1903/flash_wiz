const ue = { email:'jax@gmail.com', uid:'pF5I4Eay3DOuyrYBhk5uB5GxuyT2' }


const res =  fetch("http://127.0.0.1:5000/alldecks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ue),
  }).then((val)=>val.json()).then((data)=>console.log(data))