import { Play } from "lucide-react";
import type { TaskListTypes } from "../types/taskList";

const TaskList = ({tasks} : TaskListTypes) => {
  return (
    <div>
      <div className="flex-1 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task?.id}
            className={`flex items-center p-4 border-b border-gray-100 ${
              task.status === "exceeded"
                ? "bg-red-800 text-white"
                : "hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              readOnly
            />
            <div className="flex-1">
              <h3
                className={`font-medium mb-1 ${
                  task.status === "exceeded" ? "text-white" : "text-gray-800"
                }`}
              >
                {task.name}
              </h3>
              <p
                className={`text-sm ${
                  task.status === "exceeded" ? "text-red-200" : "text-gray-500"
                }`}
              >
                {task.description}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`text-sm font-mono ${
                  task.status === "exceeded" ? "text-white" : "text-gray-600"
                }`}
              >
                {task.time}
              </div>
              {task.status === "exceeded" && (
                <div className="text-xs text-red-200 bg-red-900 px-2 py-1 rounded">
                  Time exceeded
                </div>
              )}
              <Play
                className={`h-4 w-4 cursor-pointer ${
                  task.status === "exceeded"
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
