import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Auth from '@/components/Auth';
<<<<<<< HEAD
=======

// Replace 'your-secret-key' with your actual secret key
// const secret = 'your-secret-key';
>>>>>>> 557171ec2fc44b822dece576603840903e42ab14

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
  }, [router]);

  // Render a loading indicator or a placeholder while waiting for the redirection
  return null;
}

<<<<<<< HEAD
export default Auth(Home) 
=======
export default Auth(Home) 
>>>>>>> 557171ec2fc44b822dece576603840903e42ab14
