import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getData } from "@/redux/recipesSlice";
import { useAppDispatch } from "@/redux/store";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;
const searchUrl = `/complexSearch?apiKey=${apiKey}&number=100&diet=vegetarian`;

function SearchBar() {
  const [filterInput, setFilterInput] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = async () => {
    try {
      let endpoint = "";
      endpoint = `${searchUrl}&query=${filterInput}`;
      const response = await dispatch(getData(endpoint));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 flex flex-row justify-center items-center md:mt-16">
      <Input
        className="w-80 md:w-96 lg:w-1/2 md:h-14 md:text-lg bg-slate-900
         text-green-600 rounded-s-xl ps-5"
        type="text"
        placeholder="Search for something..."
        onChange={(e) => {
          e.preventDefault();
          setFilterInput(e.target.value);
        }}
      />
      <Link to="/recipes" onClick={() => handleSearch()}>
        <Button
          className="w-16 md:h-14 bg-slate-900 text-green-600 hover:bg-slate-800
          hover:text-green-500 active:bg-slate-950 rounded-e-xl border-s-0"
          variant="outline"
        >
          <span className="material-symbols-outlined">search</span>
        </Button>
      </Link>
    </div>
  );
}

export default SearchBar;
