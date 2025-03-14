import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Toast } from "./Toast";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastType = {
  id: string;
  message: string;
  position: ToastPosition;
  duration: number;
};

type ToastContextType = {
  toasts: ToastType[];
  showToast: (
    message: string,
    position: ToastPosition,
    duration?: number
  ) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [groupedToasts, setGroupedToasts] = useState<
    Record<ToastPosition, ToastType[]>
  >({
    "top-left": [],
    "top-center": [],
    "top-right": [],
    "bottom-left": [],
    "bottom-center": [],
    "bottom-right": [],
  });

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (message: string, position: ToastPosition, duration = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, position, duration },
      ]);
    },
    []
  );

  // Group toasts by position
  useEffect(() => {
    const temp = toasts.reduce<Record<ToastPosition, ToastType[]>>(
      (groups, toast) => {
        if (!groups[toast.position]) {
          groups[toast.position] = [];
        }
        groups[toast.position].push(toast);
        return groups;
      },
      {
        "top-left": [],
        "top-center": [],
        "top-right": [],
        "bottom-left": [],
        "bottom-center": [],
        "bottom-right": [],
      }
    );
    setGroupedToasts(temp);
  }, [toasts, removeToast]);

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, removeToast, removeAllToasts }}
    >
      {children}

      {/* Top Left */}
      <div className="fixed top-0 left-0 p-4 flex flex-col items-start pointer-events-none">
        {groupedToasts["top-left"].map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            position={toast.position}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Top Center */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 p-4 flex flex-col items-center pointer-events-none">
        {groupedToasts["top-center"].map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            position={toast.position}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Top Right */}
      <div className="fixed top-0 right-0 p-4 flex flex-col items-end pointer-events-none">
        {groupedToasts["top-right"].map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            position={toast.position}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Bottom Left */}
      <div className="fixed bottom-0 left-0 p-4 flex flex-col-reverse items-start pointer-events-none">
        {groupedToasts["bottom-left"].map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            position={toast.position}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Bottom Center */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 flex flex-col-reverse items-center pointer-events-none">
        {groupedToasts["bottom-center"].map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            position={toast.position}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Bottom Right */}
      <div className="fixed bottom-0 right-0 p-4 flex flex-col-reverse items-end pointer-events-none">
        {groupedToasts["bottom-right"].map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            position={toast.position}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
