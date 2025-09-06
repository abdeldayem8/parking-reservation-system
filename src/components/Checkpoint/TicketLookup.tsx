import React, { useState } from 'react';

interface Props {
  onTicketSubmit: (ticketId: string) => void;
  isLoading: boolean;
  error?: string;
}

const TicketLookup: React.FC<Props> = ({ onTicketSubmit, isLoading, error }) => {
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketId.trim()) {
      onTicketSubmit(ticketId.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
          <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Checkout</h2>
        <p className="text-gray-600">
          Enter or scan the ticket ID to process checkout
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700 mb-2">
            Ticket ID
          </label>
          <input
            type="text"
            id="ticketId"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            placeholder="Enter ticket ID (e.g., ticket_001)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            disabled={isLoading}
            autoFocus
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm font-medium">
              ⚠️ {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !ticketId.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Process Checkout
            </>
          )}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Tip: You can paste ticket IDs directly into the input field
        </p>
      </div>
    </div>
  );
};

export default TicketLookup;
