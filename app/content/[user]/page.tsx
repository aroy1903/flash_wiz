import { searchDecks } from "@/app/actions/serverActions";
import Deck from "@/app/components/Deck";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

async function getAllDecks(uid: string) {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querysnapshot = await getDocs(q);

  let ue = {};
  querysnapshot.forEach((doc) => {
    ue = doc.data();
  });
  let x = [];
  const res = await fetch("http://127.0.0.1:5000/alldecks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
    body: JSON.stringify(ue),
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return res.json();
}

export default async function MainPage({
  params,
}: {
  params: { user: string };
}) {
  const { user } = params;

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
        <input type="hidden" name="uid" value={user} />
        <button className="text-2xl">🔍</button>
      </form>
      <div className=" w-full"></div>
    </div>
  );
}
