import { create } from "zustand";

export interface OrderItem {
    id: string | number;
    itemNo: number;
    itemName: string;
    supplyUnit: string;
    quantity: number;
    price: number;
    convertStock: number;
}

interface ItemOrderStoreState {
    itemOrders: OrderItem[];
    addItemOrder: (itemOrder: OrderItem) => void;
    removeItemOrder: (id: string | number) => void;
}

export const useItemOrderStore = create<ItemOrderStoreState>((set) => ({
    itemOrders: [],
    addItemOrder: (itemOrder) => set((state) => {
        const existing = state.itemOrders.find(order => order.id === itemOrder.id);
        if (existing) {
            return { itemOrders: state.itemOrders.map(order => order.id === itemOrder.id ? { ...order, quantity: order.quantity + itemOrder.quantity } : order) };
        }
        return { itemOrders: [...state.itemOrders, itemOrder] };
    }),
    removeItemOrder: (id) => set((state) => ({ itemOrders: state.itemOrders.filter(order => order.id !== id) })),
}));