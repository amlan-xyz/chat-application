import { VscSearch } from "react-icons/vsc";
import "./SearchBar.css";
export const SearchBar = () => {
  return (
    <div className="searchbar">
      <VscSearch className="search__icon" />
      <input type="search" name="search" placeholder="search by username" />
    </div>
  );
};
