import React from 'react';

interface Car {
  plate: string;
  brand: string;
  model: string;
  color: string;
}

interface SubscriptionData {
  id: string;
  userName: string;
  category: string;
  active: boolean;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
}

interface Props {
  subscriptionData: SubscriptionData;
  onPlateMatch: (matches: boolean) => void;
  plateMatchStatus: 'pending' | 'match' | 'mismatch';
}

const SubscriptionDetails: React.FC<Props> = ({
  subscriptionData,
  onPlateMatch,
  plateMatchStatus
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscriber Verification</h2>
        <p className="text-gray-600">
          Verify the vehicle plate matches the subscription
        </p>
      </div>

      {/* Subscription Status */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Subscription Status</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            subscriptionData.active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {subscriptionData.active ? '✓ Active' : '✗ Inactive'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Subscriber:</span>
            <p className="font-semibold">{subscriptionData.userName}</p>
          </div>
          <div>
            <span className="text-gray-600">Category:</span>
            <p className="font-semibold">{subscriptionData.category}</p>
          </div>
          <div>
            <span className="text-gray-600">Valid From:</span>
            <p className="font-semibold">{formatDate(subscriptionData.startsAt)}</p>
          </div>
          <div>
            <span className="text-gray-600">Valid Until:</span>
            <p className="font-semibold">{formatDate(subscriptionData.expiresAt)}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Vehicles</h3>
        <div className="space-y-3">
          {subscriptionData.cars.map((car, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    car.color === 'red' ? 'bg-red-500' :
                    car.color === 'blue' ? 'bg-blue-500' :
                    car.color === 'green' ? 'bg-green-500' :
                    car.color === 'black' ? 'bg-black' :
                    car.color === 'white' ? 'bg-white border-gray-300' :
                    'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{car.plate}</p>
                    <p className="text-sm text-gray-600">{car.brand} {car.model}</p>
                    <p className="text-xs text-gray-500 capitalize">{car.color}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plate Verification */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Verification</h3>
        <p className="text-gray-700 mb-4">
          Please verify that the vehicle plate at the checkpoint matches one of the registered vehicles above.
        </p>
        
        {plateMatchStatus === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={() => onPlateMatch(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Plate Matches
            </button>
            <button
              onClick={() => onPlateMatch(false)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Plate Doesn't Match
            </button>
          </div>
        )}

        {plateMatchStatus === 'match' && (
          <div className="flex items-center text-green-800">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">✓ Vehicle plate verified - matches subscription</span>
          </div>
        )}

        {plateMatchStatus === 'mismatch' && (
          <div className="flex items-center text-red-800">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-semibold">⚠️ Vehicle plate does not match subscription</span>
          </div>
        )}
      </div>

      {!subscriptionData.active && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm font-medium">
            ⚠️ This subscription is inactive. The customer will be charged visitor rates.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
