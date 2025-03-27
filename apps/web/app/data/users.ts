interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  orders: Order[];
  cart: CartItem[];
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: OrderItem[];
  total: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

export const users: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    orders: [
      {
        id: "o1",
        date: "2024-03-15",
        status: "delivered",
        items: [
          { productId: "1", quantity: 1, price: 299.99 },
          { productId: "4", quantity: 2, price: 199.99 }
        ],
        total: 699.97
      }
    ],
    cart: [
      { productId: "2", quantity: 1 },
      { productId: "5", quantity: 2 }
    ]
  }
];

export type { User, Order, OrderItem, CartItem };