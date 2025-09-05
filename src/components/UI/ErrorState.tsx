import React from 'react';

type Props = {
  error: Error;
  onRetry: () => void;
  retryText?: string;
};

const ErrorState: React.FC<Props> = ({ error, onRetry, retryText = "Back to Gates" }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Gate</h2>
        <p className="text-gray-600 mb-4">
          {error?.message || "Unable to load gate details"}
        </p>
        <button 
          onClick={onRetry} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {retryText}
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
