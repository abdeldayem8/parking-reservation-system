import React from 'react';
import { useParkingStateReport } from '../components/Hooks/useAdmin';
import ParkingStateSummary from '../components/Admin/ParkingStateSummary';
import ParkingStateTable from '../components/Admin/ParkingStateTable';

const AdminReports: React.FC = () => {
	const { data, isLoading, isError, error } = useParkingStateReport();

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Parking State Report</h1>
					<p className="text-gray-600 mt-2">Real-time overview of all parking zones and their current status.</p>
				</div>

				{isLoading && (
					<div className="flex justify-center items-center py-12">
						<div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
					</div>
				)}

				{isError && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
						{(error as any)?.message || 'Failed to load parking state report'}
					</div>
				)}

				{!isLoading && !isError && data && (
					<>
						<ParkingStateSummary zones={Array.isArray(data) ? data : []} />
						<ParkingStateTable zones={Array.isArray(data) ? data : []} />
					</>
				)}
			</div>
		</div>
	);
};

export default AdminReports;


