import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'student' | 'faculty' | 'admin';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole, department?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = useCallback(async (session: Session) => {
    // Parallel fetch profile + role
    const [profileRes, roleRes] = await Promise.all([
      supabase.from('profiles').select('name, department').eq('id', session.user.id).single(),
      supabase.from('user_roles').select('role').eq('user_id', session.user.id).single(),
    ]);

    const profile = profileRes.data;
    const roleData = roleRes.data;

    if (profile) {
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        name: profile.name || '',
        role: (roleData?.role as UserRole) || 'student',
        department: profile.department || undefined,
      });
    } else {
      // Fallback to metadata if profile not yet created by trigger
      const meta = session.user.user_metadata;
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        name: meta?.name || '',
        role: (meta?.role as UserRole) || 'student',
        department: meta?.department || undefined,
      });
    }
  }, []);

  useEffect(() => {
    // Get initial session first
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadUserProfile(session).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadUserProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string, role: UserRole, department?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { name, role, department },
      },
    });
    if (error) throw error;

    if (data.user) {
      // Trigger handles profile/role creation, but upsert as fallback
      await Promise.all([
        supabase.from('profiles').upsert({ id: data.user.id, name, department: department || null }),
        supabase.from('user_roles').upsert({ user_id: data.user.id, role }),
      ]);
    }
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
