import { searchDecks } from "../actions/serverActions";
import Deck from "../components/Deck";

export default function MainPage() {
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
        <button className="text-2xl">🔍</button>
      </form>
      <div className=" w-full">
        <Deck />
      </div>
    </div>
  );
}
