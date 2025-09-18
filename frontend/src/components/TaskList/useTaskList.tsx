import { useState } from "react";
import { StartTaskTimer, StopTimer } from "../../../wailsjs/go/main/App";

const useTaskList = () => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const startTimer = (taskId: string) => {
    setActiveTask(taskId);
    StartTaskTimer(taskId);
  };

  const StopTimertask = () => {
    setActiveTask("");
    StopTimer();
  };
  const getTaskClassName = (
    task: { id: string; status: string },
    activeTask: string | null
  ) => {
    if (task.status === "exceeded") {
      return "flex items-center p-4 border-b border-gray-100 bg-red-800 text-white";
    }

    if (task.id === activeTask  ) {
      return "flex items-center p-4 border-b border-gray-100 bg-blue-600";
    }

    return "flex items-center p-4 border-b border-gray-100 hover:bg-gray-50";
  };

  return {
    activeTask,
    startTimer,
    setActiveTask,
    StopTimertask,
    getTaskClassName
  };
};

export default useTaskList;
