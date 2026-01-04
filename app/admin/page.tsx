import SectionHeader from "@/components/common/section-header";
import StatsCard from "@/components/admin/stats-card";
import { getAllProducts } from "@/lib/products/product-select";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { InboxIcon, ShieldIcon } from "lucide-react";
import { redirect } from "next/navigation";
import EmptyState from "@/components/common/empty-state";
import AdminProductCard from "@/components/admin/admin-prodict-card";

const AdminPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const response = await clerkClient();
  const user = await response.users.getUser(userId!);

  const metadata = user.publicMetadata;
  const isAdmin = metadata?.isAdmin ?? false;

  if (!isAdmin) {
    redirect("/");
  }

  const allProducts = await getAllProducts();
  const approvedProducts = allProducts.filter(
    (product) => product.status === "approved"
  );
  const pendingProducts = allProducts.filter(
    (product) => product.status === "pending"
  );
  const rejectedProducts = allProducts.filter(
    (product) => product.status === "rejected"
  );

  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Product Admin"
            icon={ShieldIcon}
            description="Review and manage submitted products"
          />
        </div>
        <StatsCard
          approved={approvedProducts.length}
          pending={pendingProducts.length}
          rejected={rejectedProducts.length}
          all={allProducts.length}
        />

        <section className="my-12">
          <div className="section-header-with-count">
            <h2 className="text-2xl font-bold">
              Pending Products ({pendingProducts.length})
            </h2>
          </div>
          <div className="space-y-4">
            {pendingProducts.length === 0 && (
              <EmptyState
                message="No pending products to review"
                icon={InboxIcon}
              />
            )}
            {pendingProducts.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="my-12">
          <div className="section-header-with-count">
            <h2 className="text-2xl font-bold">All Products</h2>
          </div>
          <div className="space-y-4">
            {allProducts.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
