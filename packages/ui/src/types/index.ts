export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export const categories: Category[] = [
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