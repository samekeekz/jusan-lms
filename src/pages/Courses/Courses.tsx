import IconSearch from "@/assets/search.svg";

const Courses = () => {
  return (
    <div className=" flex items-start  gap-14">
      <div className="flex grow flex-col justify-center">
        <h1 className="font-bold text-[34px] leading-6 mb-3">Курсы</h1>
        <div className="max-w-[778px] w-full flex items-center gap-3 bg-[#D9D9D9] rounded-[10px] px-4 py-[7px]">
          <div className="">
            <img className="w-full h-full" src={IconSearch} alt="icon-search" />
          </div>
          <input
            className="bg-transparent border-none text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
            type="text"
            placeholder="Поиск"
          />
        </div>
        <div className="self-center w-full h-[640px] flex flex-col justify-center items-center">
          <div className="w-[435px] h-[400px] rounded-[20px] bg-[#D9D9D9] mb-12"></div>
          <p className="mb-16">У Вас пока нет курсов, создайте первый</p>
          <button className="bg-[#D9D9D9] hover:bg-[#A9A9A9] py-2 px-20 rounded-[10px]">
            Создать курс
          </button>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 bg-[#D9D9D9] rounded-[20px] px-5 py-4">
        <div className="w-[50px] h-[50px] bg-white rounded-full"></div>
        <div className="flex flex-col">
          <p>Самат Белентбай</p>
          <p className="underline cursor-pointer">Ментор</p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
