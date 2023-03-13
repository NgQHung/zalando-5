import React, { memo } from "react";
import { Data_MyAccount } from "../../pages/myAccount/data";

interface IProps {
  data_myAccount: Data_MyAccount[];
}

const MY_ACCOUNT_NAVBAR = ({ data_myAccount }: IProps) => {
  return (
    <div className="myAccount_navbar basis-[16.666%] hidden lg:block">
      {data_myAccount.map((items) => (
        <div className="mb-4">
          <p className="myAccount_navbar-title text-[16px] leading-[23.2px] font-[700] mb-2">{items.title}</p>
          {items.data.map((item) => (
            <ul className="myAccount_navbar-list text-[14px] leading-[20px]">
              <li className="myAccount_navbar-item ml-3 mb-3">
                <span className="affect_text">{item}</span>
              </li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(MY_ACCOUNT_NAVBAR);
