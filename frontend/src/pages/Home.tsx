import { useState } from "react";
import Timer from "@/components/Timer/Timer";
import SearchBar from "@/components/SearchBar/SearchBar";
import ProjectList from "@/components/ProjectList/ProjectList";
import TaskList from "@/components/TaskList/TaskList";

const TimeTrackerApp = () => {
  const [currentTime, setCurrentTime] = useState("07:39:57");

  const projects = [
    { id: "1", name: "Ddale Website", time: "1:04", active: false },
    { id: "2", name: "Lulu Exchange app", time: "1:14", active: false },
    { id: "3", name: "Ddale Website", time: "0:15", active: false },
    { id: "4", name: "Joy alukkas loyalty app", time: "5:14", active: true },
    { id: "5", name: "Joy alukkas loyalty app", time: "0:00", active: false },
  ];

  const tasks = [
    {
      id: "1",
      name: "Account",
      description: "Streamline communication with...",
      time: "6:14 / 8:00",
      completed: false,
      status: "normal",
      active: false,
    },
    {
      id: "2",
      name: "Notification",
      description: "Streamline communication with...",
      time: "6:14 / 8:00",
      completed: false,
      status: "normal",
      active: false,
    },
    {
      id: "3",
      name: "Authentication",
      description: "Streamline communication with...",
      time: "8:00 / 8:00",
      completed: true,
      status: "exceeded",
      active: false,
    },
    {
      id: "4",
      name: "Profile",
      description: "Streamline communication with...",
      time: "9:14 / 8:00",
      completed: false,
      status: "normal",
      active: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-1 ">
        {/* Left Sidebar - Projects */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <Timer currentTime={currentTime} />

          {/* Search Projects */}
          <SearchBar placeholder="Projects" />

          {/* Projects List */}
          <ProjectList projects={projects} />
        </div>

        {/* Right Panel - Tasks */}
        <div className="flex-1 bg-white flex flex-col">
          {/* Search Tasks */}
          <div className="p-4 border-b border-gray-200">
            <SearchBar placeholder="Tasks" />
          </div>

          {/* Tasks List */}
          <TaskList tasks={tasks}/>
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerApp;
