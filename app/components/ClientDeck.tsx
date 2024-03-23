import Image from "next/image";
import clickOnDeck from "../actions/clientActions";
import defaultImage from "./default_image.jpg";
export default function ClientDeck({
  deckName,
  source,
  username,
}: {
  deckName: string;
  username: string;
  source: string;
}) {
  return (
    <div className=" flex flex-col text-[20px] rounded-lg bg-black w-fit  m-5 text-white">
      <Image
        src={source ? source : defaultImage}
        alt={deckName}
        className=" w-[300px] h[300px] rounded-lg"
        width={300}
        height={300}
        priority={true}
      ></Image>

      <form action={clickOnDeck} className=" w-[300px] text-center">
        <input
          type="text"
          name="deckName"
          hidden={true}
          readOnly
          value={deckName}
        />
        <button className=" w-full">{deckName}</button>
      </form>
    </div>
  );
}
