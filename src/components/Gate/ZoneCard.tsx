import React from 'react'

type Zone = {
  id: string;
  name: string;
  categoryId: string;
  occupied: number;
  free: number;
  reserved: number;
  availableForVisitors: number;
  availableForSubscribers: number;
  rateNormal: number;
  rateSpecial: number;
  open: boolean;
  specialActive?: boolean;
}

type Props = {
  zone: Zone;
  disabled: boolean;
  selected: boolean;
  onSelect: (zoneId: string) => void;
  isVisitor?: boolean; // Add this to know which tab is active
  subscriptionData?: any; // Add subscription data for category checking
}

const ZoneCard: React.FC<Props> = ({ zone, disabled, selected, onSelect, isVisitor = true, subscriptionData }) => {
  // Check if subscriber's category is allowed for this zone
  const isCategoryAllowed = isVisitor || !subscriptionData || zone.categoryId === subscriptionData.category;
  
  // Determine if zone should be disabled for subscribers
  const isSubscriberDisabled = !isVisitor && (!subscriptionData?.active || !isCategoryAllowed);
  
  // Get the actual disabled state
  const isActuallyDisabled = disabled || isSubscriberDisabled;
  return (
    <button
      onClick={() => !isActuallyDisabled && onSelect(zone.id)}
      disabled={isActuallyDisabled}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        ${selected 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }
        ${isActuallyDisabled 
          ? 'opacity-60 cursor-not-allowed bg-gray-50' 
          : 'cursor-pointer hover:scale-105'
        }
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{zone.name}</h3>
          <p className="text-sm text-gray-600">Category: {zone.categoryId}</p>
          {!isVisitor && subscriptionData && !isCategoryAllowed && (
            <p className="text-xs text-red-600 font-medium mt-1">
              ⚠️ Category not allowed for your subscription
            </p>
          )}
        </div>
        <div className={`
          px-3 py-1 rounded-full text-xs font-semibold
          ${zone.open 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
          }
        `}>
          {zone.open ? 'Open' : 'Closed'}
        </div>
      </div>

      {/* Availability Stats */}
      <div className="space-y-3 mb-4">
        {/* Basic Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-600">Occupied</div>
            <div className="font-bold text-lg text-gray-900">{zone.occupied}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-600">Free</div>
            <div className="font-bold text-lg text-green-600">{zone.free}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-600">Reserved</div>
            <div className="font-bold text-lg text-orange-600">{zone.reserved}</div>
          </div>
        </div>
        
        {/* Availability Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-600">Available (Visitors)</div>
            <div className={`font-bold text-lg ${
              zone.availableForVisitors <= 0 ? 'text-red-600' : 'text-blue-600'
            }`}>
              {zone.availableForVisitors}
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-600">Available (Subscribers)</div>
            <div className={`font-bold text-lg ${
              zone.availableForSubscribers <= 0 ? 'text-red-600' : 'text-blue-600'
            }`}>
              {zone.availableForSubscribers}
            </div>
          </div>
        </div>
      </div>

      {/* Rates */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-600">Normal Rate</div>
            <div className={`font-bold ${zone.specialActive ? 'text-gray-500' : 'text-gray-900'}`}>
              ${zone.rateNormal}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600">Special Rate</div>
            <div className={`font-bold ${zone.specialActive ? 'text-orange-600' : 'text-gray-500'}`}>
              ${zone.rateSpecial}
              {zone.specialActive && <span className="text-xs ml-1">●</span>}
            </div>
          </div>
        </div>
        
        {/* Special Rate Indicator */}
        {zone.specialActive && (
          <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
            Special Active
          </div>
        )}
      </div>

      {/* Selection Indicator */}
      {selected && (
        <div className="mt-3 flex items-center justify-center text-blue-600">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold">Selected</span>
        </div>
      )}
    </button>
  )
}

export default ZoneCard
