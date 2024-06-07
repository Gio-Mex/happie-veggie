import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { Step } from "@/interfaces/analyzedInstructions";
import { Ingredient, ExtendedIngredient } from "@/interfaces/ingredient";
import { EquipmentItem } from "@/interfaces/equipment";
import placeholderImg from "../assets/images/placeholder.jpg";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { getData } from "@/redux/recipeDetailsSlice";
import TurnBackButton from "@/components/TurnBackButton";
import { RecipeDetailsInterface } from "@/interfaces/recipe";

const RecipeDetails = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const state = useAppSelector((state) => state.recipe);
  const dispatch = useAppDispatch();
  const [recipe, setRecipe] = useState<RecipeDetailsInterface | undefined>();

  // Retrieve recipe
  useEffect(() => {
    dispatch(
      getData(`/${recipeID}/information?apiKey=${import.meta.env.VITE_API_KEY}`)
    ).then((response) => setRecipe(response.payload));
  }, []);

  // State handlers
  if (state.loading) {
    return (
      <div
        className="text-green-600 flex justify-center items-center h-screen
       text-3xl"
      >
        Loading...
      </div>
    );
  } else if (state.error) {
    return (
      <div
        className="flex flex-col justify-center items-center text-center
       h-screen gap-5"
      >
        <p className="text-2xl">Oops! Something went wrong.</p>
        <p className="text-green-600">Error: {state.error}</p>
        <TurnBackButton />
      </div>
    );
  }

  // Spoonacular API provide no ingredients images directly,
  // so we need to retrieve them from the analyzed instructions (from steps),
  // and avoid duplicates. 
  const getIngredients = () => {
    const uniqueIngredients: Ingredient[] = [];
    recipe?.analyzedInstructions[0].steps.forEach((step: Step) => {
      step.ingredients.forEach((ingredient: Ingredient) => {
        if (
          !uniqueIngredients.some(
            (uniqueIngredient: Ingredient) =>
              uniqueIngredient.image === ingredient.image
          )
        ) {
          uniqueIngredients.push(ingredient);
        }
      });
    });
    return uniqueIngredients;
  };

  // Similar process for equipment
  const getEquipment = () => {
    const uniqueEquipment: EquipmentItem[] = [];
    recipe?.analyzedInstructions[0].steps.forEach((step: Step) => {
      step.equipment.forEach((item: EquipmentItem) => {
        if (
          !uniqueEquipment.some(
            (uniqueItem: EquipmentItem) => uniqueItem.id === item.id
          )
        ) {
          uniqueEquipment.push(item);
        }
      });
    });
    return uniqueEquipment;
  };

  // No search results handler
  if (
    !recipe ||
    recipe?.analyzedInstructions.length === 0 ||
    recipe?.analyzedInstructions[0].steps.length === 0
  ) {
    return (
      <div
        className="w-screen h-screen flex flex-col items-center justify-center
       gap-10"
      >
        <p className="text-3xl text-center">
          Sorry, <br /> recipe not available 😔
        </p>
        <TurnBackButton />
      </div>
    );
  }

  // Recipe details body
  return (
    <>
      <div className="container flex flex-col items-center gap-5 mt-10">
        <div
          className="w-full flex flex-col justify-around
         content-between"
        >
          <div className="w-full h-96 md:h-[70vh] mb-10 relative">
            <div
              className="h-full text-4xl font-bold text-center text-white
             flex flex-col justify-center gap-10 absolute z-10 top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2"
            >
              <h1>{recipe?.title}</h1>
              <p className="text-lg font-normal text-slate-300">
                {recipe?.readyInMinutes} minutes
              </p>
            </div>

            <img
              src={recipe?.image}
              alt={recipe?.title}
              className="w-full h-96 md:h-[70vh] brightness-50 object-cover
               object-center"
            />
          </div>
          <h2 className="text-2xl font-bold mb-10 mx-auto">Details</h2>

          <Separator className="w-1/2 mx-auto bg-green-600" />

          {/* Ingredients */}
          <div className="flex flex-wrap p-5">
            <h3 className="text-xl font-bold mx-auto mb-3">
              Ingredients for {recipe?.servings} serving(s)
            </h3>

            <ul className="flex flex-wrap justify-center gap-10">
              {recipe?.extendedIngredients.map(
                (ingredient: ExtendedIngredient, index: number) => {
                  const foundItem = getIngredients().find(
                    (item: Ingredient) => item.id === ingredient.id
                  );
                  return (
                    <li
                      className="md:w-3/12 text-lg text-center my-1 flex
                       flex-col items-center"
                      key={index}
                    >
                      {foundItem && foundItem.image ? (
                        <img
                          src={foundItem.image}
                          alt={foundItem.name}
                          className="mb-2"
                        />
                      ) : (
                        <div className="w-24 h-24 mb-2 relative">
                          <img
                            src={placeholderImg}
                            className="w-24 h-24 object-cover brightness-50"
                          />
                          <span
                            className="text-xs text-white text-center 
                          absolute top-1/2 left-1/2 -translate-x-1/2
                           -translate-y-1/2"
                          >
                            No image available
                          </span>
                        </div>
                      )}

                      {ingredient.original}
                      {ingredient.measures.metric.amount ===
                      ingredient.measures.us.amount
                        ? ""
                        : `(${ingredient.measures.metric.amount}
                         ${ingredient.measures.metric.unitShort})`}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>

        <Separator className="w-1/2 mx-auto bg-green-600" />

        {/* Equipment */}
        <h3 className="text-xl font-bold">Equipment</h3>

        <ul className="flex flex-wrap justify-center gap-10">
          {getEquipment().map((equipment: EquipmentItem, index: number) => {
            return (
              <li
                className="md:w-3/12 text-lg text-center my-5 flex flex-col
                 items-center justify-end"
                key={index}
              >
                {equipment.image ? (
                  <img
                    src={equipment.image}
                    alt={equipment.name}
                    className="mb-2"
                  />
                ) : (
                  <div className="w-24 h-24 mb-2 relative">
                    <img
                      src={placeholderImg}
                      className="w-24 h-24 object-cover brightness-50"
                    />
                    <span
                      className="text-xs text-white text-center absolute
                     top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      No image available
                    </span>
                  </div>
                )}
                {equipment.name}
              </li>
            );
          })}
        </ul>

        <Separator className="w-1/2 mx-auto bg-green-600" />

        {/* Instructions */}
        <h3 className="text-xl font-bold ">Instructions</h3>

        <div className="w-8/12 flex flex-col">
          {recipe?.analyzedInstructions[0].steps.map((step: Step) => {
            return (
              <div
                className="flex flex-col md:flex-row gap-2 my-5 text-center
                 md:text-left"
                key={step.number}
              >
                <h4 className="md:w-1/12 text-lg font-bold text-green-500">
                  Step {step.number}
                </h4>
                <p className="md:w-11/12">{step.step}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center my-10">
        <TurnBackButton />
      </div>
    </>
  );
};

export default RecipeDetails;
