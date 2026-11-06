import DashboardHeader from "./DashboardHeader";
import { BottomNav, Sidebar, type TabKey } from "./DashboardNav";
import LocationPill from "./LocationPill";
import ManageProductTab from "./ManageProductTabs";
import ProductsTab from "./productsTab";
import type { Product, StoreName, mockStats } from "./mock";

type StoreDashboardProps = {
  store: StoreName;
  staffName: string;
  stats: typeof mockStats;
  products: Product[];
  activeTab: TabKey;
  /** Pass a product to show the form in Edit mode; leave out for Add mode. */
  editingProduct?: Product;
};

// One dashboard for every store: change the props, not the component.
export default function StoreDashboard({
  store,
  staffName,
  stats,
  products,
  activeTab,
  editingProduct,
}: StoreDashboardProps) {
  return (
    <div className="min-h-dvh bg-background lg:pl-64">
      {/** sidebar for lg  */}
      <Sidebar store={store} staffName={staffName} active={activeTab} />
      {/*header for mobile and tablet */}
      <DashboardHeader store={store} staffName={staffName} />

      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 pb-28 sm:px-6 lg:px-8 lg:pb-10">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-foreground/70">
            Hello,{" "}
            <span className="font-semibold text-foreground">{staffName}</span>{" "}
            👋
          </p>
          <LocationPill store={store} className="hidden lg:inline-flex" />
        </div>

        {activeTab === "available" ? (
          <ProductsTab products={products} store={store} stats={stats} />
        ) : (
          <ManageProductTab
            store={store}
            products={editingProduct ? [editingProduct] : []}
          />
        )}
      </main>

      <BottomNav active={activeTab} />
    </div>
  );
}
