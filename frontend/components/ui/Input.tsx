/**
 * Input Component
 *
 * Reusable input field with label, error display, and character count
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /** Input label */
  label: string;
  /** Error message to display */
  error?: string;
  /** Maximum character count (shows counter if provided) */
  maxLength?: number;
  /** Current value length (for character counter) */
  valueLength?: number;
  /** Use textarea instead of input */
  multiline?: boolean;
  /** Number of rows for textarea */
  rows?: number;
}

export default function Input({
  label,
  error,
  maxLength,
  valueLength,
  multiline = false,
  rows = 3,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = 'w-full px-4 py-3 bg-[#2a1f1a]/50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-yellow-100 placeholder-yellow-100/40';
  const stateClasses = error
    ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
    : 'border-yellow-500/30 focus:ring-yellow-500 focus:border-yellow-500';

  const InputElement = multiline ? 'textarea' : 'input';

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="block text-sm font-medium text-yellow-300 mb-2">
        {label}
      </label>
      <InputElement
        id={inputId}
        className={`${baseClasses} ${stateClasses} ${className}`}
        maxLength={maxLength}
        rows={multiline ? rows : undefined}
        {...(props as any)}
      />
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {maxLength && valueLength !== undefined && (
          <p className={`text-sm ml-auto ${valueLength > maxLength ? 'text-red-400' : 'text-yellow-100/60'}`}>
            {valueLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
