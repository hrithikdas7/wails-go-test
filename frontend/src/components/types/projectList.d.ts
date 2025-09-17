export interface Project {
  id: string;
  name: string;
  time: string;
  active: boolean;
}

export type ProjectListTypes = {
  projects: Project[];
};