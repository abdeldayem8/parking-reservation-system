import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGateDetails, useZones, useCheckin } from "./index";
import { WS_URL } from "../../Config/Config";
import { createGateWebSocket } from "../../services/ws";
import { useTicketStore } from "../../store/ticket";

export const useGateDetailsPage = () => {
  const { gateId } = useParams<{ gateId: string }>();
  const navigate = useNavigate();
  
  // Data fetching
  const { data: gate, isLoading: gateLoading, error: gateError } = useGateDetails(gateId || "");
  const { data: zones, isLoading: zonesLoading, error: zonesError } = useZones(gateId || "");
  const checkinMutation = useCheckin();
  
  // Ticket store
  const { setTicket: setStoredTicket } = useTicketStore();
  
  // Local state
  const [tab, setTab] = useState<'visitor' | 'subscriber'>('visitor');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [subscriptionError, setSubscriptionError] = useState<string>("");
  const [isVerifyingSubscription, setIsVerifyingSubscription] = useState(false);
  const [ticket, setTicket] = useState<any>(null);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [wsStatus, setWsStatus] = useState<'connecting' | 'open' | 'closed' | 'error'>('closed');
  const [zonesMap, setZonesMap] = useState<Record<string, any>>({});
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reset subscription data when switching tabs
  useEffect(() => {
    if (tab === 'visitor') {
      setSubscriptionId("");
      setSubscriptionData(null);
      setSubscriptionError("");
      setSelectedZoneId(null);
    }
  }, [tab]);

  // Update zones map when zones data changes
  useEffect(() => {
    if (zones) {
      const zonesArray = Array.isArray(zones) ? zones : zones?.zones || [];
      const next: Record<string, any> = {};
      zonesArray.forEach((z: any) => {
        next[z.id] = z;
      });
      setZonesMap(next);
    }
  }, [zones]);

  // WebSocket connection
  useEffect(() => {
    if (!gateId || !WS_URL) return;
    
    const { connect, disconnect } = createGateWebSocket({
      url: WS_URL,
      gateId: gateId,
      onStatusChange: setWsStatus,
      onZoneUpdate: (zone) => {
        setZonesMap((prev) => ({ ...prev, [zone.id]: zone }));
      },
      onAdminUpdate: (payload) => {
        console.log('Admin update received:', payload);
      },
    });
    
    connect();
    return () => disconnect();
  }, [gateId]);

  // Handle subscription verification
  const verifySubscription = async () => {
    if (!subscriptionId.trim()) {
      setSubscriptionError("Please enter a subscription ID");
      return;
    }
    
    try {
      setSubscriptionError("");
      setIsVerifyingSubscription(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptions/${subscriptionId}`);
      if (response.ok) {
        const data = await response.json();
        setSubscriptionData(data);
        
        // Clear any previous zone selection when subscription changes
        setSelectedZoneId(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubscriptionError(errorData.message || "Invalid subscription ID");
        setSubscriptionData(null);
      }
    } catch (error) {
      setSubscriptionError("Failed to verify subscription. Please try again.");
      setSubscriptionData(null);
    } finally {
      setIsVerifyingSubscription(false);
    }
  };

  // Handle check-in
  const handleCheckin = async () => {
    if (!selectedZoneId || !gate) return;
    
    const payload: any = { 
      gateId: gate.id, 
      zoneId: selectedZoneId 
    };
    
    if (tab === 'visitor') {
      payload.type = 'visitor';
    } else {
      if (!subscriptionId || !subscriptionData) {
        setSubscriptionError("Please verify your subscription first");
        return;
      }
      payload.type = 'subscriber';
      payload.subscriptionId = subscriptionId;
    }

    try {
      const result = await checkinMutation.mutateAsync(payload);
      
      // Save ticket to Zustand store
      const ticketToStore = {
        id: result.ticket.id,
        type: result.ticket.type || (tab === 'visitor' ? 'visitor' : 'subscriber'),
        gateId: result.ticket.gateId,
        zoneId: result.ticket.zoneId,
        checkinAt: result.ticket.checkinAt,
        checkoutAt: result.ticket.checkoutAt || null,
        subscriptionId: result.ticket.subscriptionId || (tab === 'subscriber' ? subscriptionId : null),
      };
      setStoredTicket(ticketToStore);
      
      setTicket(result.ticket);
      setTicketOpen(true);
      setSelectedZoneId(null);
      setSubscriptionId("");
      setSubscriptionData(null);
      setSubscriptionError("");
    } catch (error: any) {
      console.error('Check-in failed:', error);
      // Error will be handled by the mutation's error state
    }
  };

  // Computed values
  const zoneList = Object.values(zonesMap) as any[];
  const isVisitor = tab === 'visitor';
  
  const canSelect = (z: any) => {
    if (!z.open) return false;
    
    if (isVisitor) {
      return z.availableForVisitors > 0;
    } else {
      // For subscribers, check if subscription is active and category matches
      if (!subscriptionData?.active) return false;
      if (z.availableForSubscribers <= 0) return false;
      return z.categoryId === subscriptionData.category;
    }
  };
  
  const isCheckinDisabled = !selectedZoneId || 
    checkinMutation.isPending || 
    (tab === 'subscriber' && (!subscriptionData || !subscriptionData.active));

  return {
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
    isLoading: gateLoading || zonesLoading,
    error: gateError || zonesError,
    checkinError: checkinMutation.error,
    isCheckinLoading: checkinMutation.isPending,
    
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
  };
};
