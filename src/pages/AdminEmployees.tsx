import React from 'react';

const AdminEmployees: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Employees</h1>
					<p className="text-gray-600 mt-2">Manage employee accounts and permissions.</p>
				</div>
				
				<div className="bg-white rounded-xl shadow p-8 text-center">
					<div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
						<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
					</div>
					<h3 className="text-lg font-medium text-gray-900 mb-2">Employee Management</h3>
					<p className="text-gray-600 mb-4">
						This section will allow you to list, create, and manage employee accounts.
					</p>
					<p className="text-sm text-gray-500">
						The /admin/users endpoint is not available yet, so this feature is coming soon.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AdminEmployees;


