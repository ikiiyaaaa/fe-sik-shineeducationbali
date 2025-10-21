'use client';

import StatsCard from './StatsCard';
import NotificationCard from './NotificationCard';
import ChartCard, { SimpleBarChart, SimpleLineChart } from './ChartCard';

// Sample data for charts
const attendanceData = [85, 90, 88, 92, 95, 95];
const leaveData = [20, 18, 22, 19, 15, 15];
const latenessData = [8, 6, 7, 5, 5, 5];

export default function DashboardContent() {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Jumlah Karyawan"
          value="150"
          href="/sikseb/karyawan"
        />
        <StatsCard
          title="Jumlah Absensi Hari Ini (Check-in / Check-out)"
          value="120 / 115"
          href="/sikseb/absensi"
        />
        <StatsCard
          title="Jumlah Pengajuan Cuti (Menunggu, Disetujui, Ditolak)"
          value="5 (2, 2, 1)"
          href="/sikseb/cuti"
        />
        <StatsCard
          title="Jumlah Data Gaji yang Sudah Dihitung"
          value="140"
          href="/sikseb/gaji"
        />
      </div>

      {/* Notifications */}
      <NotificationCard />

      {/* Charts */}
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="w-2 h-8 bg-gradient-to-b from-[#c40001] to-[#dda822] rounded-full mr-3"></div>
          <h3 className="text-xl font-bold text-gray-900">Analisis & Grafik</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard
            title="Kehadiran"
            value="95%"
            change="Bulan Ini +2%"
            changeType="positive"
          >
            <SimpleBarChart data={attendanceData} />
          </ChartCard>

          <ChartCard
            title="Pengajuan Cuti Bulanan"
            value="15"
            change="Bulan Ini -5"
            changeType="positive"
          >
            <SimpleBarChart data={leaveData} />
          </ChartCard>

          <ChartCard
            title="Tren Keterlambatan"
            value="5%"
            change="Bulan Ini +1%"
            changeType="negative"
          >
            <SimpleLineChart data={latenessData} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
