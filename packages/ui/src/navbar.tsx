'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  isLoggedIn?: boolean;
  cartCount?: number;
  userId?: string;
}

export const Navbar = ({ isLoggedIn = false, cartCount = 0, userId = "u1" }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'books', name: 'Books' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md dark:bg-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold dark:text-white">SmartShop</span>
        </Link>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="flex">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-r rounded-l-md dark:bg-gray-700 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border-l-0 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href={`/cart/user/${userId}`} className="relative">
            <Image src="/cart.svg" alt="Cart" width={24} height={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Image
                src="/profile.svg"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          ) : (
            <Link href="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};