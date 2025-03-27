'use client';

import { Navbar, Footer, Breadcrumb, Toast } from "@repo/ui";
import { featuredProducts } from "../../../data/products";
import { useStore } from "../../../store/store";
import { categories } from "../../../data/categories";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState, use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ category: string; productId: string }>;
}) {
  const resolvedParams = use(params);
  const product = featuredProducts.find((p) => p.id === resolvedParams.productId);
  const categoryInfo = categories.find(c => c.id === resolvedParams.category);
  
  if (!product || product.category !== resolvedParams.category) {
    notFound();
  }

  const { addToCart, currentUser, operationStatus, clearError } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount) 
    : product.price;

  const isInCart = currentUser.cart.some(item => item.productId === product.id);
  const fallbackImage = '/products/placeholder.svg';

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
  };

  const breadcrumbItems = [
    {
      label: categoryInfo?.name || resolvedParams.category,
      href: `/category/${resolvedParams.category}`
    },
    {
      label: product.name
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square relative rounded-lg overflow-hidden bg-white">
              <Image
                src={imageError ? fallbackImage : product.image}
                alt={product.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} out of 5
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-green-600 font-semibold">
                    Save {(product.discount * 100).toFixed(0)}%
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-gray-700 dark:text-gray-300">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={operationStatus.loading}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={operationStatus.loading}
                  className={`w-full py-3 px-8 rounded-full font-semibold text-white transition
                    ${isInCart 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                    }
                    ${operationStatus.loading ? 'opacity-75 cursor-not-allowed' : ''}
                  `}
                >
                  {operationStatus.loading 
                    ? 'Adding...' 
                    : isInCart 
                      ? 'Added to Cart' 
                      : 'Add to Cart'
                  }
                </button>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Product Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description || 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {operationStatus.error && (
        <Toast
          message={operationStatus.error}
          type="error"
          onClose={clearError}
        />
      )}

      {isInCart && !operationStatus.loading && !operationStatus.error && (
        <Toast
          message="Product added to cart successfully!"
          type="success"
          onClose={() => {}}
        />
      )}
    </div>
  );
}