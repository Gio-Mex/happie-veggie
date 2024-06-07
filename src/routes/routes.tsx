import App from "@/App";
import NotFoundPage from "@/components/NotFoundPage";
import SearchResult from "@/pages/searchResults";
import RecipeDetails from "@/pages/recipeDetails";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/recipes",
    element: <SearchResult/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/recipes/:recipeID",
    element: <RecipeDetails/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "*",
   errorElement: <NotFoundPage/>,
  }

])

export default router