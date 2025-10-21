'use client';

interface ChartCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  children: React.ReactNode;
}

export default function ChartCard({ title, value, change, changeType, children }: ChartCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            changeType === 'positive' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {change}
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-[#c40001]">{value}</span>
        </div>
      </div>
      <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2">
        {children}
      </div>
    </div>
  );
}

// Simple Bar Chart Component
export function SimpleBarChart({ data }: { data: number[] }) {
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end space-x-1 h-full">
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-gradient-to-t from-[#c40001] to-[#dda822] rounded-t flex-1 hover:from-[#c40001]/80 hover:to-[#dda822]/80 transition-all duration-300"
          style={{ height: `${(value / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
}

// Simple Line Chart Component
export function SimpleLineChart({ data }: { data: number[] }) {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="h-full w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          points={points}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c40001" />
            <stop offset="100%" stopColor="#dda822" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
