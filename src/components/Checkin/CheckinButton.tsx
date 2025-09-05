import React from 'react';

type Props = {
  onCheckin: () => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckinButton: React.FC<Props> = ({ onCheckin, disabled, isLoading }) => {
  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={onCheckin}
        disabled={disabled}
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <span className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </span>
        ) : (
          'Check In'
        )}
      </button>
    </div>
  );
};

export default CheckinButton;
