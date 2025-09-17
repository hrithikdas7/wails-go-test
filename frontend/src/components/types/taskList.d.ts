export interface task {
  id: string;
  name: string;
  time: string;
  active: boolean;
  status:string;
  completed:boolean;
  description:string
}

export type TaskListTypes = {
  tasks: task[];
};