import type { ProjectListTypes } from "../types/projectList"

const ProjectList = ({projects} : ProjectListTypes) => {
  return (
    <div className="flex-1 overflow-y-auto">
            {projects.map((project) => (
              <div
                key={project?.id}
                className={`flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  project.active
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                }`}
              >
                <div className="flex-1">
                  <h3
                    className={`font-medium ${
                      project.active ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {project.name}
                  </h3>
                </div>
                <div
                  className={`text-sm font-mono ${
                    project.active ? "text-white" : "text-gray-500"
                  }`}
                >
                  {project.time}
                </div>
              </div>
            ))}
          </div>
  )
}

export default ProjectList