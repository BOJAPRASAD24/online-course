'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/lib/firebase'; 

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (!user) {
          router.push('/login'); 
        }
      });

      return () => unsubscribe();
    }, []);

    return <Component {...props} />;
  };
}
