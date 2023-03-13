import { faChevronDown, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProductDetail } from "../../../interfaces/ProductDetail";
import { ImgToHttp } from "../../../utils/imageToHTTP";
import ready from "../../../utils/intersectionObserver";
import ErrorFallback from "../../components/ErrorBoundary";
import Loading from "../../components/UI/loader/Loading";

interface IProps {
  chevronUp: boolean;
  onScrollHandler: () => void;
  scrollRef: React.MutableRefObject<any>;
  isImage: { url: string }[];
  selectedProduct: ProductDetail;
  typeImageHandler: (image: string, index: number) => void;
  chevronDown: boolean;
  imageShow: string;
}

const PRODUCT_IMAGES = ({
  chevronUp,
  onScrollHandler,
  scrollRef,
  isImage,
  selectedProduct,
  typeImageHandler,
  chevronDown,
  imageShow,
}: IProps) => {
  return (
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
      >
        <div className=" basis-full md:sticky md:top-[24px] md:min-w-1/2 md:max-w-1/2 md:basis-1/2 flex md:self-start flex-wrap  ">
          <div className="relative flex flex-row w-full ">
            {chevronUp && (
              <FontAwesomeIcon
                icon={faChevronUp}
                className=" absolute top-0  h-6 p-2 bg-[#ffff] left-[8.333%] z-50 translate-x-[-50%]"
              />
            )}
            <div
              onScroll={onScrollHandler}
              ref={scrollRef}
              className="scrollbar_hide hidden lg:flex flex-col basis-[16.666%] max-w-[16.666%] md:px-2 absolute overflow-y-auto h-full "
            >
              <ul>
                {isImage &&
                  selectedProduct?.media?.images.map((image, idx) => (
                    <li
                      key={idx}
                      onMouseEnter={() => typeImageHandler(image.url, idx)}
                      className="mb-4 hover:outline hover:outline-offset-[-3px] hover:outline-[3px] cursor-pointer"
                    >
                      <img src="Skeleton-img.png" lazy-src={ImgToHttp(image.url)} alt="img" />
                    </li>
                  ))}
              </ul>
            </div>
            {chevronDown && (
              <FontAwesomeIcon
                icon={faChevronDown}
                className="absolute bottom-0 h-6 p-2 bg-[#ffff] left-[8.333%] z-50 translate-x-[-50%] "
              />
            )}

            <div
              className={
                "flex max-w-full basis-full lg:basis-[83.333%] lg:max-w-[83.333%] lg:ml-[16.666%] overflow-x-auto scrollbar_hidden"
              }
            >
              <img
                src="Skeleton-img.png"
                lazy-src={imageShow}
                alt="imgProduct"
                className="hidden lg:inline w-full object-cover"
              />

              <div className="lg:hidden flex ">
                <div className="flex ">
                  {isImage &&
                    selectedProduct?.media?.images.map((image, idx) => (
                      <img
                        key={idx}
                        className="min-w-full h-auto object-cover"
                        src="Skeleton-img.png"
                        lazy-src={ImgToHttp(image.url)}
                        alt="img"
                      />
                    ))}
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="absolute right-0 top-1/2 translate-y-[-50%] bg-[#ffff] h-6 p-2 cursor-pointer"
                />
              </div>

              <div className="absolute p-1 bg-[#ffff] top-[8px] text-[12px] font-[700]">Novinka</div>
            </div>
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default memo(PRODUCT_IMAGES);
