import { create } from "zustand";
import type { OrderRow } from "../types/OrderRow";

interface SalesOrderState {
    storeNo: number | null;
    storeName: string;
    orderRows: OrderRow[];

    setStore: (storeNo: number, storeName: string) => void;
    addOrderRow: (row: OrderRow) => void;
    updateQuantity: (rowId: string, quantity: number) => void;
    removeOrderRow: (rowId: string) => void;
    reset: () => void;
}

export const useSalesOrderStore = create<SalesOrderState>((set) => ({
    storeNo: null,
    storeName: "",
    orderRows: [],

    setStore: (storeNo, storeName) =>
        set({
            storeNo,
            storeName,
        }),

    addOrderRow: (row) =>
        set((state) => ({
            orderRows: [...state.orderRows, row],
        })),

    updateQuantity: (rowId, quantity) =>
        set((state) => ({
            orderRows: state.orderRows.map((row) =>
                row.rowId === rowId
                    ? {
                        ...row,
                        quantity,
                        totalPrice: row.unitPrice * quantity,
                    }
                    : row
            ),
        })),

    removeOrderRow: (rowId) =>
        set((state) => ({
            orderRows: state.orderRows.filter(
                (row) => row.rowId !== rowId
            ),
        })),

    reset: () =>
        set({
            storeNo: null,
            storeName: "",
            orderRows: [],
        }),
}));
