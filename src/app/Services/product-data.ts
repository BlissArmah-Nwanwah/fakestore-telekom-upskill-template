// product.interface.ts

export interface ProductData {
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export interface cartProductData {
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    count?:  number;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  
  