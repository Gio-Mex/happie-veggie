import { Button } from "./ui/button";

function TurnBackButton() {

  return (
      <Button
        className="bg-slate-900 text-green-500 hover:bg-slate-800
     hover:text-green-400 active:bg-slate-950 rounded px-10"
     onClick={() => window.history.back()}
      >
        Back
      </Button>
  );
}

export default TurnBackButton;
