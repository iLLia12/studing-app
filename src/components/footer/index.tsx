export default function Footer() {
  return (
    <div className={`fixed w-full bg-zinc-900 h-[50px] dark-bg-sec`}>
      <div className="w-full grid grid-cols-12 gap-2 h-full">
        <button className="bg-slate-400 text-center m-1 col-start-6 col-end-7">
          Add lang
        </button>
        <button className="bg-slate-400 text-center m-1 col-start-7 col-end-8">
          Drawing
        </button>
      </div>
    </div>
  );
}
