import React from "react";
import Container from "../../../container";
import "./FooterAbout.css";

const FooterAbout = () => {
  return (
    <Container bg_color="bg-[#1a1a1a]">
      <div className="mx-[18px] md:mx-8">
        <div className="flex flex-wrap px-[18px] lg:px-[8px] pt-[24px] pb-[36px] text-[#ffff] w-full ">
          <ul className="flex space-x lg:basis-1/2 lg:max-w-1/2 flex-wrap text-[14px] mb-6">
            <li className="mb-3 leading-[20px] pr-[12px]">
              <span className="affect_text">Právní informace</span>
            </li>
            <li className="border-l border-[#ffff] px-3 max-h-[40px] sm:max-h-[20px] mb-3">
              <span className="affect_text">Obchodni podminky</span>
            </li>
            <li className="border-l border-[#ffff] px-3 max-h-[40px] sm:max-h-[20px] mb-3">
              <span className="affect_text">Zásady ochrany soukromí</span>
            </li>
            <li className="border-l border-[#ffff] px-3 max-h-[40px] sm:max-h-[20px] mb-3">
              <span className="affect_text">Tech blog</span>
            </li>
            <li className="border-l border-[#ffff] px-3 max-h-[40px] sm:max-h-[20px] mb-3">
              <span className="affect_text">Nastavení dat</span>
            </li>
          </ul>
          <div className="text-[14px] flex flex-wrap lg:basis-1/2 lg:max-w-1/2  w-full">
            <div className="basis-full max-w-full md:basis-1/2 md:max-w-1/2 pb-6 ">
              <p className="pb-[16px]">Aplikace Zalando:</p>
              <div className="flex flex-wrap">
                <div className="h-[40px] mb-[8px] mr-2 shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src="Skeleton-img.png"
                    lazy-src="https://helpdesk.jcu.cz/sluzby/studuju-mobilni-aplikace/appstore/image"
                    alt="downloadAppstore"
                  />
                </div>
                <div className="h-[40px] mb-[8px] shrink-0">
                  <img
                    className="h-full w-full object-cover"
                    src="Skeleton-img.png"
                    lazy-src="https://www.vylety-zabava.cz/images/Ikony/GooglePlay.png"
                    alt="downloadGooglePlay"
                  />
                </div>
              </div>
            </div>
            <div className="basis-full max-w-full md:basis-1/2 md:max-w-1/2 pb-6 ">
              <p className="mb-[16px]">Můžete nás také najít na</p>
              <ul className="flex flex-wrap ">
                <a href="https://www.facebook.com/zalando.cz/">
                  <li className="h-[40px] w-[40px] mr-2 mb-2 shrink-0 ">
                    <img
                      className="h-full w-full object-cover"
                      src="Skeleton-img.png"
                      lazy-src="https://e7.pngegg.com/pngimages/178/852/png-clipart-computer-icons-facebook-f8-lsx-world-congress-usa-2018-like-button-facebook-logo-monochrome.png"
                      alt="facebook"
                    />
                  </li>
                </a>
                <a
                  href="
                  https://www.instagram.com/zalando/
                  "
                >
                  <li className="h-[40px] w-[40px] mr-2 mb-2 shrink-0">
                    <img
                      className="h-full w-full object-cover"
                      src="Skeleton-img.png"
                      lazy-src="https://image.similarpng.com/very-thumbnail/2020/07/Instagram-black-and-white-logo-Premium-vector-PNG-.png"
                      alt="instagram"
                    />
                  </li>
                </a>
                <a href="https://twitter.com/zalando">
                  <li className="h-[40px] w-[40px] mr-2 mb-2 shrink-0">
                    <img
                      className="h-full w-full object-cover"
                      src="Skeleton-img.png"
                      lazy-src="https://toppng.com/uploads/preview/twitter-logo-black-11549680426ohdamjlf5z.png"
                      alt="twitter"
                    />
                  </li>
                </a>
                <a
                  href="https://cz.pinterest.com/zalandocz/
                  "
                >
                  <li className="h-[40px] w-[40px] mb-2 shrink-0">
                    <img
                      className="h-full w-full object-cover"
                      src="Skeleton-img.png"
                      lazy-src="https://www.citypng.com/public/uploads/preview/-11594987359wsqhsnkcge.png"
                      alt="pinterest"
                    />
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FooterAbout;
