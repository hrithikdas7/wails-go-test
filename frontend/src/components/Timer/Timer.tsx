import {EventsOn, EventsOff} from "../../../wailsjs/runtime/runtime"
import { useEffect, useState } from "react";
import type { TimerData } from "../types/timer";
import { formatElapsedTime } from "@/helpers/formatConversions";

const Timer = () => {
  const [timerData, setTimerData] = useState<TimerData>({
    task: "",
    taskDuration: 0,
    totalTime: 0,
  });



  useEffect(() => {
    // Listen for backend timer updates
    EventsOn("timer_tick", (data: TimerData) => {
      setTimerData(data);
    });

    // Cleanup function to remove event listener
    return () => {
      EventsOff("timer_tick");
    };
  }, []);

  return (
    <div className="p-8 text-center border-b border-gray-200">
      <div className="mb-4">
        <h1 className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
          {formatElapsedTime(timerData.taskDuration)}
        </h1>
        {timerData.task && (
          <p className="text-lg text-gray-600 mt-2">
            Current Task: <span className="font-semibold">{timerData.task}</span>
          </p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          Total Time: {formatElapsedTime(timerData.totalTime)}
        </p>
      </div>
    </div>
  );
};

export default Timer;
