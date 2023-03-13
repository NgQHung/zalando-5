import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, memo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { Products } from "../../../../interfaces/Products";
import { productActions } from "../../../../stores/product-slice";
import { ImgToHttp } from "../../../../utils/imageToHTTP";
import ready from "../../../../utils/intersectionObserver";
import ErrorFallback from "../../../components/ErrorBoundary";
// import Loader from "../../../components/UI/loader/Loader";
import Loading from "../../../components/UI/loader/Loading";
import { useAppDispatch, useAppSelector } from "../../../hooks";

type IProps = {
  selectedProductHandler: (id: number) => void;
};

const Sliding_products = ({ selectedProductHandler }: IProps) => {
  const products_1: Products[] = useAppSelector((state) => state.productSlice.products_1);

  const dispatch = useAppDispatch();

  const clickedProduct = (data: any) => {
    const { name, price, brand } = data;
    dispatch(productActions.selectedProductHandler({ name: name, price: price, brand: brand }));
  };
  return (
    <Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense
          fallback={
            <>
              <Loading />
              {React.useEffect(() => {
                let subscribe = true;
                if (subscribe) {
                  ready();
                }
                return () => {
                  subscribe = false;
                };
              })}
            </>
          }
        ></Suspense>
      </ErrorBoundary>
      <section className="mt-9 pt-[36px] pb-[24px] text-[14px] row-full ">
        <ul className=" flex relative overflow-x-auto scrollbar_hide ">
          {products_1?.map((item, idx) => (
            <Link
              onClick={() => selectedProductHandler(item.id)}
              key={idx}
              to={`/${item.name}`}
              className="first:ml-[25.4px]"
            >
              <li
                onClick={() => clickedProduct(item)}
                className=" relative min-w-[157px] max-w-[340px] sm:min-w-[344px] md:min-w-[304px] px-[8px]  cursor-pointer"
              >
                <div className="relative">
                  <img
                    className="h-full w-full object-cover "
                    src="Skeleton-img.png"
                    lazy-src={ImgToHttp(item?.imageUrl)}
                    alt="product"
                  />
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={"fa-thin p-[8px] text-[24px] absolute bg-[#ffff] top-2 right-0 "}
                  />
                </div>
                <div className=" leading-[20px] pt-2">
                  <div className="pb-[8px]">
                    <h3 className="text_tiempos text-[16px]  font-[400]">{item.brandName}</h3>
                    <h3>{item.name}</h3>
                  </div>
                  <div className="flex flex-col leading-[1.25rem] text-[700]">
                    <span>{item?.price?.previous?.text}</span>
                    <div className="text-[12px] leading-[16px]"></div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="p-2 text-[24px] absolute cursor-pointer bg-[#ffff] right-0 top-1/2 translate-y-[-50%]"
        />
      </section>
    </Fragment>
  );
};

export default memo(Sliding_products);
