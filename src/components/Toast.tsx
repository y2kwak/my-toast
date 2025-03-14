import { useEffect, useState } from "react";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface ToastProps {
  id: string;
  message: string;
  position: ToastPosition;
  duration: number;
  onClose: () => void;
}

export function Toast({
  id,
  message,
  position,
  duration,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timer | null>(
    null
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!visible || duration === 0) {
      return;
    }

    if (!isHovered) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 10);
      }, 10);
      setProgressInterval(interval);

      return () => clearInterval(interval);
    } else {
      // clear interval when hovered
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    }
  }, [isHovered, visible, duration]);

  useEffect(() => {
    if (duration === 0) {
      return;
    }

    // only set the close timer if not hovered
    if (!isHovered) {
      const remainingTime = duration - timeElapsed;

      const timer = setTimeout(() => {
        setVisible(false);
        if (progressInterval) {
          clearInterval(progressInterval);
        }
        setTimeout(() => {
          onClose();
        }, 300);
      }, remainingTime);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isHovered, timeElapsed, duration]);

  const handleClose = () => {
    setVisible(false);
    if (progressInterval) {
      clearInterval(progressInterval);
    }
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`pointer-events-auto max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-2 flex flex-col items-start z-50 border border-gray-200 dark:border-gray-700 transition-opacity duration-300 relative overflow-hidden ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full items-start">
        <div className="flex-1 mr-2">{message}</div>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none"
          aria-label="Close toast"
        >
          X
        </button>
      </div>

      {duration === 0 ? (
        <div></div>
      ) : (
        <div className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 transition-all ease-linear"
            style={{ width: `${((duration - timeElapsed) / duration) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
