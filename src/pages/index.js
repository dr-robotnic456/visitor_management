import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import AdminDashboard from './admin/Dashboard';
import StaffDashboard from './staff/Dashboard';
import UserDashboard from './UserDashboard';
import Auth from '@/components/Auth';

// Replace 'your-secret-key' with your actual secret key
// const secret = 'your-secret-key';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt.decode(token);

      if (decodedToken.email.includes('@admin.com')) {
        router.push('/admin/Dashboard');
      } else if (decodedToken.email.includes('@staff.com')) {
        router.push('/staff/Dashboard');
      } else {
        router.push('/UserDashboard');
      }
    } else {
      // Redirect to the login page or handle the absence of a token
      // For example, you can use router.push('/login') to redirect to the login page.
    }
  }, []);

  // Render a loading indicator or a placeholder while waiting for the redirection
  return null;
}

export default Auth(Home) 