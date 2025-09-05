import React from 'react';

type Props = {
  tab: 'visitor' | 'subscriber';
  onTabChange: (tab: 'visitor' | 'subscriber') => void;
};

const CheckinTabs: React.FC<Props> = ({ tab, onTabChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      <button 
        onClick={() => onTabChange('visitor')} 
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          tab === 'visitor' 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Visitor
      </button>
      <button 
        onClick={() => onTabChange('subscriber')} 
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          tab === 'subscriber' 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Subscriber
      </button>
    </div>
  );
};

export default CheckinTabs;
