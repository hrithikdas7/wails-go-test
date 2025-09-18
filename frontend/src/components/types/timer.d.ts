export type TimerData = {
  task: string;
  taskDuration: number;
  totalTime: number;
  stopped?: boolean;
};

export type TimerProps = {
  currentTime?: string;
};