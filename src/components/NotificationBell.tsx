import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data, count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5);
      setUnreadCount(count || 0);
      setRecent(data || []);
    };
    fetch();
    const interval = setInterval(fetch, 30000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-border">
          <h4 className="font-semibold text-sm">Notifications</h4>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {recent.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">No new notifications</p>
          ) : (
            recent.map((n) => (
              <div key={n.id} className="px-3 py-2 border-b border-border/50 last:border-0">
                <p className="text-sm">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{new Date(n.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate('/dashboard/notifications')}>
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;
