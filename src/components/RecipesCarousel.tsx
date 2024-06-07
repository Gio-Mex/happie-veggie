import { Recipe } from "@/interfaces/recipe";
import { getData } from "@/redux/recipesSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import RecipeCard from "./RecipeCard";
import TurnBackButton from "./TurnBackButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const apiKey = import.meta.env.VITE_API_KEY;

function RecipesCarousel() {
  const recipes = useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getData(`/random?apiKey=${apiKey}&number=10&include-tags=vegetarian`)
    );
  }, []);

  // State handlers
  if (recipes.loading) {
    return (
      <div
        className="text-green-600 flex justify-center items-center h-96
       text-3xl"
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
      <div className="flex flex-col justify-center items-center text-center
       mt-10">
        <p className="text-2xl text-green-600">
          Sorry, your search returned no results...
        </p>
      </div>
    );
  }

  // Carousel body
  return (
    <div className="h-[360px] md:h-[450px] xl:h-[550px] w-11/12 md:w-10/12
     xl:w-[820px] md:px-4 md:mt-16">
      <Carousel
        opts={{
          align: window.innerWidth < 768 ? "start" : "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        orientation={window.innerWidth < 768 ? "vertical" : "horizontal"}
        className="h-full w-full mx-auto my-auto"
      >
        <CarouselContent
          className="w-[95%] lg:w-10/12 xl:w-[740px] h-[360px] md:h-[450px]
         xl:h-[550px] gap-3 md:gap-5 lg:gap-80 mx-auto my-auto"
        >
          {recipes.data.map(
            (recipe: Recipe) => (
              console.log(recipe),
              (
                <CarouselItem key={recipe.id} className="p-0 mx-auto">
                  <RecipeCard recipe={recipe} />
                </CarouselItem>
              )
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default RecipesCarousel;
