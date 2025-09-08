import React, { useState } from 'react';
import { useAdminCategories, useUpdateCategory } from '../Hooks/useAdmin';

const CategoryRateManager: React.FC = () => {
  const { data: categories, isLoading } = useAdminCategories();
  const updateCategory = useUpdateCategory();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    rateNormal: '' as any,
    rateSpecial: '' as any,
    name: '',
    description: ''
  });

  const handleEdit = (category: any) => {
    setEditingCategory(category.id);
    setFormData({
      rateNormal: category.rateNormal,
      rateSpecial: category.rateSpecial,
      name: category.name,
      description: category.description || ''
    });
  };

  const handleSave = async () => {
    if (!editingCategory) return;
    
    try {
      await updateCategory.mutateAsync({
        id: editingCategory,
        category: formData
      });
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setFormData({ rateNormal: '' as any, rateSpecial: '' as any, name: '', description: '' });
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Category Rate Management</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Category Rate Management</h3>
      
      <div className="space-y-4">
        {categories?.map((category: any) => (
          <div key={category.id} className="border border-gray-200 rounded-lg p-4">
            {editingCategory === category.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Normal Rate ($/hour)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.rateNormal}
                      onChange={(e) => setFormData({ ...formData, rateNormal: e.target.value === '' ? '' as any : parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Rate ($/hour)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.rateSpecial}
                      onChange={(e) => setFormData({ ...formData, rateSpecial: e.target.value === '' ? '' as any : parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={updateCategory.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updateCategory.isPending ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <div className="mt-2 flex space-x-4 text-sm">
                    <span className="text-green-600">Normal: ${category.rateNormal}/hr</span>
                    <span className="text-orange-600">Special: ${category.rateSpecial}/hr</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(category)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Edit Rates
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRateManager;
