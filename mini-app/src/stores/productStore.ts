import { create } from "zustand";
import type { Product } from "../types";
import { mockProducts } from "../mocks/products";

interface ProductStore {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  filteredProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  selectedCategory: null,
  searchQuery: "",

  setCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  filteredProducts: () => {
    const { products, selectedCategory, searchQuery } = get();
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (searchQuery.trim()) {
      const editedSearchQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(editedSearchQuery),
      );
    }

    return filtered;
  },
}));
