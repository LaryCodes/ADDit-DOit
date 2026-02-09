/**
 * AuthLayout Component
 *
 * Shared layout for authentication pages (login, signup)
 */

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1410] via-[#2a1f1a] to-[#1a1410] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-yellow-500/20 animate-float">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 text-yellow-500/15 animate-float-slow">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo/Header Area */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2 drop-shadow-lg">ADDit DOit</h1>
          <h2 className="text-2xl font-semibold text-yellow-300">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-yellow-100/80">{subtitle}</p>}
        </div>

        {/* Card Container with Glassmorphism */}
        <div className="glass-card rounded-2xl p-8 shadow-2xl glow">
          {children}
        </div>
      </div>
    </div>
  );
}
