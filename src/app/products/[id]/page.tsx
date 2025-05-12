import ProductDetails from "@/components/ProductDetails";
import { getProductByIdService } from "@/services/ProductService";

import { notFound } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  if (!id) notFound();
  const product = await getProductByIdService(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
};

export default page;
