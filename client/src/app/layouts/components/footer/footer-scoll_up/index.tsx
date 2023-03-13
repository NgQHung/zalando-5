import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ScrollUp = () => {
  const [isScrollUp, setIsScrollUp] = React.useState<boolean>(false);

  const scrollToTheTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollHandler = () => {
    if (window.scrollY >= 129) {
      setIsScrollUp(true);
    } else {
      setIsScrollUp(false);
    }
  };
  React.useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
  });

  return (
    <div className="w-full h-[60px] bg-[#ffff] text-right">
      {isScrollUp && (
        <button
          onClick={scrollToTheTop}
          className="bg-[#1a1a1a] z-[1000000] text-[#ffff] text-[12px] px-[16px] py-[8px] mr-[16px] mt-[8px] mb-[20px] cursor-pointer fixed bottom-0 right-0 transition-all "
        >
          <p className="hidden md:inline mr-[8px]">PŘEJÍT NAHORU</p>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </div>
  );
};

export default ScrollUp;
