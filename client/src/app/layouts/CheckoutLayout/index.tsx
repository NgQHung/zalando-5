import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../../components/UI/progressBar/ProgressBar-stepper";
import Wrapper from "../../components/UI/wrapper/wrapper";
// import Banner from "../components/banner";
// import Favorite from "../components/favorite_brand_category";
// import Footer from "../components/footer";
// import Header from "../components/header";
// import Navbar from "../mobile/Navbar";

interface IProps {
  children: React.ReactNode;
}

const CheckoutLayout = ({ children }: IProps) => {
  return (
    <Fragment>
      <div className="flex flex-col justify-between ">
        <Wrapper className="header bg-[#6F6F6F] ">
          <Link to="/">
            <img
              className=" w-auto object-cover h-[48px] "
              src="data:image/png;base64,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"
              alt="logo"
            />
          </Link>
        </Wrapper>
        <div className="lg:max-w-[1176px] md:max-w-[936px] sm:max-w-[576px] relative left-1/2 translate-x-[-50%]">
          <ProgressBar />
        </div>

        <div className="min-h-[calc(100vh-calc((100px+40px)*2))] lg:max-w-[1176px] md:max-w-[936px] sm:max-w-[576px] relative mx-auto">
          {children}
        </div>
        <div className=" h-[98px] mt-[32px] border-t border-[#1a1a1a] bg-gray-100 text-[14px] leading-[20px] ">
          <div className="relative top-1/2 translate-y-[-50%] mx-auto my-0 flex items-center justify-between lg:max-w-[1216px] px-[24px]">
            <span>Zpět do e-shopu</span>
            <span>Potřebujete pomoc?</span>
            <div className="flex space-x-4">
              <span>Sledování údajů</span>
              <span>Zásady ochrany soukromí</span>
              <span>Obchodní podmínky</span>
              <span>Právní informace</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CheckoutLayout;
