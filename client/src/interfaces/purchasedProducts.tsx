export interface IPurchasedProducts {
  //   _id: any;

  id: number;
  size: string;
}

export interface IAllPurchasedProducts {
  //   _id: any;

  data: {
    id: number;
    size: string;
  }[];
  methodPayment: string;
}
