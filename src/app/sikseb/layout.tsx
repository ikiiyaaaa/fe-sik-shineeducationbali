import AdminLayout from '@/components/ui-admin/AdminLayout';

export default function SiksebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
