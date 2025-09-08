import React, { useState } from 'react';
import { useCreateVacation } from '../Hooks/useAdmin';

const VacationsManager: React.FC = () => {
  const createVacation = useCreateVacation();
  const [vacations, setVacations] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting vacation:', formData);
    try {
      const newVacation = await createVacation.mutateAsync(formData);
      console.log('Vacation created:', newVacation);
      setVacations(prev => [...prev, newVacation]);
      setShowForm(false);
      setFormData({ name: '', from: '', to: '' });
    } catch (error) {
      console.error('Failed to create vacation:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Vacations Management</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Vacation'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vacation Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Eid Holiday"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={createVacation.isPending}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {createVacation.isPending ? 'Adding...' : 'Add Vacation'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {vacations && vacations.length > 0 ? (
          vacations.map((vacation: any) => (
            <div key={vacation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div>
                <span className="font-medium">{vacation.name}</span>
                <span className="ml-2 text-gray-600">
                  {formatDate(vacation.from)} - {formatDate(vacation.to)}
                </span>
              </div>
              <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                Special Rate Active
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No vacations configured</p>
        )}
      </div>
    </div>
  );
};

export default VacationsManager;
