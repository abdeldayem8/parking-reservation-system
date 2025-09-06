import React, { useState } from 'react';
import { useCheckout } from '../Hooks/useTickets';
import { useSubscription } from '../Hooks/useSubscriptions';
import { useTicketStore } from '../../store/ticket';

type CheckoutStep = 'lookup' | 'subscription' | 'checkout' | 'confirmation';

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

interface SubscriptionData {
  id: string;
  userName: string;
  category: string;
  active: boolean;
  cars: Array<{
    plate: string;
    brand: string;
    model: string;
    color: string;
  }>;
  startsAt: string;
  expiresAt: string;
}

export const useCheckpointPage = () => {
  // State management
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('lookup');
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [plateMatchStatus, setPlateMatchStatus] = useState<'pending' | 'match' | 'mismatch'>('pending');
  const [error, setError] = useState('');

  // Hooks
  const checkoutMutation = useCheckout();
  const { ticket: storedTicket, clearTicket, updateCheckout } = useTicketStore();
  const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription(
    storedTicket?.subscriptionId || ''
  );

  // Handle ticket lookup and initial checkout
  const handleTicketSubmit = async (submittedTicketId: string) => {
    setError('');
    
    try {
      const result = await checkoutMutation.mutateAsync({
        ticketId: submittedTicketId,
      });

      setCheckoutData(result);
      
      // For now, we'll go directly to checkout since the new API response
      // doesn't include subscription information in the initial response
      setCurrentStep('checkout');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to process ticket';
      setError(errorMessage);
    }
  };

  // Handle plate match verification
  const handlePlateMatch = (matches: boolean) => {
    setPlateMatchStatus(matches ? 'match' : 'mismatch');
    setCurrentStep('checkout');
  };

  // Handle checkout confirmation
  const handleCheckoutConfirm = async () => {
    if (!checkoutData) return;
    
    setError('');

    try {
      const result = await checkoutMutation.mutateAsync({
        ticketId: checkoutData.ticketId,
        forceConvertToVisitor: plateMatchStatus === 'mismatch'
      });

      // Update checkout time in store
      if (storedTicket) {
        updateCheckout(result.checkoutAt || new Date().toISOString());
      }

      setCurrentStep('confirmation');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Checkout failed';
      setError(errorMessage);
    }
  };

  // Handle convert to visitor
  const handleConvertToVisitor = async () => {
    if (!checkoutData) return;
    
    setError('');

    try {
      const result = await checkoutMutation.mutateAsync({
        ticketId: checkoutData.ticketId,
        forceConvertToVisitor: true
      });

      // Update checkout time in store
      if (storedTicket) {
        updateCheckout(result.checkoutAt || new Date().toISOString());
      }

      setCheckoutData(result);
      setCurrentStep('confirmation');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Conversion failed';
      setError(errorMessage);
    }
  };

  // Reset for new checkout
  const handleNewCheckout = () => {
    setCurrentStep('lookup');
    setCheckoutData(null);
    setSubscriptionData(null);
    setPlateMatchStatus('pending');
    setError('');
    // Clear ticket from store after successful checkout
    clearTicket();
  };

  // Update subscription data when subscription query resolves
  React.useEffect(() => {
    if (subscription && storedTicket?.subscriptionId) {
      setSubscriptionData(subscription);
    }
  }, [subscription, storedTicket?.subscriptionId]);

  // Check if current ticket is a subscriber ticket
  const isSubscriber = storedTicket?.type === 'subscriber' && storedTicket?.subscriptionId;
  const isLoading = checkoutMutation.isPending || isSubscriptionLoading;

  return {
    // State
    currentStep,
    checkoutData,
    subscriptionData,
    plateMatchStatus,
    error,
    isLoading,
    isSubscriber,
    
    // Actions
    handleTicketSubmit,
    handlePlateMatch,
    handleCheckoutConfirm,
    handleConvertToVisitor,
    handleNewCheckout,
    setError,
  };
};
