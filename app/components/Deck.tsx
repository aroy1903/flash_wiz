"use server";
import Image from "next/image";
import defaultImg from "./default_image.jpg";
import clickOnDeck from "../actions/serverActions";

export default async function Deck({
  deckName,
  username,
  source,
}: {
  deckName: string;
  username: string;
  source: string;
}) {
  return (
    <div className=" flex flex-col text-[20px] rounded-lg bg-black w-fit  m-5 text-white">
      <Image
        src={source ? source : defaultImg}
        alt="Naruto"
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
