import { CalendarIcon, RocketIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import ProductCard from "../products/product-card";
import EmptyState from "../common/empty-state";

const RecentlyLaunchedProducts = () => {
  const recentlyLaunchedProducts = [
    // {
    //   id: 1,
    //   name: "ParityKit",
    //   description:
    //     "Maximize your global revenue with intelligent price localization. Automatically adjust pricing based on purchasing power parity to increase conversions worldwide.",
    //   tags: ["SaaS", "Pricing", "Global"],
    //   votes: 626,
    //   isFeatured: true,
    // },
    // {
    //   id: 2,
    //   name: "APIHub",
    //   description:
    //     "Centralized API management platform with real-time monitoring, documentation, and testing tools. Keep all your APIs organized and secure.",
    //   tags: ["Developer Tools", "API", "Infrastructure"],
    //   votes: 445,
    //   isFeatured: true,
    // },
  ];
  return (
    <section className="py-20">
      <div className="wrapper space-y-12">
        <SectionHeader
          title="Recently Launched"
          icon={RocketIcon}
          description="Discover the latest products from our community"
        />
        {recentlyLaunchedProducts.length > 0 ? (
          <div className="grid-wrapper">
            {recentlyLaunchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No products launched in the last week. Check back soon for new launches."
            icon={CalendarIcon}
          />
        )}
      </div>
    </section>
  );
};

export default RecentlyLaunchedProducts;
