import { faCaretDown, faCaretUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IProps {
  dropdownHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  nameDropdown: Record<string, any>;
}

const PRODUCT_INFO_DETAILEDINFO = ({ dropdownHandler, nameDropdown }: IProps) => {
  return (
    <div className="mt-12 font-[700]">
      <div className={" border-y border-[#66676e] relative"}>
        <button
          name="material"
          className="  w-full flex justify-between px-6 py-4 hover:bg-[#e9e9ed] "
          onClick={dropdownHandler}
        >
          <span>Materiál a údržba</span>
          {nameDropdown.material ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
        </button>

        <div className={" font-[400] dropdown_hidden " + (nameDropdown.material ? "dropdown" : "")}>
          <div className="text-[14px] pt-4 px-6 pb-9 ">
            <p className="mb-1">
              <span className="font-[700]">Materiál svrchní látka</span>: 100% bavlna
            </p>
            <p className="mb-1">
              <span className="font-[700]">Podšívka</span>: 100% polyester
            </p>
            <p className="mb-1">
              <span className="font-[700]">Tloušťka podšívky</span>: Lehce vycpané
            </p>
            <p className="mb-1">
              <span className="font-[700]">Konstrukce materiálu</span>: Denim
            </p>
            <p>
              <span className="font-[700]">Pokyny pro péči</span>: Nesušit v sušičce, praní v pračce při 30 °C
            </p>
          </div>
        </div>
      </div>
      <div className={" border-b border-[#66676e] relative"}>
        <button
          name="details"
          onClick={dropdownHandler}
          className="w-full flex justify-between px-6 py-4  hover:bg-[#e9e9ed] "
        >
          <span>Podrobnosti</span>
          {nameDropdown.details ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
        </button>
        <div className={" font-[400] dropdown_hidden " + (nameDropdown.details ? "dropdown" : "")}>
          <div className="text-[14px] pt-4 px-6 pb-9 ">
            <p className="mb-1">
              <span>Límec:</span> Polstrovaný límeček
            </p>
            <p className="mb-1">
              <span className="font-[700]">Zapínání:</span> Knoflík
            </p>
            <p className="mb-1">
              <span className="font-[700]">Detaily:</span> Hluboké kapsy
            </p>
            <p className="mb-1">
              <span className="font-[700]">Délka:</span> Normální
            </p>
            <p className="mb-1">
              <span className="font-[700]">Číslo položky:</span> WR122T02Y-K11
            </p>
          </div>
        </div>
      </div>

      <div className={" border-b border-[#66676e] relative"}>
        <button
          name="size"
          onClick={dropdownHandler}
          className="w-full flex justify-between px-6 py-4  hover:bg-[#e9e9ed] "
        >
          <span>Velikost a střih</span>
          {nameDropdown.size ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}
        </button>
        <div className={"font-[400]  dropdown_hidden " + (nameDropdown.size ? "dropdown" : "")}>
          <div className="text-[14px] pt-4 px-6 pb-9 ">
            <p>
              <span>Velikost modelu:</span> Náš model / naše modelka je vysoký/a 189 cm a má velikost M
            </p>
            <p className="mb-1">
              <span className="font-[700]">Střih:</span> Regular fit
            </p>
            <p className="mb-1">
              <span className="font-[700]">Tvar:</span> Rovný
            </p>
            <p className="mb-1">
              <span className="font-[700]">Délka:</span> Normální
            </p>
            <p className="mb-1">
              <span className="font-[700]">Délka rukávů:</span> Dlouhé
            </p>
            <p className="mb-1">
              <span className="font-[700]">Celková délka:</span> 70 cm (velikost M)
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between px-6 py-2 border-b border-[#66676e] items-center z-50 ">
        <span>Wrangler</span>
        <button className="p-2 text-[14px] border border-[#1a1a1a] hover:outline hover:outline-offset-[-2px] hover:outline-[2px]">
          <FontAwesomeIcon icon={faPlus} />
          <span>Sledovat</span>
        </button>
      </div>
    </div>
  );
};

export default PRODUCT_INFO_DETAILEDINFO;
