import IconSearch from "@/assets/search.svg";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-[778px] w-full flex items-center gap-3 bg-[#D9D9D9] rounded-[10px] px-4 py-[7px]">
      <div className="">
        <img className="w-full h-full" src={IconSearch} alt="icon-search" />
      </div>
      <input
        className="bg-transparent border-none text-black text-lg leading-5 font-medium w-full placeholder:text-lg placeholder:leading-5 placeholder:text-black placeholder:font-medium"
        type="text"
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
