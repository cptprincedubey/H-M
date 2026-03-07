import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { AlertCircle, RotateCw } from "lucide-react";

const BackendStatus = () => {
  const [isOnline, setIsOnline] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isRetrying, setIsRetrying] = useState(false);

  const checkBackend = async () => {
    try {
      const res = await axiosInstance.get("/health");
      setIsOnline(res.status === 200);
    } catch (error) {
      console.error("Backend health check failed:", error.message);
      setIsOnline(false);
    } finally {
      setIsChecking(false);
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    await checkBackend();
  };

  if (isChecking) return null;

  if (!isOnline) {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-md">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-700 font-semibold">
                  Cannot Connect to Server
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Unable to reach backend. Please check your network connection or try again later.
                </p>
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="mt-2 flex items-center gap-1 text-xs font-medium text-red-700 hover:text-red-800 disabled:opacity-50"
                >
                  <RotateCw size={14} className={isRetrying ? "animate-spin" : ""} />
                  {isRetrying ? "Retrying..." : "Retry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BackendStatus;

