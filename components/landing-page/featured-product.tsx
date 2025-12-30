"use cache";
import { ArrowRightIcon, ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCard from "../products/product-card";
import { getFeaturedProducts } from "@/lib/products/product-select";

// const featuredProducts = [
//   {
//     id: 1,
//     name: "ParityKit",
//     description:
//       "Maximize your global revenue with intelligent price localization. Automatically adjust pricing based on purchasing power parity to increase conversions worldwide.",
//     tags: ["SaaS", "Pricing", "Global"],
//     votes: 626,
//     isFeatured: true,
//   },
//   {
//     id: 2,
//     name: "APIHub",
//     description:
//       "Centralized API management platform with real-time monitoring, documentation, and testing tools. Keep all your APIs organized and secure.",
//     tags: ["Developer Tools", "API", "Infrastructure"],
//     votes: 445,
//     isFeatured: true,
//   },
//   {
//     id: 3,
//     name: "ProofyBubble",
//     description:
//       "Boost your website conversions with real-time social proof notifications. Show recent purchases, sign-ups, and user activity to build trust and credibility.",
//     tags: ["Marketing", "SaaS", "Conversion"],
//     votes: 540,
//     isFeatured: true,
//   },
//   {
//     id: 4,
//     name: "CodeSnap",
//     description:
//       "Create stunning code screenshots with customizable themes, syntax highlighting, and export options. Perfect for documentation and social media.",
//     tags: ["Developer Tools", "Design"],
//     votes: 45,
//     isFeatured: false,
//   },
//   {
//     id: 5,
//     name: "TaskFlow Pro",
//     description:
//       "Streamline your team's workflow with intelligent task management, automated notifications, and real-time collaboration features.",
//     tags: ["Productivity", "SaaS", "Collaboration"],
//     votes: 25,
//     isFeatured: false,
//   },
// ];

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Featured Today"
            icon={StarIcon}
            description="Top picks from our community this week"
          />
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/explore">
              View All
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
