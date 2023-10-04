import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";

export const Search = ({ searchFunction, linkName }: any) => {
  const [suggestions, setSuggestions] = useState(true);
  const [results, setResults] = useState([]);
  const onSearch = async (e: any) => {
    if (!e.target.value) {
      setResults([]);
      return;
    }
    const response = await searchFunction(e.target.value);
    setResults(response?.data);
    setSuggestions(true);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setSuggestions(false)}>
      <div className="row my-4 my-md-0">
        <div className="col-12">
          <div className="searchBox position-relative">
            <input type="text" onChange={onSearch} />
            <button>
              <MdOutlineSearch />
            </button>
            {suggestions && (
              <div className="suggestions rounded">
                {results?.map((item: any) => (
                  <Link
                    key={item.post_id}
                    href={`/${linkName}/` + item.post_id}>
                    <p className="px-2 suggestionsList" key={item.title}>
                      {item.title}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};
