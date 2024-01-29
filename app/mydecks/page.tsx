"use server";

import Deck from "../components/Deck";

export default async function MyDecks() {
  return (
    <div className="w-full">
      <div className="w-full">
        <Deck />
      </div>
    </div>
  );
}
