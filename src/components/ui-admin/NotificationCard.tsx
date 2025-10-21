'use client';

import { FileText, Calendar, DollarSign } from 'lucide-react';

interface NotificationItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    icon: <FileText className="w-5 h-5 text-[#c40001]" />,
    title: 'Pengajuan Cuti',
    description: '5 pengajuan cuti menunggu persetujuan'
  },
  {
    id: '2',
    icon: <Calendar className="w-5 h-5 text-[#dda822]" />,
    title: 'Validasi Absensi',
    description: '10 absensi perlu validasi'
  },
  {
    id: '3',
    icon: <DollarSign className="w-5 h-5 text-[#c40001]" />,
    title: 'Pengolahan Gaji',
    description: 'Status pengolahan gaji bulan ini'
  }
];

export default function NotificationCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-[#c40001] to-[#dda822] rounded-full mr-3"></div>
        <h3 className="text-lg font-semibold text-gray-900">Notifikasi / Tugas</h3>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-4 p-4 hover:bg-gradient-to-r hover:from-[#c40001]/5 hover:to-[#dda822]/5 rounded-xl transition-all duration-300 hover:shadow-md">
            <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
              {notification.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{notification.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
