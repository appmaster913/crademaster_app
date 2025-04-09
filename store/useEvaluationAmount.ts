import { create } from 'zustand';

interface EvaluationState {
  evaluation: number;
  setEvaluation: (amount: number) => void;
}

export const useEvaluationAmount = create<EvaluationState>((set) => ({
  evaluation: 0,
  setEvaluation: (amount) => set({ evaluation: amount }),
})); 