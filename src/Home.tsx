import { useState } from "react";
import { useToast } from "./hooks/useToast";

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export default function Home() {
  const { showToast, removeAllToasts } = useToast();
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [duration, setDuration] = useState<number>(3000);
  const [message, setMessage] = useState<string>(
    "This is a toast notification!"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const showToastMessage = () => {
    if (message.trim() === "") {
      setErrorMessage("Please enter a message");
      return;
    }
    setErrorMessage("");
    showToast(message, position, duration);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Toast Demo</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Toast Message <span className="text-red-500">*</span>
            </label>
            <input
              id="message"
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (e.target.value.trim() !== "") {
                  setErrorMessage("");
                }
              }}
              required
              className={`w-full p-2 border rounded-md ${
                errorMessage ? "border-red-500" : ""
              }`}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="position"
                  value="top-left"
                  checked={position === "top-left"}
                  onChange={() => setPosition("top-left")}
                  className="mr-2"
                />
                Top Left
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="position"
                  value="top-center"
                  checked={position === "top-center"}
                  onChange={() => setPosition("top-center")}
                  className="mr-2"
                />
                Top Center
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="position"
                  value="top-right"
                  checked={position === "top-right"}
                  onChange={() => setPosition("top-right")}
                  className="mr-2"
                />
                Top Right
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="position"
                  value="bottom-left"
                  checked={position === "bottom-left"}
                  onChange={() => setPosition("bottom-left")}
                  className="mr-2"
                />
                Bottom Left
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="position"
                  value="bottom-center"
                  checked={position === "bottom-center"}
                  onChange={() => setPosition("bottom-center")}
                  className="mr-2"
                />
                Bottom Center
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="position"
                  value="bottom-right"
                  checked={position === "bottom-right"}
                  onChange={() => setPosition("bottom-right")}
                  className="mr-2"
                />
                Bottom Right
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium mb-1"
            >
              Duration (ms)
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={0}
              step={500}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            onClick={showToastMessage}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Show Toast
          </button>
          <button
            onClick={() => removeAllToasts()}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </main>
  );
}
