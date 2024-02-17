"use client";
import { redirect } from "next/navigation";
import signUserUp from "../firebase/firebaseActions";
import { signUserIn } from "../firebase/firebaseActions";
import { FlashCard } from "../create/page";
export async function signUp(formData: FormData) {
  const frmData = {
    email: formData.get("email"),
    pass: formData.get("pass"),
    usrname: formData.get("username"),
  };
  let result;
  let error;

  if (
    typeof frmData.email === "string" &&
    typeof frmData.pass === "string" &&
    typeof frmData.usrname === "string"
  ) {
    await signUserUp(frmData.email, frmData.pass, frmData.usrname).then((r) => {
      result = r.result;
      error = r.error;

      if (result !== null) {
        console.log(result.user);
        fetch("http://127.0.0.1:5000/newuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: result.user,
            uid: result.user,
          }),
        }).catch((e: Error) => console.log(e.message));
        redirect("/content");
      }
    });
  }

  return error;
}

export async function createDeck(
  cards: FlashCard[],
  deckName: string,
  username: string,
  email: string
) {
  for (const card of cards) {
    let dataO = {
      username,
      deck: deckName,
      question: card.question,
      answer: card.answer,
      email,
    };

    const data = fetch("http://127.0.0.1:5000/addcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataO),
    }).catch((e: Error) => console.log(e.message));
  }
}

export async function loginUser(formData: FormData) {
  const frmData = {
    email: formData.get("email"),
    pass: formData.get("pass"),
  };
  let result;
  let error;

  await signUserIn(frmData.email as string, frmData.pass as string).then(
    (r) => {
      result = r.result;
      error = r.error;
      if (result !== null) {
        redirect("/content");
      }
    }
  );

  return error;
}
