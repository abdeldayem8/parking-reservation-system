import React from 'react';
import { useAuthStore } from '../store/auth';
import { 
  TicketLookup, 
  CheckoutDetails, 
  SubscriptionDetails, 
  CheckoutConfirmation,
  useCheckpointPage
} from '../components/Checkpoint';

const Checkpoint: React.FC = () => {
  const {  logout } = useAuthStore();
  
  // Use the custom hook for all logic
  const {
    currentStep,
    checkoutData,
    subscriptionData,
    plateMatchStatus,
    error,
    isLoading,
    isSubscriber,
    handleTicketSubmit,
    handlePlateMatch,
    handleCheckoutConfirm,
    handleConvertToVisitor,
    handleNewCheckout,
  } = useCheckpointPage();

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Checkpoint System</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm font-medium">
              ⚠️ {error}
            </p>
          </div>
        )}

        {currentStep === 'lookup' && (
          <TicketLookup
            onTicketSubmit={handleTicketSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}

        {currentStep === 'subscription' && subscriptionData && (
          <SubscriptionDetails
            subscriptionData={subscriptionData}
            onPlateMatch={handlePlateMatch}
            plateMatchStatus={plateMatchStatus}
          />
        )}

        {currentStep === 'checkout' && checkoutData && (
          <CheckoutDetails
            checkoutData={checkoutData}
            onConfirm={handleCheckoutConfirm}
            onConvertToVisitor={handleConvertToVisitor}
            isLoading={isLoading}
            isSubscriber={!!isSubscriber}
          />
        )}

        {currentStep === 'confirmation' && (
          <CheckoutConfirmation
            onNewCheckout={handleNewCheckout}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Checkpoint;