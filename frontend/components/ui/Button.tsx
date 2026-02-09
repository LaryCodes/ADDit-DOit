/**
 * Button Component
 *
 * Reusable button with variants, sizes, and loading state
 */

import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant: primary (yellow), secondary (glass), danger (red) */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Button size: sm, md, lg */
  size?: 'sm' | 'md' | 'lg';
  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Button content */
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-[#1a1410] hover:from-yellow-400 hover:to-yellow-500 focus:ring-yellow-500 shadow-lg glow-hover',
    secondary: 'glass-card text-yellow-300 hover:text-yellow-200 focus:ring-yellow-500 glow-hover border border-yellow-500/30',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 focus:ring-red-500 shadow-lg',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
}
