import { create } from 'zustand';
import { CartItem, User, Order } from '../data/users';
import { users } from '../data/users';
import { Product } from '@repo/ui/product-card';
import { featuredProducts } from '../data/products';
import { categories } from '../data/categories';

interface OperationStatus {
  loading: boolean;
  error: string | null;
}

interface StoreState {
  currentUser: User;
  operationStatus: OperationStatus;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  getCartTotal: () => number;
  getProduct: (productId: string) => Product | undefined;
  getProductsInCategory: (categoryId: string) => Product[];
  isCategoryValid: (categoryId: string) => boolean;
  placeOrder: () => Promise<void>;
  clearError: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  currentUser: users[0] || {
    id: "guest",
    name: "Guest User",
    email: "guest@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest",
    orders: [],
    cart: []
  },

  operationStatus: {
    loading: false,
    error: null
  },

  addToCart: async (productId: string, quantity: number) => {
    try {
      set({ operationStatus: { loading: true, error: null } });
      const product = get().getProduct(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      set((state) => {
        const existingItem = state.currentUser.cart.find(
          (item) => item.productId === productId
        );

        if (existingItem) {
          return {
            currentUser: {
              ...state.currentUser,
              cart: state.currentUser.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            },
            operationStatus: { loading: false, error: null }
          };
        }

        return {
          currentUser: {
            ...state.currentUser,
            cart: [...state.currentUser.cart, { productId, quantity }],
          },
          operationStatus: { loading: false, error: null }
        };
      });
    } catch (error) {
      set({ 
        operationStatus: { 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to add item to cart' 
        } 
      });
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      set({ operationStatus: { loading: true, error: null } });
      set((state) => ({
        currentUser: {
          ...state.currentUser,
          cart: state.currentUser.cart.filter((item) => item.productId !== productId),
        },
        operationStatus: { loading: false, error: null }
      }));
    } catch (error) {
      set({ 
        operationStatus: { 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to remove item from cart' 
        } 
      });
    }
  },

  updateCartQuantity: async (productId: string, quantity: number) => {
    try {
      set({ operationStatus: { loading: true, error: null } });
      if (quantity <= 0) {
        await get().removeFromCart(productId);
        return;
      }

      set((state) => ({
        currentUser: {
          ...state.currentUser,
          cart: state.currentUser.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        },
        operationStatus: { loading: false, error: null }
      }));
    } catch (error) {
      set({ 
        operationStatus: { 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to update cart quantity' 
        } 
      });
    }
  },

  getCartTotal: () => {
    const state = get();
    return state.currentUser.cart.reduce((total, item) => {
      const product = featuredProducts.find((p) => p.id === item.productId);
      if (!product) return total;
      
      const price = product.discount 
        ? product.price * (1 - product.discount) 
        : product.price;
        
      return total + price * item.quantity;
    }, 0);
  },

  getProduct: (productId: string) => {
    return featuredProducts.find((p) => p.id === productId);
  },

  getProductsInCategory: (categoryId: string) => {
    return featuredProducts.filter((product) => product.category === categoryId);
  },

  isCategoryValid: (categoryId: string) => {
    return categories.some((category) => category.id === categoryId);
  },

  placeOrder: async () => {
    try {
      set({ operationStatus: { loading: true, error: null } });
      const state = get();
      const cartTotal = get().getCartTotal();

      if (state.currentUser.cart.length === 0) {
        throw new Error('Cart is empty');
      }

      const newOrder: Order = {
        id: `o${state.currentUser.orders.length + 1}`,
        date: new Date().toISOString(),
        status: 'pending',
        items: state.currentUser.cart.map((item) => {
          const product = featuredProducts.find((p) => p.id === item.productId);
          if (!product) throw new Error('Product not found');
          
          const price = product.discount 
            ? product.price * (1 - product.discount) 
            : product.price;
            
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: price
          };
        }),
        total: cartTotal
      };

      set((state) => ({
        currentUser: {
          ...state.currentUser,
          orders: [newOrder, ...state.currentUser.orders],
          cart: [] // Clear the cart
        },
        operationStatus: { loading: false, error: null }
      }));
    } catch (error) {
      set({ 
        operationStatus: { 
          loading: false, 
          error: error instanceof Error ? error.message : 'Failed to place order' 
        } 
      });
    }
  },

  clearError: () => {
    set((state) => ({
      operationStatus: { ...state.operationStatus, error: null }
    }));
  }
}));