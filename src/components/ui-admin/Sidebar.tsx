'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  ChartBarIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/solid';

const menuItems = [
  { name: 'Dashboard', href: '/sikseb', icon: ChartBarIcon },
  { name: 'Role', href: '/sikseb/role', icon: UserGroupIcon },
  { name: 'User', href: '/sikseb/user', icon: UserIcon },
  { name: 'Karyawan', href: '/sikseb/karyawan', icon: UsersIcon },
  { name: 'Absensi', href: '/sikseb/absensi', icon: ClockIcon },
  { name: 'Cuti', href: '/sikseb/cuti', icon: CalendarDaysIcon },
  { name: 'Gaji', href: '/sikseb/gaji', icon: CurrencyDollarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <Link href="/sikseb">
          <Image
            src="/logoshine.png"
            alt="Sikshine Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === item.href
                    ? 'bg-[#c40001] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className="mr-3 w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
