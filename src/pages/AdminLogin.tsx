import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import { useAuthStore } from '../store/auth';

const AdminLogin: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useAuthStore();

	const handleSuccess = () => {
		// Navigate to the admin dashboard after login
		if (user?.role === 'admin') {
			navigate('/admin');
		} else {
			navigate('/');
		}
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


