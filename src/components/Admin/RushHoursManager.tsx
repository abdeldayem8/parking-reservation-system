import React, { useState } from 'react';
import { useCreateRushHour } from '../Hooks/useAdmin';

const WEEKDAYS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

const RushHoursManager: React.FC = () => {
  const createRushHour = useCreateRushHour();
  const [rushHours, setRushHours] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    weekDay: 1,
    from: '07:00',
    to: '09:00'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting rush hour:', formData);
    try {
      const newRushHour = await createRushHour.mutateAsync(formData);
      console.log('Rush hour created:', newRushHour);
      setRushHours(prev => [...prev, newRushHour]);
      setShowForm(false);
      setFormData({ weekDay: 1, from: '07:00', to: '09:00' });
    } catch (error) {
      console.error('Failed to create rush hour:', error);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Rush Hours Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Rush Hour'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Day of Week
              </label>
              <select
                value={formData.weekDay}
                onChange={(e) => setFormData({ ...formData, weekDay: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {WEEKDAYS.map(day => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Time
              </label>
              <input
                type="time"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Time
              </label>
              <input
                type="time"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={createRushHour.isPending}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {createRushHour.isPending ? 'Adding...' : 'Add Rush Hour'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {rushHours && rushHours.length > 0 ? (
          rushHours.map((rushHour: any) => (
            <div key={rushHour.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <span className="font-medium">
                  {WEEKDAYS.find(d => d.value === rushHour.weekDay)?.label}
                </span>
                <span className="ml-2 text-gray-600">
                  {rushHour.from} - {rushHour.to}
                </span>
              </div>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                Special Rate Active
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No rush hours configured</p>
        )}
      </div>
    </div>
  );
};

export default RushHoursManager;
