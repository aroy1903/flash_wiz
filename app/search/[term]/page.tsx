import { searchDecks } from "@/app/actions/serverActions";
import Deck from "@/app/components/Deck";
import { UserDeck } from "@/app/mydecks/page";

function transformArray(array: string[]) {
  let ud: UserDeck = { deck: array[0], profileLink: array[1], user: array[2] };

  return ud;
}

async function getAllDecks(uid: string, key: string) {
  let ue = { uid };
  const res = await fetch(`http://127.0.0.1:5000/search/${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ue),
  });

  return res.json();
}

export default async function MainPage({
  searchParams,
  params,
}: {
  params: { term: string };
  searchParams: { [uid: string]: string | string[] | undefined };
}) {
  const { uid } = searchParams;
  const { term } = params;

  const data = await getAllDecks(uid as string, term);
  const sd: UserDeck[] = [];

  for (const deck of data) {
    sd.push(transformArray(deck));
  }

  return (
    <div className=" min-h-[88vh] flex flex-col">
      <form
        className=" h-[5vh]  w-full flex items-center justify-center mt-8"
        action={searchDecks}
      >
        <input
          type="text"
          className="w-[50%] border border-black border-solid h-[3.5vh] pl-2 mt"
          placeholder="search..."
          name="searchKey"
        />
        <input type="hidden" name="uid" value={uid} />
        <button className="text-2xl">🔍</button>
      </form>
      <div className=" w-full  flex flex-wrap">
        {sd.map((d) => (
          <Deck
            deckName={d.deck}
            username={d.user}
            source={d.profileLink}
            key={d.deck}
          />
        ))}
      </div>
    </div>
  );
}
