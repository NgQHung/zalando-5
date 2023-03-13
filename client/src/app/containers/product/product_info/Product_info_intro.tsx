import React from "react";
import { ProductDetail } from "../../../../interfaces/ProductDetail";

interface IProps {
  selectedProduct: ProductDetail;
}

const Product_info_intro = ({ selectedProduct }: IProps) => {
  return (
    <div className="product_content">
      <p className="text-[28px] text_tiempos  ">{selectedProduct?.brand?.name}</p>
      <p className="text-[28px] font-[600] mt-2">{selectedProduct?.name}</p>
      <p className="text-[22px] mt-2">{selectedProduct?.price?.current?.text}</p>
      <p className="mt-9">
        Barva: <span className="font-[700] mb-2 ">blue denim</span>
      </p>
    </div>
  );
};

export default Product_info_intro;
