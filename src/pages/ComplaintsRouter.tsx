import { useAuth } from '@/contexts/AuthContext';
import Complaints from '@/pages/Complaints';
import FacultyComplaints from '@/pages/FacultyComplaints';

const ComplaintsRouter = () => {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === 'student') return <Complaints />;
  return <FacultyComplaints />;
};

export default ComplaintsRouter;
