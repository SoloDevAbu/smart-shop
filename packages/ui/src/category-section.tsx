import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: '/categories/electronics.jpg',
    itemCount: 1250
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: '/categories/fashion.jpg',
    itemCount: 2340
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: '/categories/home.jpg',
    itemCount: 1890
  },
  {
    id: 'books',
    name: 'Books',
    image: '/categories/books.jpg',
    itemCount: 3420
  }
];

export const CategorySection = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/category/${category.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.itemCount.toLocaleString()} items</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};