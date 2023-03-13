import React from "react";
import { Link } from "react-router-dom";

interface Iprops {
  children: JSX.Element;
}

export const FormLayout = ({ children }: Iprops) => {
  return (
    <div>
      <section className="login_section tex-center mx-auto my-0 pb-12 relative ">
        <Link to="/home-page">
          <div className="login_header_logo max-w-[1216px] mx-auto my-0 text-left px-6 pt-4 pb-6 cursor-pointer">
            <img
              className="h-[25px] object-cover leading-[25px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Zalando_logo.svg/2560px-Zalando_logo.svg.png"
              alt="logo"
            />
          </div>
        </Link>
        {children}
        <div className=" p-6 text-center ">
          <p className=" text-[14px] p-4 inline-block ">
            <span className="affect_text">Zásady ochrany soukromí</span>
          </p>
          <p className=" text-[14px] p-4 inline-block">
            <span className="affect_text">Podmínky použití</span>
          </p>
          <p className=" text-[14px] p-4 inline-block">
            <span className="affect_text">Právní informace</span>
          </p>
          <div className="sign_logo pt-4 pb-12 ">
            <img
              className="h-8 object-cover relative left-1/2 translate-x-[-50%] "
              src="https://cdn-images-1.medium.com/max/1200/1*fYAdvwatzBRQ4S6l7rGnTQ.png"
              alt="logo"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormLayout;
