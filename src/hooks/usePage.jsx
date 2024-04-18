import { create } from "zustand";

const usePage = create((set) => ({
  reset: false,

  resetPage: () => set({ reset: true }),
  setResetFalse: () => set({ reset: false }),
}));

export default usePage;
