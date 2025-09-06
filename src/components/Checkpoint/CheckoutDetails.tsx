import React from 'react';

interface BreakdownSegment {
  from: string;
  to: string;
  hours: number;
  rateMode: 'normal' | 'special';
  rate: number;
  amount: number;
}

interface ZoneState {
  id: string;
  name: string;
  categoryId: string;
  gateIds: string[];
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  open: boolean;
}

interface CheckoutData {
  ticketId: string;
  checkinAt: string;
  checkoutAt: string;
  durationHours: number;
  breakdown: BreakdownSegment[];
  amount: number;
  zoneState: ZoneState;
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
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

      {/* Grid Layout for Ticket Info and Zone Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Ticket Information Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 text-sm">Ticket ID:</span>
              <p className="font-mono font-semibold text-gray-900">{checkoutData.ticketId}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Check-in Time:</span>
              <p className="font-semibold text-gray-900">{new Date(checkoutData.checkinAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Checkout Time:</span>
              <p className="font-semibold text-gray-900">{new Date(checkoutData.checkoutAt).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Duration:</span>
              <p className="font-semibold text-blue-600">{formatDuration(checkoutData.durationHours)}</p>
            </div>
          </div>
        </div>

        {/* Zone Information Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Zone Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 text-sm">Zone Name:</span>
              <p className="font-semibold text-gray-900">{checkoutData.zoneState.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600 text-sm">Total Slots:</span>
                <p className="font-semibold text-gray-900">{checkoutData.zoneState.totalSlots}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Occupied:</span>
                <p className="font-semibold text-red-600">{checkoutData.zoneState.occupied}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Free:</span>
                <p className="font-semibold text-green-600">{checkoutData.zoneState.free}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Reserved:</span>
                <p className="font-semibold text-yellow-600">{checkoutData.zoneState.reserved}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {checkoutData.breakdown.map((segment, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(segment.from).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(segment.to).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {segment.hours.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      segment.rateMode === 'special' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {segment.rateMode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(segment.rate)}/hr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(segment.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Amount - Highlighted */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Total Amount</h3>
          <p className="text-4xl font-bold text-green-600">{formatCurrency(checkoutData.amount)}</p>
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
