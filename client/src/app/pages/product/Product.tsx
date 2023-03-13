import React, { Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./Product.css";
import { ImgToHttp } from "../../../utils/imageToHTTP";
import { getDetailProduct } from "../../../services/apiRequest";
import { ErrorBoundary } from "react-error-boundary";

// containers
import ErrorFallback from "../../components/ErrorBoundary";
import Loading from "../../components/UI/loader/Loading";
import { productActions } from "../../../stores/product-slice";
import { Products } from "../../../interfaces/Products";

const PRODUCT_IMAGES = React.lazy(() => import("../../containers/product/Product_Images"));
const Sliding_products = React.lazy(() => import("../../containers/product/sliding_products"));
const Product_info = React.lazy(() => import("../../containers/product/product_info"));

const Product = () => {
  const selectedId = useAppSelector((state) => state.productSlice.selectedId);
  const selectedProduct = useAppSelector((state) => state.productSlice.selectedProduct);
  const allProducts: Products[] = useAppSelector((state) => state.productSlice.allProducts);
  const user = useAppSelector((state) => state.userSlice.user) || JSON.parse(localStorage.getItem("User")!);

  const isImage = selectedProduct?.media?.images!;
  const firstImage = isImage && selectedProduct?.media?.images[0].url!;
  console.log(selectedProduct);

  const dispatch = useAppDispatch();
  const [imageShow, setImageShow] = React.useState<string>("");

  const scrollRef = React.useRef<any>(null);
  const [chevronUp, setChevronUp] = React.useState(false);
  const [chevronDown, setChevronDown] = React.useState(false);

  const typeImageHandler = (image: string, index: number) => {
    setImageShow(ImgToHttp(image));
  };

  const selectedProductHandler = (id: number) => {
    dispatch(productActions.selectedIdHandler(id));
    getDetailProduct(dispatch, id, user);
  };

  const onScrollHandler = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop === 0) {
      setChevronUp(false);
    } else {
      setChevronUp(true);
    }
    if (Math.floor(scrollTop) + clientHeight === scrollHeight) {
      setChevronDown(false);
    } else {
      setChevronDown(true);
    }
  };
  React.useEffect(() => {
    getDetailProduct(dispatch, selectedId, user);
  }, []);

  React.useEffect(() => {
    if (firstImage) {
      setImageShow(ImgToHttp(firstImage));
    } else return;
  }, [firstImage]);

  return (
    <div className=" md:mx-6 w-auto lg:mx-auto lg:my-0 lg:max-w-[1216px] ">
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense
          fallback={
            <>
              <Loading />
              <div className="h-screen" />
            </>
          }
        >
          <div className="flex md:flex-row md:mt-6 flex-wrap md:flex-nowrap">
            {/* images */}
            <PRODUCT_IMAGES
              chevronUp={chevronUp}
              onScrollHandler={onScrollHandler}
              scrollRef={scrollRef}
              isImage={isImage}
              selectedProduct={selectedProduct}
              typeImageHandler={typeImageHandler}
              chevronDown={chevronDown}
              imageShow={imageShow}
            />
            {/* content start */}
            <Product_info selectedProduct={selectedProduct} />
            {/* content end */}
          </div>
          {/* sliding products start */}
          <Sliding_products selectedProductHandler={selectedProductHandler} />
        </Suspense>
      </ErrorBoundary>
      {/* sliding products end */}
    </div>
  );
};

export default Product;
