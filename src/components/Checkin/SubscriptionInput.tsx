import React from 'react';

type Props = {
  subscriptionId: string;
  onSubscriptionIdChange: (value: string) => void;
  onVerify: () => void;
  subscriptionData: any;
  subscriptionError: string;
};

const SubscriptionInput: React.FC<Props> = ({
  subscriptionId,
  onSubscriptionIdChange,
  onVerify,
  subscriptionData,
  subscriptionError
}) => {
  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <input 
          value={subscriptionId} 
          onChange={(e) => onSubscriptionIdChange(e.target.value)} 
          placeholder="Enter Subscription ID" 
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={onVerify}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
        >
          Verify
        </button>
      </div>
      
      {subscriptionError && (
        <p className="text-red-600 text-sm mt-2">{subscriptionError}</p>
      )}
      
      {subscriptionData && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            ✓ Subscription verified for {subscriptionData.userName}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionInput;
