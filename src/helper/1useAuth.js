// useAuth.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export function useAuth(requiredRole, redirectPath = '/') {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? getCookie('token') : null;

  useEffect(() => {
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken.role !== requiredRole) {
        router.replace(redirectPath);
      } else {
        setLoading(false);
      }
    } else {
      router.replace(redirectPath);
    }
  }, [token]);

  return { loading };
}
