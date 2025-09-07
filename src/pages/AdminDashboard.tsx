import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
	const navigate = useNavigate();

	const cards = [
		{ title: 'Employees', description: 'Manage employee accounts', to: '/admin/employees' },
		{ title: 'Reports', description: 'View parking state reports', to: '/admin/reports' },
		{ title: 'Control Panel', description: 'Operate zones and rates', to: '/admin/control' },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
					<p className="text-gray-600 mt-2">Choose a section to manage the parking system.</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cards.map((card) => (
						<button
							key={card.title}
							onClick={() => navigate(card.to)}
							className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow text-left p-6 border border-gray-100 hover:border-gray-200"
						>
							<h2 className="text-xl font-semibold text-gray-900">{card.title}</h2>
							<p className="text-gray-600 mt-2">{card.description}</p>
							<span className="inline-flex items-center mt-4 text-blue-600 font-medium">
								Open
								<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;


