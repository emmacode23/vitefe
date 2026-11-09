import React from 'react';

export default function ServiceCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  onClick,
  accentColor = 'text-kita',
  bgColor = 'bg-white',
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full text-left p-4 rounded-2xl ${bgColor}
        border border-emerald-900/10 shadow-sm
        flex flex-col justify-between
        transition-all duration-150 active:scale-95 hover:shadow-md
        min-h-[120px] select-none
      `}
    >
      {badge && (
        <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          {badge}
        </span>
      )}
      
      <div className={`w-12 h-12 rounded-xl bg-kita-surface/80 flex items-center justify-center ${accentColor} mb-3`}>
        {Icon && <Icon className="w-6 h-6 stroke-[2.2]" />}
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-900 leading-tight">
          {title}
        </h3>
        <p className="text-[11px] text-gray-700 font-medium leading-normal mt-0.5">
          {subtitle}
        </p>
      </div>
    </button>
  );
}
