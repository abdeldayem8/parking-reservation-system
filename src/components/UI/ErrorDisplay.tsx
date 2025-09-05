import React from 'react';

type Props = {
  error: Error | null;
};

const ErrorDisplay: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-800">
        Check-in failed: {error.message}
      </p>
    </div>
  );
};

export default ErrorDisplay;
