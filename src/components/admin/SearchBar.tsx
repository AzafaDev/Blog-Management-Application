import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Search className="text-black" size={20} />
      </div>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input w-full pl-14 h-16 rounded-3xl bg-white border-none shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-indigo-500 transition-all"
      />
    </div>
  );
};

export default SearchBar;
