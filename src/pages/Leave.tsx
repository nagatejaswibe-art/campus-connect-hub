import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Clock, Send } from 'lucide-react';

const Leave = () => {
  const { user } = useAuth();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !fromDate || !toDate || !reason.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('leaves').insert({
        student_id: user.id,
        department: user.department || 'General',
        from_date: fromDate,
        to_date: toDate,
        reason: reason.trim(),
      });
      if (error) throw error;
      toast.success('Leave application submitted!');
      setFromDate('');
      setToDate('');
      setReason('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold font-display">Apply Leave</h1>
          <p className="text-muted-foreground">Submit a leave application</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Date</Label>
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>To Date</Label>
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reason</Label>
                <Textarea placeholder="Reason for leave..." value={reason} onChange={(e) => setReason(e.target.value)} rows={4} />
              </div>
              <Button type="submit" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {loading ? 'Submitting...' : 'Apply Leave'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leave;
