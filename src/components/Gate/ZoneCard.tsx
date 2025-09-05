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
}

const ZoneCard: React.FC<Props> = ({ zone, disabled, selected, onSelect, isVisitor = true }) => {
  return (
    <button
      onClick={() => !disabled && onSelect(zone.id)}
      disabled={disabled}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        ${selected 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
        }
        ${disabled 
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
      <div className="grid grid-cols-2 gap-3 mb-4">
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
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-gray-600">
            Available {isVisitor ? '(Visitors)' : '(Subscribers)'}
          </div>
          <div className="font-bold text-lg text-blue-600">
            {isVisitor ? zone.availableForVisitors : zone.availableForSubscribers}
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
