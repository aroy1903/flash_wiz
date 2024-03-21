import { searchDecks } from "@/app/actions/serverActions";
import Deck from "@/app/components/Deck";

async function getAllDecks(uid: string, key: string) {
  let ue = { uid };
  const res = await fetch(`http://127.0.0.1:5000/search/${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
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
      <div className=" w-full"></div>
    </div>
  );
}
