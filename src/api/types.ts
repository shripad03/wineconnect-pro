
export interface IWine {
  id: string;
  name: string;
  wineryId: string;
  winery: string;
  type: 'Red' | 'White' | 'Rosé' | 'Sparkling';
  varietal: string;
  description: string;
  price: number;
  minOrderQuantity: number;
  rating: number;
  year: number;
  country: string;
  region: string;
  available: boolean;
  stockQuantity: number;
  imageUrl: string;
}

export interface IWinery {
  id: string;
  name: string;
  description: string;
  established: number;
  location: {
    region: string;
    country: string;
  };
  logoUrl: string;
  coverImageUrl: string;
  featured: boolean;
  rating: number;
}

export interface IUser {
  id: string;
  email: string;
  password: string; // This would be hashed on the server
  name: string;
  company: string;
  role: 'buyer' | 'seller' | 'admin';
  country: string;
  createdAt: Date;
}

export interface IOrder {
  id: string;
  userId: string;
  items: Array<{
    wineId: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  paymentInfo: {
    method: 'stripe' | 'razorpay' | 'bank_transfer';
    status: 'pending' | 'paid' | 'failed';
    transactionId?: string;
  };
}
