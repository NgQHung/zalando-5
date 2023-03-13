import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Products } from "../../../../interfaces/Products";
import { ImgToHttp } from "../../../../utils/imageToHTTP";
import "./Card.css";

interface ICard {
  children: JSX.Element;
  data: Products;
  onClick: (id: number) => void;
  favoriteHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Card = ({ children, data, favoriteHandler }: ICard) => {
  const [onHover, setOnHover] = React.useState(false);

  const onMouseHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnHover(true);
  };

  const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOnHover(false);
  };

  return (
    <div
      onMouseEnter={onMouseHandler}
      onMouseLeave={onMouseLeaveHandler}
      className="relative pt-6 pb-3 basis-1/2 max-w-1/2 sm:basis-1/3 sm:max-w-1/3 px-2 cursor-pointer"
    >
      <Link to={`/${data.name}`} className="min-w-[135px] max-w-[303px] lg:max-w-[288px] lg:min-w-[224px]">
        <div className="relative w-full">
          <img src="Skeleton-img.png" lazy-src={ImgToHttp(data?.imageUrl)} alt="" className="w-full object-cover" />
          <div className={"space-x-1 new_hidden " + (onHover ? "new" : "")}>
            <span className="p-1 text-[12px] font-[700] bg-[#ffff]">Hot Drop</span>
            <span className="p-1 text-[12px] font-[700] bg-[#ffff]">Novinka</span>
          </div>
          <div className={"variants_hidden " + (onHover ? "variants" : "")}>
            <span className="text-[14px] leading-5">K dispozici v několika velikostech</span>
          </div>
        </div>
        {children}
      </Link>
      <div datatype={data.name} onClick={favoriteHandler}>
        <FontAwesomeIcon
          icon={faHeart}
          className={
            "absolute top-0 right-0 h-6 mt-8 mr-2 p-2 bg-[#ffff] " +
            (data?.isFavorite === true ? "favorite_added-active" : "")
          }
        />
      </div>
    </div>
  );
};

export default Card;
