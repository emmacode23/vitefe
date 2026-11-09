import React from 'react';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-kita text-white hover:bg-kita-light active:bg-kita-dark shadow-sm',
    gold: 'bg-gold text-white hover:bg-gold-light active:bg-gold-dark shadow-sm',
    sos: 'bg-sos text-white hover:bg-sos-dark shadow-sos',
    outline: 'border-2 border-kita text-kita bg-transparent hover:bg-kita-surface',
    ghost: 'text-kita hover:bg-kita-surface',
    surface: 'bg-kita-surface text-kita-dark hover:bg-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-2 min-h-[36px]',
    md: 'text-sm px-4 py-3 min-h-[48px]', // Respect du touch target 48px
    lg: 'text-base px-6 py-4 min-h-[56px]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
