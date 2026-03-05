import campusBg from '@/assets/campus-bg.jpeg';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${campusBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold font-display text-primary-foreground drop-shadow-lg">
              Campus Connect
            </h1>
            <p className="text-primary-foreground/80 mt-2 font-body text-sm">
              Your unified campus management platform
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
