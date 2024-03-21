"use server";

import { redirect } from "next/navigation";

export default async function clickOnDeck(frmData: FormData) {
  let deckName = frmData.get("deckName");

  redirect(`/learn/${deckName}`);
}

export async function searchDecks(frmData: FormData) {
  let key = frmData.get("searchKey");
  let uid = frmData.get("uid");

  if (!key) {
    return;
  }

  redirect(`/search/${key}?uid=${uid}`);
}
