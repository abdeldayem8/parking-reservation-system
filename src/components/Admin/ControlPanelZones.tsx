import React, { useState, useEffect } from 'react';
import { useAdminZones } from '../Hooks/useAdmin';
import { createGateWebSocket } from '../../services/ws';
import { WS_URL } from '../../Config/Config';
import ZoneCard from './ZoneCard';
import AuditLog from './AuditLog';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  adminId: string;
}

const ControlPanelZones: React.FC = () => {
  const { data: zones, isLoading, error, refetch } = useAdminZones();
  const [auditEntries, setAuditEntries] = useState<AuditLogEntry[]>([]);
  const [wsStatus, setWsStatus] = useState<string>('disconnected');

  useEffect(() => {
    if (!WS_URL) return;

    const ws = createGateWebSocket({
      url: WS_URL,
      gateId: 'admin', // Using 'admin' as a special gateId for admin updates
      onStatusChange: (status) => {
        setWsStatus(status);
      },
      onAdminUpdate: (payload) => {
        // Add new audit entry from WebSocket message
        const newEntry: AuditLogEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          action: payload.action || 'performed an action',
          adminId: payload.adminId || 'Unknown',
        };
        
        setAuditEntries(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50 entries
        
        // Refetch zones data after admin update
        refetch();
      },
    });

    ws.connect();

    return () => {
      ws.disconnect();
    };
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Zone Control</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading zones...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Zone Control</h2>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading zones</h3>
              <p className="mt-1 text-sm text-red-700">
                Failed to fetch zones data. Please try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Zone Control</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            wsStatus === 'open' ? 'bg-green-500' : 
            wsStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm text-gray-600 capitalize">{wsStatus}</span>
        </div>
      </div>

    

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zones Grid */}
        <div className="lg:col-span-2">
          {zones && zones.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map((zone: any) => (
                <ZoneCard key={zone.id} zone={zone} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No zones found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No parking zones are currently configured.
              </p>
            </div>
          )}
        </div>

        {/* Audit Log */}
        <div className="lg:col-span-1">
          <AuditLog entries={auditEntries} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanelZones;
