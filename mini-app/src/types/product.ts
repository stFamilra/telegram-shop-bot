// src/types/product.ts

export interface Product {
  id: string;
  brand: "Stone Island" | "C.P. Company" | string; // можно расширить
  name: string;
  category: "HOODIE" | "SWEATER" | "ZIP 1/4" | "JACKET";
  price: number;
  oldPrice?: number; // старая цена (если есть скидка)
  condition: string; // 'NEW!', '9/10', '8.5/10' и т.д.
  sizes: string[]; // ['M', 'L', 'XL']
  image?: string; // ссылка на картинку (пока оставим пустым)
}

// Тип для элемента корзины (товар + количество)
export interface CartItem {
  product: Product;
  quantity: number;
}
