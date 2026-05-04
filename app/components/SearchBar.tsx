"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const currentPath = usePathname();
  const params = useSearchParams();

  const search = params.get("search");

  if (currentPath === "/")
    return (
      <form className="form-text-input search-bar">
        <input
          type="text"
          id="search"
          name="search"
          defaultValue={search || ""}
          placeholder="Iščite po naslovu, avtorju, ali letu izdaje"
          required
          className="outline-none w-full"
        />

        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    );

  return;
};
export default SearchBar;
