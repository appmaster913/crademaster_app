import { create } from "zustand";

export interface TableRow {
  time: number;  // Remove null since we always provide a time in generateRandomRow
  status: string;
  exchange: string;
  level: number;
  leverage: number;
  mode: string;
  quantity: number;
  roi: number;
  profitAndLoss: number;
  margin: number;
  currentPrice: number;
  averagePrice: number;
  evaluationAmount: number;
}

interface StatusTableState {
  rows: TableRow[];
  addRow: (row: TableRow) => void;
  setRows: (rows: TableRow[]) => void;
  clearRows: () => void;
}

export const useStatusTableStore = create<StatusTableState>((set) => ({
  rows: [],
  addRow: (row) => set((state) => ({ rows: [row, ...state.rows] })),
  setRows: (rows) => set({ rows }), // Simplified since we're replacing the entire array
  clearRows: () => set({ rows: [] }),
})); 