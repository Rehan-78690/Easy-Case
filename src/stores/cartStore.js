import { create } from 'zustand';

const useCartStore = create((set) => ({
    cartId: null,
    cartItems: [],

    // Set cart details locally (used after fetching via React Query)
    setCart: (cartId, cartItems) => set({ cartId, cartItems }),
  

    

    // Add an item locally to the cart state
    // addItemLocally: (newItem) => set((state) => ({
    //     cartItems: [...state.cartItems, newItem],
    // })),

    addItemLocally: (newItem) => set((state) => {
        const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id);

        if (existingItemIndex !== -1) {
            // If the item exists, increase the quantity
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
          
            
            return { cartItems: updatedItems };
        } else {
            return { cartItems: [...state.cartItems, newItem] };
        }
    }),


    // Update an existing cart item locally
    // updateItemLocally: (updatedItem) => set((state) => ({
    //     cartItems: state.cartItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    // })),

    updateItemLocally: (itemId, quantity) => set((state) => ({
        
        cartItems: state.cartItems.map(item =>
            item.id === itemId ? { ...item, quantity } : item
            
        ),
    
        
    })),

    // Remove an item locally from the cart state
    removeItemLocally: (itemId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
}));

export default useCartStore;
