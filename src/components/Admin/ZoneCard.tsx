import React from 'react';
import { useUpdateZoneOpen } from '../Hooks/useAdmin';

interface Zone {
  id: string;
  name: string;
  categoryId: string;
  open: boolean;
}

interface ZoneCardProps {
  zone: Zone;
}

const ZoneCard: React.FC<ZoneCardProps> = ({ zone }) => {
  const updateZoneOpen = useUpdateZoneOpen();

  const handleToggleOpen = () => {
    updateZoneOpen.mutate({
      id: zone.id,
      open: !zone.open
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {zone.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Category ID: {zone.categoryId}
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Status:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              zone.open 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {zone.open ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
        
        <div className="ml-4">
          <button
            onClick={handleToggleOpen}
            disabled={updateZoneOpen.isPending}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              zone.open
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {updateZoneOpen.isPending 
              ? 'Updating...' 
              : zone.open 
                ? 'Close Zone' 
                : 'Open Zone'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneCard;
