'use client';

import { Navbar, Sidebar } from "@repo/ui";
import { useStore } from "../../../store/store";
import { notFound } from "next/navigation";
import { use } from "react";

export default function OrdersPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  const { currentUser } = useStore();
  
  // Later this will check against backend data
  if (currentUser.id !== resolvedParams.userId) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        cartCount={currentUser.cart.length}
        userId={currentUser.id}
        isLoggedIn={true}
      />
      
      <Sidebar userId={currentUser.id} activePage="orders" />
      
      <main className="pt-24 pb-12 px-4 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
            Order History
          </h1>

          <div className="space-y-6">
            {currentUser.orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      Order #{order.id}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="border-t dark:border-gray-700 -mx-6 px-6 py-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item) => {
                      const product = currentUser.getProduct?.(item.productId);
                      return (
                        <div
                          key={item.productId}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {product?.name || `Product #${item.productId}`}
                            </span>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 -mx-6 px-6 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 dark:text-white font-semibold">
                      Total
                    </span>
                    <span className="text-gray-900 dark:text-white font-semibold text-xl">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {currentUser.orders.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  You haven't placed any orders yet
                </p>
                <a
                  href="/"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Start Shopping
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}