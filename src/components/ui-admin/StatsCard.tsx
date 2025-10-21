'use client';

import Link from 'next/link';

interface StatsCardProps {
  title: string;
  value: string;
  href?: string;
  className?: string;
}

export default function StatsCard({ title, value, href, className = '' }: StatsCardProps) {
  const cardContent = (
    <div className={`bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:shadow-[#c40001]/10 transition-all duration-300 hover:border-[#c40001]/30 ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-3 leading-relaxed">{title}</h3>
      <p className="text-3xl font-bold text-[#c40001] mb-1">{value}</p>
      <div className="w-full h-1 bg-gradient-to-r from-[#c40001] to-[#dda822] rounded-full"></div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
