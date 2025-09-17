import type { TimerProps } from "../types/timer";


const Timer = ({currentTime} : TimerProps) => {
  return (
    <div className="p-8 text-center border-b border-gray-200">
      <h1 className="text-4xl font-mono font-bold text-gray-800 tracking-wider">
        {currentTime}
      </h1>
    </div>
  );
};

export default Timer;
