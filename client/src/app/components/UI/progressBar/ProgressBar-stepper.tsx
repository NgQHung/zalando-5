import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stepper, stepperData } from "./data";

const ProgressBar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState<number>();
  useEffect(() => {
    const step = stepperData.find((item) => item.path === path);
    setStepIndex(step?.step);
  }, [path]);
  return (
    <div className="">
      <div className="p-5  relative mx-auto">
        <div className="mx-4 p-4">
          <div className="flex items-center">
            <div className="flex items-center text-orange-600 relative">
              <div className="rounded-full flex justify-center items-center transition duration-500 ease-in-out h-[30px] w-[30px] py-3 border-2 border-orange-600">
                <FontAwesomeIcon className="h-4 w-4" icon={faCheck} />
              </div>
              <div className="absolute bottom-[-6px] left-0 translate-x-[calc(-50%+16px)] translate-y-[100%] text-center w-32  text-[10px] leading-[11px] font-medium tracking-[0.5px] whitespace-nowrap  text-orange-600 ">
                Přihlasit se
              </div>
            </div>
            {/* <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-orange-600 "></div> */}
            {stepperData.map((item, idx) => (
              <Fragment key={idx}>
                <div
                  className={
                    "flex-auto border-t-2 transition duration-500 ease-in-out " +
                    (item.path === path || item.step < stepIndex! ? "border-orange-600" : "border-gray-300")
                  }
                ></div>
                <div
                  onClick={() => navigate(item.path)}
                  className="flex cursor-pointer items-center text-white relative"
                >
                  <div
                    className={
                      "rounded-full flex justify-center items-center transition duration-500 ease-in-out h-[30px] w-[30px] py-3 border-2 " +
                      (item.path === path || item.step < stepIndex!
                        ? "bg-orange-600 border-orange-600"
                        : "border-gray-300 text-gray-500")
                    }
                  >
                    <span className="text-[12px]">{item.step}</span>
                  </div>
                  <div
                    className={
                      "absolute bottom-[-6px] left-0 translate-x-[calc(-50%+16px)] translate-y-[100%] text-center w-32  text-[10px] leading-[11px] font-medium tracking-[0.5px] whitespace-nowrap  " +
                      (item.path === path || item.step < stepIndex! ? "text-orange-600" : "text-gray-500")
                    }
                  >
                    {item.title}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
