import { Recipe } from "@/interfaces/recipe";
import { useAppSelector } from "@/redux/store";
import RecipeCard from "../components/RecipeCard";
import TurnBackButton from "../components/TurnBackButton";

import { useEffect, useState } from "react";
import Paginator from "@/components/Paginator";

function SearchResults() {
  const recipes = useAppSelector((state) => state.recipes);
  const [gallery, setGallery] = useState<Recipe[]>([]);
  const [firstItem, setFirstItem] = useState(0);
  const [lastItem, setLastItem] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize current page
  useEffect(() => {
    setCurrentPage(Number(
      new URLSearchParams(window.location.search).get("page")
    ));
    if (currentPage) {
      setFirstItem((currentPage - 1) * 12);
      setLastItem(currentPage * 12);
    }
  }, []);

  // Set gallery
  useEffect(() => {
    if (recipes.data) {
      setGallery(recipes.data);
    }
  }, [recipes.data]);

  // State handlers
  if (recipes.loading) {
    return (
      <div
        className="text-green-600 flex justify-center items-center 
      h-screen text-3xl"
      >
        Loading...
      </div>
    );
  } else if (recipes.error) {
    return (
      <div
        className="flex flex-col justify-center items-center text-center
       h-screen gap-5"
      >
        <p className="text-2xl">Oops! Something went wrong.</p>
        <p className="text-green-600">Error: {recipes.error}</p>
        <TurnBackButton />
      </div>
    );
  } else if (recipes.data.length === 0) {
    return (
      <div
        className="h-96 flex flex-col justify-center items-center text-center
         gap-10"
      >
        <p className="text-2xl text-green-600">
          Sorry, your search returned no results...
        </p>
        <TurnBackButton />
      </div>
    );
  }

  const handlePageChange = (firstItem: number) => {
    setFirstItem(firstItem);
    setLastItem(firstItem + 12);
    setCurrentPage(firstItem / 12 + 1);
  };

  // Gallery body
  return (
    <>
      <div>
        <h1 className="text-3xl md:text-5xl xl:text-7xl text-center text-green-600 mt-10 lg:mt-14">
          Your recipes
        </h1>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2
         xl:grid-cols-3 gap-10 p-10 pt-5"
        >
          {gallery
            .map(
              (recipe: Recipe) => (
                (
                  <div key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                  </div>
                )
              )
            )
            .slice(firstItem, lastItem)}
        </div>
      </div>

      <div>
        <Paginator
          firstItem={firstItem}
          lastItem={lastItem}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>

      <div className="flex justify-center my-5 ">
        <TurnBackButton />
      </div>
    </>
  );
}

export default SearchResults;
