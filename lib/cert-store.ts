import { create } from "zustand";

interface State {
  isModalOpen: boolean;
  formData: {
    name: string;
    description: string;
    due: string | null;
  };
}

interface Actions {
  openModal: () => void;
  closeModal: () => void;
  setFormData: (x: { name: string; description: string; due: string }) => void;
  clearFormData: () => void;
}

const useCertStore = create<State | Actions>((set) => ({
  isModalOpen: false,
  formData: {
    name: "",
    description: "",
    due: null,
  },
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setFormData: (data) => set({ formData: data }),
  clearFormData: () =>
    set({ formData: { name: "", description: "", due: null } }),
}));

export default useCertStore;
