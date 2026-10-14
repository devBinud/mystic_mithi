import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PhilosophyPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/about', { replace: true });
  }, [navigate]);
  return null;
}
