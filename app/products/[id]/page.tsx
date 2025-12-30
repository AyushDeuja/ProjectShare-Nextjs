import { getFeaturedProducts } from "@/lib/products/product-select";

export const generateStaticParams = async () => {
  const products = await getFeaturedProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
};

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <div>Product {id}</div>
    </div>
  );
}
