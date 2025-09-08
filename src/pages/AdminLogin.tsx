import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';

const AdminLogin: React.FC = () => {
	const navigate = useNavigate();

	const handleSuccess = () => {
		// Always navigate to admin dashboard from admin login page
		// The admin login page should only be accessible to admin users
		navigate('/admin');
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				<LoginForm title="Admin Login" subtitle="Sign in to access admin tools" onSuccess={handleSuccess} />
			</div>
		</div>
	);
};

export default AdminLogin;


