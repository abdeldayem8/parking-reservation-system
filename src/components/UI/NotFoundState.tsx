import React from 'react';

type Props = {
  onRetry: () => void;
};

const NotFoundState: React.FC<Props> = ({ onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gate Not Found</h2>
        <p className="text-gray-600 mb-4">The requested gate could not be found.</p>
        <button 
          onClick={onRetry} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Back to Gates
        </button>
      </div>
    </div>
  );
};

export default NotFoundState;
