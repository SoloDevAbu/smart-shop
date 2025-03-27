'use client';

import { Navbar, ProductCard, Footer, Breadcrumb } from "@repo/ui";
import { useStore } from "../../store/store";
import { categories } from "../../data/categories";
import { notFound } from "next/navigation";
import { use } from "react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const { getProductsInCategory, isCategoryValid, currentUser } = useStore();
  
  if (!isCategoryValid(resolvedParams.category)) {
    notFound();
  }

  const categoryProducts = getProductsInCategory(resolvedParams.category);
  const categoryInfo = categories.find(c => c.id === resolvedParams.category);

  const breadcrumbItems = [
    {
      label: categoryInfo?.name || resolvedParams.category,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        cartCount={currentUser.cart.length}
        userId={currentUser.id}
      />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {categoryInfo?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {categoryInfo?.itemCount.toLocaleString()} items available
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {categoryProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}