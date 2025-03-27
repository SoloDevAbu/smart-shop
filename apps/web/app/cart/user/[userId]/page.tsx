'use client';

import { Navbar, Footer } from "@repo/ui";
import { featuredProducts } from "../../../data/products";
import { useStore } from "../../../store/store";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function CartPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { currentUser, removeFromCart, updateCartQuantity, getCartTotal, placeOrder } = useStore();
  
  if (currentUser.id !== resolvedParams.userId) {
    notFound();
  }

  const cartItems = currentUser.cart.map(item => {
    const product = featuredProducts.find(p => p.id === item.productId);
    if (!product) return null;
    
    const discountedPrice = product.discount 
      ? product.price * (1 - product.discount) 
      : product.price;
    
    return {
      ...item,
      product,
      totalPrice: discountedPrice * item.quantity
    };
  }).filter(Boolean);

  const subtotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    placeOrder();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        cartCount={currentUser.cart.length}
        userId={currentUser.id}
        isLoggedIn={true}
      />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map(item => item && (
                  <div
                    key={item.product.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex space-x-4"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/category/${item.product.category}/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600"
                      >
                        {item.product.name}
                      </Link>
                      <div className="mt-2 flex items-center space-x-4">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.product.id, Number(e.target.value))}
                          className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                        ${item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your cart is empty
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="border-t dark:border-gray-700 pt-3 flex justify-between font-semibold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}