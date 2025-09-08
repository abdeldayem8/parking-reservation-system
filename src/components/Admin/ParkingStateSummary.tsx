import React from 'react';

type ZoneState = {
  id: string;
  name: string;
  totalSlots: number;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  subscriberCount: number;
  open: boolean;
};

interface ParkingStateSummaryProps {
  zones: ZoneState[];
}

const ParkingStateSummary: React.FC<ParkingStateSummaryProps> = ({ zones }) => {
  const totalSlots = zones.reduce((sum, zone) => sum + zone.totalSlots, 0);
  const totalOccupied = zones.reduce((sum, zone) => sum + zone.occupied, 0);
  const totalReserved = zones.reduce((sum, zone) => sum + zone.reserved, 0);
  const totalAvailableForVisitors = zones.reduce((sum, zone) => sum + zone.availableForVisitors, 0);
  const totalAvailableForSubscribers = zones.reduce((sum, zone) => sum + zone.availableForSubscribers, 0);
  const totalSubscribers = zones.reduce((sum, zone) => sum + zone.subscriberCount, 0);
  const openZones = zones.filter(zone => zone.open).length;
  const closedZones = zones.length - openZones;

  const occupancyRate = totalSlots > 0 ? ((totalOccupied / totalSlots) * 100).toFixed(1) : '0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Slots */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Slots</p>
            <p className="text-2xl font-semibold text-gray-900">{totalSlots}</p>
          </div>
        </div>
      </div>

      {/* Occupied */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Occupied</p>
            <p className="text-2xl font-semibold text-gray-900">{totalOccupied}</p>
            <p className="text-xs text-gray-500">{occupancyRate}% occupancy</p>
          </div>
        </div>
      </div>

      {/* Available for Visitors */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Available (Visitors)</p>
            <p className="text-2xl font-semibold text-gray-900">{totalAvailableForVisitors}</p>
          </div>
        </div>
      </div>

      {/* Available for Subscribers */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Available (Subscribers)</p>
            <p className="text-2xl font-semibold text-gray-900">{totalAvailableForSubscribers}</p>
          </div>
        </div>
      </div>

      {/* Zone Status */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Zone Status</p>
            <p className="text-lg font-semibold text-gray-900">
              <span className="text-green-600">{openZones}</span> / <span className="text-gray-900">{zones.length}</span>
            </p>
            <p className="text-xs text-gray-500">{openZones} open, {closedZones} closed</p>
          </div>
        </div>
      </div>

      {/* Reserved Slots */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Reserved</p>
            <p className="text-2xl font-semibold text-gray-900">{totalReserved}</p>
          </div>
        </div>
      </div>

      {/* Total Subscribers */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Subscribers</p>
            <p className="text-2xl font-semibold text-gray-900">{totalSubscribers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingStateSummary;
