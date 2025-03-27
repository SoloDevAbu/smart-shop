'use client';

import { Navbar, Footer, Sidebar } from "@repo/ui";
import { useStore } from "../../store/store";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const resolvedParams = use(params);
  const { currentUser, getCartTotal } = useStore();
  
  // Later this will check against backend data
  if (currentUser.id !== resolvedParams.userId) {
    notFound();
  }

  const cartTotal = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        cartCount={currentUser.cart.length}
        userId={currentUser.id}
        isLoggedIn={true}
      />
      
      <Sidebar userId={currentUser.id} activePage="overview" />
      
      <main className="pt-24 pb-12 px-4 ml-64"> {/* Space for sidebar */}
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                Total Orders
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentUser.orders.length}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                Cart Items
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentUser.cart.length}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
                Cart Total
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${cartTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <Link
                href={`/dashboard/${currentUser.id}/orders`}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {currentUser.orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="border dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm capitalize
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right text-gray-900 dark:text-white font-semibold">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              ))}

              {currentUser.orders.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No orders yet
                </p>
              )}
            </div>
          </div>

          {/* Profile Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentUser.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentUser.email}
                </p>
              </div>
            </div>
            <Link
              href={`/dashboard/${currentUser.id}/profile`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}