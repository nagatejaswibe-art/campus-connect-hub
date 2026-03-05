import { cn } from '@/lib/utils';

type Status = 'pending' | 'approved' | 'rejected' | 'resolved' | 'in-progress';

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize",
      status === 'pending' && 'status-pending',
      status === 'approved' && 'status-approved',
      status === 'rejected' && 'status-rejected',
      status === 'resolved' && 'status-resolved',
      status === 'in-progress' && 'status-in-progress',
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;
