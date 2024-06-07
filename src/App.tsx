import smile from "./assets/images/smile.png";
import SearchBar from "./components/SearchBar";
import RecipesCarousel from "./components/RecipesCarousel";

function App() {
  return (
    <>
      <div
        className="h-full flex flex-col items-center my-10 gap-20 md:pt-4
       md:gap-6 xl:gap-2"
      >
        <div className="xl:flex flex-row">
          <h1
            className="text-5xl md:text-8xl lg:text-9xl font-bold text-center
           text-slate-900 me-4 mb-2"
          >
            Happie
          </h1>
          <div className="relative">
            <img
              className="w-5/12 md:w-4/12 absolute -rotate-12"
              src={smile}
              alt="smile"
            />
            <p
              className="text-5xl md:text-8xl lg:text-9xl font-bold
             text-green-600 mt-5 lg:mt-0 ms-20 md:ms-28 lg:ms-36"
            >
              eggie
            </p>
          </div>
        </div>
        <SearchBar />
        <RecipesCarousel />
      </div>
    </>
  );
}

export default App;
