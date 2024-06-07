import { Recipe } from "@/interfaces/recipe";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function RecipeCard ({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="md:w-full lg:max-w-[690px] xl:max-w-[750px] h-80
       md:h-[420px] xl:h-[500px] mt-4 bg-slate-900 text-green-600
       rounded-xl flex flex-col items-center text-center justify-center shadow-md 
       hover:bg-slate-800 hover:scale-105 transition-all duration-200">
        <CardHeader className="p-5 md:pb-10">
          <CardTitle className="text-xl xl:text-2xl">{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 md:h-60 xl:h-80 overflow-hidden">
            <img
              className="object-cover object-top w-full xl:w-[400px] h-48 md:h-60
               xl:h-80"
              src={recipe.image}
              alt="recipe thumbnail"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default RecipeCard;
