import { create } from 'zustand';

export type TimeState = {
  time: number | null;
  setTimeState: (time: number) => void;
}

export const useTimeState = create<TimeState>((set) => ({
  time: null,
  setTimeState: (time) => set({ time }),
})); 