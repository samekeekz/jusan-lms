export const UserBadge = () => {
  return (
    <div className="flex shrink-0 items-center gap-3 bg-[#D9D9D9] rounded-[20px] px-5 py-4">
      <div className="w-[50px] h-[50px] bg-white rounded-full"></div>
      <div className="flex flex-col">
        <p>Самат Белентбай</p>
        <p className="underline cursor-pointer">Ментор</p>
      </div>
    </div>
  );
};
