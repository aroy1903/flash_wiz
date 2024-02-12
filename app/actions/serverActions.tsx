"use server";

import { redirect } from "next/navigation";

export default async function clickOnDeck() {
  redirect("/learn");
}

export async function searchDecks(frmData: FormData) {
  let key = frmData.get("searchKey");
  console.log(key);
  frmData.set("searchKey", "");
}
