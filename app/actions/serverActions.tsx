"use server";

import { redirect } from "next/navigation";

export default async function clickOnDeck(frmData: FormData) {
  let key = frmData.get("deckName");
  let arr: string[] = [];
  let userName = "";
  let deckName = "";

  if (typeof key == "string") {
    arr = key.split(",");
  }
  userName = arr[0];
  deckName = arr[1];

  redirect(`/learn/${userName}/${deckName}`);
}

export async function searchDecks(frmData: FormData) {
  let key = frmData.get("searchKey");
  console.log(key);
  frmData.set("searchKey", "");
}
