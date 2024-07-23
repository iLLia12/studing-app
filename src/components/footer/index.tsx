import Image from "next/image";
import ProgrammingLangIcon from "../../components/svg/programming-lang/icon-1.svg";
import WhiteboardIcon from "../../components/svg/whiteboard/icon-1.svg";

export default function Footer() {
  return (
    <div className={`fixed w-full bg-zinc-900 h-[50px] dark-bg-sec`}>
      <div className="w-full grid grid-cols-12 gap-2 h-full">
        <button className="dark-bg-normal text-center rounded m-1 flex justify-center items-center transition ease-in-out duration-200 hover:shadow-stone-600 shadow-md">
          <Image
            priority
            src={ProgrammingLangIcon}
            height={30}
            width={30}
            alt="Programming lang"
          />
        </button>
        <button className="dark-bg-normal text-center rounded m-1 flex justify-center items-center transition ease-in-out duration-200 hover:shadow-stone-600 shadow-md">
          <Image
            priority
            src={WhiteboardIcon}
            height={30}
            width={30}
            alt="Whiteboard"
          />
        </button>
      </div>
    </div>
  );
}
