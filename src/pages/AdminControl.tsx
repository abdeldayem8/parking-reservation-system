import React from 'react';
import ControlPanelZones from '../components/Admin/ControlPanelZones';
import CategoryRateManager from '../components/Admin/CategoryRateManager';
import RushHoursManager from '../components/Admin/RushHoursManager';
import VacationsManager from '../components/Admin/VacationsManager';

const AdminControl: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<h1 className="text-2xl font-semibold text-gray-900 mb-6">Control Panel</h1>
				
				{/* Zone Control Section */}
				<div className="mb-8">
					<ControlPanelZones />
				</div>
				
				{/* Category Rate Management */}
				<div className="mb-8">
					<CategoryRateManager />
				</div>
				
				{/* Rush Hours and Vacations */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
					<RushHoursManager />
					<VacationsManager />
				</div>
			</div>
		</div>
	);
};

export default AdminControl;


