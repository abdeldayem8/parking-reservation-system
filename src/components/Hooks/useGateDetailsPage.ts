import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGateDetails, useZones, useCheckin } from "./index";
import { WS_URL } from "../../Config/Config";
import { createGateWebSocket } from "../../services/ws";

export const useGateDetailsPage = () => {
  const { gateId } = useParams<{ gateId: string }>();
  const navigate = useNavigate();
  
  // Data fetching
  const { data: gate, isLoading: gateLoading, error: gateError } = useGateDetails(gateId || "");
  const { data: zones, isLoading: zonesLoading, error: zonesError } = useZones(gateId || "");
  const checkinMutation = useCheckin();
  
  // Local state
  const [tab, setTab] = useState<'visitor' | 'subscriber'>('visitor');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [subscriptionError, setSubscriptionError] = useState<string>("");
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptions/${subscriptionId}`);
      if (response.ok) {
        const data = await response.json();
        setSubscriptionData(data);
      } else {
        setSubscriptionError("Invalid subscription ID");
        setSubscriptionData(null);
      }
    } catch (error) {
      setSubscriptionError("Failed to verify subscription");
      setSubscriptionData(null);
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
      setTicket(result.ticket);
      setTicketOpen(true);
      setSelectedZoneId(null);
      setSubscriptionId("");
      setSubscriptionData(null);
      setSubscriptionError("");
    } catch (error: any) {
      console.error('Check-in failed:', error);
    }
  };

  // Computed values
  const zoneList = Object.values(zonesMap) as any[];
  const isVisitor = tab === 'visitor';
  const canSelect = (z: any) => z.open && (!isVisitor || z.availableForVisitors > 0);
  const isCheckinDisabled = !selectedZoneId || checkinMutation.isPending || (tab === 'subscriber' && !subscriptionData);

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
