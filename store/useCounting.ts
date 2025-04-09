import { create } from 'zustand';

// Store for remaining time
export type remainTime = {
    timeRemaining: number;
    setTimeRemaining: (timeRemaining: number | ((prevTime: number) => number)) => void;
}

export const useRemainTime = create<remainTime>((set) => ({
    timeRemaining: 0,
    setTimeRemaining: (timeRemaining) => {
        if (typeof timeRemaining === 'function') {
            set((state) => ({
                timeRemaining: (timeRemaining as (prevTime: number) => number)(state.timeRemaining)
            }));
        } else {
            set({ timeRemaining });
        }
    },
})); 