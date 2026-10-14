import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppointmentPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/books', { replace: true });
  }, [navigate]);
  return null;
}
