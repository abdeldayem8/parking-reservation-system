import React, { useState } from 'react';
import { useCheckout } from '../Hooks/useTickets';
import { useSubscription } from '../Hooks/useSubscriptions';

type CheckoutStep = 'lookup' | 'subscription' | 'checkout' | 'confirmation';

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
  const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription(
    checkoutData?.ticket.subscriptionId || ''
  );

  // Handle ticket lookup and initial checkout
  const handleTicketSubmit = async (submittedTicketId: string) => {
    setError('');
    
    try {
      const result = await checkoutMutation.mutateAsync({
        ticketId: submittedTicketId,
      });

      setCheckoutData(result);
      
      // Check if this is a subscriber ticket
      if (result.ticket.subscriptionId) {
        setCurrentStep('subscription');
        setSubscriptionData(subscription || null);
      } else {
        setCurrentStep('checkout');
      }
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
      await checkoutMutation.mutateAsync({
        ticketId: checkoutData.ticket.id,
        forceConvertToVisitor: plateMatchStatus === 'mismatch'
      });

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
        ticketId: checkoutData.ticket.id,
        forceConvertToVisitor: true
      });

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
  };

  // Update subscription data when subscription query resolves
  React.useEffect(() => {
    if (subscription && checkoutData?.ticket.subscriptionId) {
      setSubscriptionData(subscription);
    }
  }, [subscription, checkoutData?.ticket.subscriptionId]);

  const isSubscriber = checkoutData?.ticket.subscriptionId && subscriptionData;
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
