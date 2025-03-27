import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white">About SmartShop</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/category/electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/category/fashion" className="hover:text-white">Fashion</Link></li>
              <li><Link href="/category/home" className="hover:text-white">Home & Living</Link></li>
              <li><Link href="/category/books" className="hover:text-white">Books</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li><Link href="https://facebook.com" className="hover:text-white">Facebook</Link></li>
              <li><Link href="https://twitter.com" className="hover:text-white">Twitter</Link></li>
              <li><Link href="https://instagram.com" className="hover:text-white">Instagram</Link></li>
              <li><Link href="https://pinterest.com" className="hover:text-white">Pinterest</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {currentYear} SmartShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};