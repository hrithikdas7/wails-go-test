import { Play, Pause } from "lucide-react";
import type { TaskListTypes } from "../types/taskList";

import useTaskList from "./useTaskList";

const TaskList = ({ tasks }: TaskListTypes) => {
  const { activeTask, startTimer, StopTimertask,getTaskClassName } = useTaskList();
  return (
    <div>
      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task?.id}
            className={getTaskClassName(task, activeTask)}
          >
            <div className="flex-1">
              <h3
                className={`font-medium mb-1 ${
                  task.status === "exceeded" || task.id === activeTask ? "text-white" : "text-gray-800"
                }`}
              >
                {task.name}
              </h3>
              <p
                className={`text-sm ${
                  task.status === "exceeded" || task.id === activeTask ? "text-red-200" : "text-gray-500"
                }`}
              >
                {task.description}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`text-sm font-mono ${
                  task.status === "exceeded" || task.id === activeTask ? "text-white" : "text-gray-600"
                }`}
              >
                {task.time}
              </div>
              {task.status === "exceeded" && (
                <div className="text-xs text-red-200 bg-red-900 px-2 py-1 rounded">
                  Time exceeded
                </div>
              )}
              {task.id === activeTask ? (
                <Pause
                  className={`h-4 w-4 cursor-pointer ${
                    task.status === "exceeded" || task.id === activeTask
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => StopTimertask()}
                />
              ) : (
                <Play
                  className={`h-4 w-4 cursor-pointer ${
                    task.status === "exceeded" || task.id === activeTask
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => startTimer(task.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
