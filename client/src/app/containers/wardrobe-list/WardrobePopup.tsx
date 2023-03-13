import { faChevronLeft, faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../../../interfaces/Products";
// import { ProductDetail } from "../../../interfaces/ProductDetail";
// import { cartActions } from "../../../stores/cart-slice";
import { ImgToHttp } from "../../../utils/imageToHTTP";
import Overlay from "../../components/UI/overlay/Overlay";
import { data_sizes } from "../../pages/wardrobe-list/data";

interface Iprop {
  removeFavoriteHandler: (id: number) => void;
  refInput: React.MutableRefObject<any>;
  optionPopup: boolean;
  setOptionPopup: (state: boolean) => void;
  selectedFavorite: Products;
  setSelectSize: (state: boolean) => void;
  selectSize: boolean;
  setSelectedSize: (size: string) => void;
}

const WardrobePopup = ({
  removeFavoriteHandler,
  refInput,
  optionPopup,
  setOptionPopup,
  selectedFavorite,
  setSelectSize,
  selectSize,
  setSelectedSize,
}: Iprop) => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block ">
      <Overlay optionPopup={optionPopup} />

      <Modal
        open={optionPopup}
        onClose={() => setOptionPopup(false)}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={optionPopup}>
          <Box className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] lg:max-w-[1216px] w-full shadow pt-2 px-4 pb-3 ">
            <div ref={refInput} className={"flex flex-col  optionPopup " + (optionPopup ? "optionPopup-active" : "")}>
              <button className="p-4 text-right self-end ">
                <FontAwesomeIcon onClick={() => setOptionPopup(false)} className="h-6 w-6 " icon={faXmark} />
              </button>
              <div className="flex w-full">
                <div className="basis-[40%] min-w-[480px] max-h-[420px] min-h-[330px] max-w-[606px]">
                  <img
                    className="h-full w-full object-cover pb-8 pl-8"
                    src={ImgToHttp(selectedFavorite?.imageUrl)}
                    alt=""
                  />
                </div>
                <div className="basis-[60%]">
                  {selectSize ? (
                    <>
                      <div className=" option_title p-6 text-[24px] leading-[28px] font-[600] tracking-[-0.24px] whitespace-nowrap">
                        <button onClick={() => setSelectSize(false)} className="h-6 w-6 text-center">
                          <FontAwesomeIcon className="mr-3 h-full object-cover" icon={faChevronLeft} />
                        </button>
                        <span>Zvolte velikost</span>
                      </div>
                      <div className="flex flex-col">
                        {data_sizes.map((size, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedSize(size)}
                            className="p-4 grow flex justify-between border-y border-[#dddd] hover:bg-[#f0f0f0]"
                          >
                            <span>{size}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="option_title p-6 text-[24px] leading-[28px] font-[600] tracking-[-0.24px] whitespace-nowrap">
                        LOOSE FIT - Jednoduché triko - light blue
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={() => setSelectSize(true)}
                          className="p-4 grow flex justify-between border-y border-[#dddd] hover:bg-[#f0f0f0]"
                        >
                          <span>Zvolte velikost</span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        <button
                          onClick={() => navigate("/clothes")}
                          className="p-4 grow flex justify-between border-y border-[#dddd] hover:bg-[#f0f0f0]"
                        >
                          <span>Zobrazit podobné předměty</span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        <button
                          onClick={() => removeFavoriteHandler(selectedFavorite.id)}
                          className="p-4 grow flex justify-between border-y border-[#dddd] hover:bg-[#f0f0f0]"
                        >
                          <span className="text-[red]">Odstranit</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* <ChildModal /> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default memo(WardrobePopup);
