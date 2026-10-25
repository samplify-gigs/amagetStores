import StoreDashboard from "@/components/inventory/storedashboard";
import { mockProducts, mockStats } from "@/components/inventory/mock";

export const metadata = { title: "Inventory" };

// Preview each view with:
//   /dashboard                       Available products
//   /dashboard?tab=manage            Manage products (Add mode)
//   /dashboard?tab=manage&mode=edit  Manage products (Edit mode)
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; mode?: string }>;
}) {
  const { tab, mode } = await searchParams;
  const isManage = tab === "manage";

  return (
    <StoreDashboard
      store="Ikeja"
      staffName="Helen"
      stats={mockStats}
      products={mockProducts}
      activeTab={isManage ? "manage" : "available"}
      editingProduct={isManage && mode === "edit" ? mockProducts[0] : undefined}
    />
  );
}
