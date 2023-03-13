import React from "react";
import { data_myAccount } from "./data";
import MY_ACCOUNT_CONTENT from "../../containers/my-account/MyAccount_Content";
import MY_ACCOUNT_NAVBAR from "../../containers/my-account/MyAccount_Navbar";

const MyAccount = () => {
  return (
    <div>
      <div className="w-full relative lg:max-w-[1216px] mx-auto my-0  ">
        <div className="flex mt-6 mx-6">
          <MY_ACCOUNT_NAVBAR data_myAccount={data_myAccount} />
          <MY_ACCOUNT_CONTENT />
        </div>
        {/* {data_myAccount} */}
      </div>
    </div>
  );
};

export default MyAccount;
