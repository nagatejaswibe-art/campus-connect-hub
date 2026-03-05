import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Shield, BookOpen, ArrowRight } from 'lucide-react';
import campusBg from '@/assets/campus-bg.jpeg';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Hero with background */}
      <div
        className="min-h-screen flex flex-col bg-cover bg-center relative"
        style={{ backgroundImage: `url(${campusBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/65" />
        
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Nav */}
          <nav className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
              <span className="text-xl font-bold font-display text-primary-foreground">Campus Connect</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </nav>

          {/* Hero content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold font-display text-primary-foreground leading-tight">
                Your Unified Campus Management Platform
              </h1>
              <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Streamline communication between students, faculty, and administration. Manage notices, complaints, requests, and more — all in one place.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Role cards */}
          <div className="relative z-10 px-4 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { icon: <GraduationCap className="h-8 w-8" />, role: 'Student', desc: 'View notices, submit complaints, apply for leaves, and track your submissions.' },
                { icon: <BookOpen className="h-8 w-8" />, role: 'Faculty', desc: 'Post notices, manage complaints, approve leaves, and resolve student issues.' },
                { icon: <Shield className="h-8 w-8" />, role: 'Admin', desc: 'Monitor all activities, resolve complex issues, and manage campus operations.' },
              ].map((card, i) => (
                <div key={i} className="glass-card rounded-xl p-6 text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-bold font-display text-lg text-card-foreground">{card.role}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
