import React from 'react';

interface BreakdownSegment {
  rateMode: 'normal' | 'special';
  hours: number;
  rate: number;
  amount: number;
}

interface CheckoutData {
  breakdown: BreakdownSegment[];
  durationHours: number;
  totalAmount: number;
  ticket: {
    id: string;
    gateId: string;
    zoneId: string;
    checkinAt: string;
    subscriptionId?: string;
  };
}

interface Props {
  checkoutData: CheckoutData;
  onConfirm: () => void;
  onConvertToVisitor: () => void;
  isLoading: boolean;
  isSubscriber: boolean;
}

const CheckoutDetails: React.FC<Props> = ({
  checkoutData,
  onConfirm,
  onConvertToVisitor,
  isLoading,
  isSubscriber
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDuration = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (wholeHours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${wholeHours} hour${wholeHours > 1 ? 's' : ''}`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Checkout Details</h2>
        <p className="text-gray-600">
          Review the parking charges and confirm checkout
        </p>
      </div>

      {/* Ticket Information */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Ticket Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Ticket ID:</span>
            <p className="font-mono font-semibold">{checkoutData.ticket.id}</p>
          </div>
          <div>
            <span className="text-gray-600">Gate:</span>
            <p className="font-semibold">{checkoutData.ticket.gateId}</p>
          </div>
          <div>
            <span className="text-gray-600">Zone:</span>
            <p className="font-semibold">{checkoutData.ticket.zoneId}</p>
          </div>
          <div>
            <span className="text-gray-600">Check-in Time:</span>
            <p className="font-semibold">{new Date(checkoutData.ticket.checkinAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Parking Duration</h3>
            <p className="text-gray-600">Total time parked</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{formatDuration(checkoutData.durationHours)}</p>
            <p className="text-sm text-gray-500">{checkoutData.durationHours.toFixed(2)} hours</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Rate Breakdown</h3>
        <div className="space-y-3">
          {checkoutData.breakdown.map((segment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  segment.rateMode === 'special' ? 'bg-orange-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{segment.rateMode} Rate</p>
                  <p className="text-sm text-gray-600">
                    {formatDuration(segment.hours)} @ {formatCurrency(segment.rate)}/hour
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(segment.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Total Amount</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(checkoutData.totalAmount)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Confirm Checkout
            </>
          )}
        </button>

        {isSubscriber && (
          <button
            onClick={onConvertToVisitor}
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Convert to Visitor Rate
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
