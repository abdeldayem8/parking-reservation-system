
import React from 'react'

type Props = {
  open: boolean;
  onClose: () => void;
  ticket?: {
    id: string;
    gateId: string;
    zoneId: string;
    checkinAt: string;
    subscriptionId?: string;
  } | null;
  subscriptionData?: any;
}

const TicketModal: React.FC<Props> = ({ open, onClose, ticket, subscriptionData }) => {
  if (!open || !ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Parking Ticket</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ticket Content */}
          <div className="p-6">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="text-4xl mb-2">🎫</div>
                <h4 className="text-lg font-semibold text-gray-900">Parking Reservation</h4>
              </div>
              
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket ID:</span>
                  <span className="font-mono font-bold text-blue-600">{ticket.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gate:</span>
                  <span className="font-semibold">{ticket.gateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zone:</span>
                  <span className="font-semibold">{ticket.zoneId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in Time:</span>
                  <span className="font-semibold">{new Date(ticket.checkinAt).toLocaleString()}</span>
                </div>
                
                {/* Subscriber Information */}
                {ticket.subscriptionId && subscriptionData && (
                  <>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Subscriber Details</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-semibold">{subscriptionData.userName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subscription ID:</span>
                          <span className="font-mono text-sm">{ticket.subscriptionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-semibold">{subscriptionData.category}</span>
                        </div>
                        {subscriptionData.cars && subscriptionData.cars.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vehicle:</span>
                            <span className="font-semibold">{subscriptionData.cars[0].plate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">
                  ✓ Please keep this ticket for checkout
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Ticket
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketModal
