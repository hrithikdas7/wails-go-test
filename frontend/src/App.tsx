import { useEffect, useState } from "react";
import { Greet, StartTimer } from "../wailsjs/go/main/App";
import { EventsOn } from "../wailsjs/runtime/runtime";


function App() {
  const [time, setTime] = useState("Not started");

  useEffect(() => {
    // Listen for backend timer updates
    EventsOn("timer_tick", (data: string) => {
      setTime(data);
    });
  }, []);
  return (
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold">Timer</h1>
        <p>{time}</p>
        <button
          onClick={StartTimer}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default App;
