export interface Karyawan {
  id: number;
  user_id: number;
  nama: string;
  alamat: string;
  tgl_lahir: string; // Format: YYYY-MM-DD
  no_hp: string;
  status_karyawan: 'Aktif' | 'Tidak Aktif';
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface KaryawanWithUser extends Karyawan {
  user: {
    id: number;
    name: string;
    email: string;
    status: 'Aktif' | 'Tidak Aktif';
    roles: string[];
  };
}

// Form data untuk create/update karyawan
export interface KaryawanFormData {
  user_id: number;
  nama: string;
  alamat: string;
  tgl_lahir: string;
  no_hp: string;
  status_karyawan: 'Aktif' | 'Tidak Aktif';
}

// API response untuk list karyawan
export interface KaryawanListResponse {
  data: KaryawanWithUser[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// API response untuk single karyawan
export interface KaryawanResponse {
  data: KaryawanWithUser;
  message: string;
}

// Status karyawan enum untuk type safety
export type StatusKaryawan = 'Aktif' | 'Tidak Aktif';

// Helper function untuk format tanggal lahir
export function formatTanggalLahir(tgl_lahir: string): string {
  const date = new Date(tgl_lahir);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function untuk format nomor HP
export function formatNoHp(no_hp: string): string {
  // Remove non-digit characters
  const cleaned = no_hp.replace(/\D/g, '');
  
  // Format as Indonesian phone number
  if (cleaned.startsWith('62')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+62${cleaned.substring(1)}`;
  } else {
    return `+62${cleaned}`;
  }
}
