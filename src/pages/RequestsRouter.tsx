import { useAuth } from '@/contexts/AuthContext';
import Requests from '@/pages/Requests';
import FacultyRequests from '@/pages/FacultyRequests';

const RequestsRouter = () => {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === 'student') return <Requests />;
  return <FacultyRequests />;
};

export default RequestsRouter;
