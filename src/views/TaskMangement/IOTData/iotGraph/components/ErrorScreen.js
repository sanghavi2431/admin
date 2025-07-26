import { Button } from "@/components/ui";
import React from "react";

const ErrorScreen = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 mt-4">
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-[#00C3DE] mt-4">Oops! Something went wrong</h2>
        <p className="text-gray-500 mt-2 text-lg">
          {message || "We encountered an issue while loading data. Please try again later."}
        </p>
        <Button
          className="text-black mt-6"
          variant="solid"
          onClick={onRetry}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorScreen;
