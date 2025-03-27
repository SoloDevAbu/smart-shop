'use client';

import { Navbar, CategorySection, ProductCard, Footer } from "@repo/ui";
import { featuredProducts } from "./data/products";
import { useStore } from "./store/store";
import Image from "next/image";

export default function Home() {
  const { currentUser } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        cartCount={currentUser.cart.length}
        userId={currentUser.id}
      />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <Image
          src="/hero-banner.jpg"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Shop the latest trends and find your perfect items at unbeatable prices.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection />

      {/* Featured Products Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to our Newsletter
            </h2>
            <p className="text-blue-100 mb-8">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-full focus:outline-none"
              />
              <button className="bg-gray-900 text-white px-6 py-2 rounded-r-full hover:bg-gray-800 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
