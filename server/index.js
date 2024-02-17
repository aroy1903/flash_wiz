
let card = {question: "ehfwfsljadf", answer: "fsifhsakjfhdsk"}


let dataO = {
  username: "jimmy",
  deck: "naruto",
  question: card.question,
  answer: card.answer,
}






const data = fetch("http://127.0.0.1:5000/addcard", {
    method: "POST", 
    headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    body: JSON.stringify(dataO)
}) 
