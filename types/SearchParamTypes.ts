type Params = {
  id: string;
};

type AddCartType = {
  cartId: null;
  description: null;
  id: string;
  name: string;
  image: string;
  cartItemID: null;
  quantity: number;
  unit_amount: number | null;
};
type OrderType = {
  amount: string;
  createdDate: string;
  currency: string;
  id: string;
  paymentIntentID: string;
  products: AddCartType[];
  status: string;
  userId: string;
};

type SearchParams = {
  name: string;
  unit_amount: number;
  image: string;
  cartItemID: string;
  description: string | null;
  features: string;
};

export type SearchParamTypes = {
  params: Params;
  searchParams: SearchParams;
};

export type SearchOrderTypes = {
  params: Params;
  searchParams: OrderType;
};
