import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  userId: string;
  activePage: string;
}

export const Sidebar = ({ userId, activePage }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '/dashboard-icons/overview.svg',
      href: `/dashboard/${userId}`
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: '/dashboard-icons/orders.svg',
      href: `/dashboard/${userId}/orders`
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: '/cart.svg',
      href: `/cart/user/${userId}`
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '/profile.svg',
      href: `/dashboard/${userId}/profile`
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '/dashboard-icons/settings.svg',
      href: `/dashboard/${userId}/settings`
    }
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-blue-600 text-white rounded-full p-1 shadow-lg hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="py-6">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center px-4 py-3 mb-2 transition-colors ${
              activePage === item.id
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            <div className="w-8 h-8 relative">
              <Image
                src={item.icon}
                alt={item.label}
                fill
                className="object-contain"
              />
            </div>
            {!isCollapsed && (
              <span className="ml-3 font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
};