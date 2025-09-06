import React from 'react';

type Props = {
  subscriptionId: string;
  onSubscriptionIdChange: (value: string) => void;
  onVerify: () => void;
  subscriptionData: any;
  subscriptionError: string;
  isLoading?: boolean;
};

const SubscriptionInput: React.FC<Props> = ({
  subscriptionId,
  onSubscriptionIdChange,
  onVerify,
  subscriptionData,
  subscriptionError,
  isLoading = false
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <input 
          value={subscriptionId} 
          onChange={(e) => onSubscriptionIdChange(e.target.value)} 
          placeholder="Enter Subscription ID" 
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button 
          onClick={onVerify}
          disabled={isLoading || !subscriptionId.trim()}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Verifying...
            </>
          ) : (
            'Verify'
          )}
        </button>
      </div>
      
      {subscriptionError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium">
            ⚠️ {subscriptionError}
          </p>
        </div>
      )}
      
      {subscriptionData && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Subscription Details</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                subscriptionData.active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {subscriptionData.active ? '✓ Active' : '✗ Inactive'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Subscriber Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Subscriber Information</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">{subscriptionData.userName}</p>
                <p className="text-sm text-gray-600">Category: {subscriptionData.category}</p>
              </div>
            </div>

            {/* Car Details */}
            {subscriptionData.cars && subscriptionData.cars.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Registered Vehicles</h4>
                <div className="space-y-2">
                  {subscriptionData.cars.map((car: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{car.plate}</p>
                          <p className="text-sm text-gray-600">{car.brand} {car.model}</p>
                        </div>
                        <div className="text-right">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            car.color === 'red' ? 'bg-red-500' :
                            car.color === 'blue' ? 'bg-blue-500' :
                            car.color === 'green' ? 'bg-green-500' :
                            car.color === 'black' ? 'bg-black' :
                            car.color === 'white' ? 'bg-white border-gray-300' :
                            'bg-gray-400'
                          }`}></div>
                          <p className="text-xs text-gray-500 mt-1 capitalize">{car.color}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Validity Period */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Validity Period</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-600">Starts:</p>
                    <p className="font-medium">{formatDate(subscriptionData.startsAt)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">→</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expires:</p>
                    <p className="font-medium">{formatDate(subscriptionData.expiresAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Warning */}
            {!subscriptionData.active && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm font-medium">
                  ⚠️ This subscription is inactive and cannot be used for check-in.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionInput;
