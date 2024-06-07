import { Button } from "./ui/button";

function ErrorComponent() {
  return (
    <div className="w-8/12 mx-auto text-center flex flex-col justify-center
    items-center h-screen gap-5">
      <p className="text-3xl">
        Oops! Something went wrong 🫣 please try leater...
      </p>
      <p className="text-lg text-green-600">
        Note: This app uses Spoonicular's APIs, which offers limited free daily
        usage. If you are stucked here, probably you have exceeded the daily
        limit. Please come back tomorrow, thank you 👋
      </p>
      <Button onClick={() => window.location.reload()}
        className="bg-slate-900 text-green-500 hover:bg-slate-800
     hover:text-green-400 active:bg-slate-950 rounded px-10"
      >
        Refresh
      </Button>
      </div>
  );
}

export default ErrorComponent;
