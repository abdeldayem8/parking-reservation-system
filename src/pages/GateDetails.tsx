import { useGateDetailsPage } from "../components/Hooks";
import GateHeader from "../components/Gate/GateHeader";
import ZoneCard from "../components/Gate/ZoneCard";
import TicketModal from "../components/Checkin/TicketModal";
import CheckinTabs from "../components/Checkin/CheckinTabs";
import SubscriptionInput from "../components/Checkin/SubscriptionInput";
import CheckinButton from "../components/Checkin/CheckinButton";
import ErrorDisplay from "../components/UI/ErrorDisplay";
import LoadingState from "../components/UI/LoadingState";
import ErrorState from "../components/UI/ErrorState";
import NotFoundState from "../components/UI/NotFoundState";

const GateDetails = () => {
  const {
    // Data
    gate,
    zoneList,
    ticket,
    ticketOpen,
    currentTime,
    wsStatus,
    
    // State
    tab,
    selectedZoneId,
    subscriptionId,
    subscriptionData,
    subscriptionError,
    isVerifyingSubscription,
    
    // Loading & Error states
    isLoading,
    error,
    checkinError,
    isCheckinLoading,
    
    // Actions
    setTab,
    setSelectedZoneId,
    setSubscriptionId,
    verifySubscription,
    handleCheckin,
    setTicketOpen,
    navigate,
    
    // Computed
    canSelect,
    isCheckinDisabled,
  } = useGateDetailsPage();

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={() => navigate('/')} />;
  }

  // Gate not found
  if (!gate) {
    return <NotFoundState onRetry={() => navigate('/')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GateHeader 
          title={`${gate.name} (${gate.id})`} 
          wsStatus={wsStatus} 
          now={currentTime} 
        />

        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <CheckinTabs tab={tab} onTabChange={setTab} />

          {tab === 'subscriber' && (
            <SubscriptionInput
              subscriptionId={subscriptionId}
              onSubscriptionIdChange={setSubscriptionId}
              onVerify={verifySubscription}
              subscriptionData={subscriptionData}
              subscriptionError={subscriptionError}
              isLoading={isVerifyingSubscription}
            />
          )}

          {/* Zones Grid */}
          {zoneList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No zones available for this gate.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {zoneList.map((zone: any) => (
                <ZoneCard 
                  key={zone.id} 
                  zone={zone} 
                  disabled={!canSelect(zone)} 
                  selected={selectedZoneId === zone.id} 
                  onSelect={setSelectedZoneId}
                  isVisitor={tab === 'visitor'}
                  subscriptionData={subscriptionData}
                />
              ))}
            </div>
          )}

          <CheckinButton
            onCheckin={handleCheckin}
            disabled={isCheckinDisabled}
            isLoading={isCheckinLoading}
          />

          <ErrorDisplay error={checkinError} />
        </div>
      </div>

      <TicketModal 
        open={ticketOpen} 
        onClose={() => setTicketOpen(false)} 
        ticket={ticket}
        subscriptionData={subscriptionData}
      />
    </div>
  );
};

export default GateDetails;
