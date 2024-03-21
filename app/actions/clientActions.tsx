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

        redirect("/search");
      }
    });
  }

  return error;
}

export async function createDeck(
  cards: FlashCard[],
  deckName: string,
  uid: string,
  email: string,
  image: File
) {
  const profile_pic = uploadFlashcardProfile(image, deckName);

  const data = fetch("http://127.0.0.1:5000/adddeck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, email, deckName }),
  }).catch((e: Error) => console.log(e.message));

  for (const card of cards) {
    let dataO = {
      uid,
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

export async function uploadFlashcardProfile(file: File, deckName: string) {
  const formInput = new FormData();
  formInput.append("File", file);
  formInput.append("deckname", JSON.stringify(deckName));
  const data = await fetch("http://127.0.0.1:5000/upload_profile", {
    method: "POST",
    body: formInput,
  });
  const img = await data.json();
  console.log(img);
  return img.link;
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
        redirect("/search");
      }
    }
  );

  return error;
}

export async function searchDecksClient(frmData: FormData) {
  let key = frmData.get("searchKey");
  let uid = frmData.get("uid");

  if (!key) {
    return;
  }

  redirect(`/search/${key}?uid=${uid}`);
}
