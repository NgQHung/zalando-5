import React, { Fragment, memo } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import "./subHeader_category.css";
import { SubHeaderCategory_DATA } from "../../../../../../utils/data";
import Container from "../../../../container";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

interface IProps {
  category: string;
}

const SubHeaderCategory: React.FC<IProps> = ({ category }) => {
  const categoryToUpperCase = category.toUpperCase().toString().split(" ").join("_");
  const dataCategory = SubHeaderCategory_DATA.filter((item) => item.title === categoryToUpperCase);
  const navigate = useNavigate();
  return (
    <Fragment>
      <Container bg_color="">
        {dataCategory?.map((item, index) => (
          <div key={index} className="w-full flex py-[22px] px-[24px]">
            {item.type.map((type, idx) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 1,
                    },
                  }}
                  key={idx}
                  className="py-[10px] max-w-1/4 basis-1/4"
                >
                  <h5 className=" mb-[12px] text-[18px] tracking-[-0.16px] h-[24px] font-[400] text-[#66676e] text_tiempos leading-[24px] ">
                    {type.title}
                  </h5>
                  {type.types.map((typ, inx) => (
                    <div key={inx} className="h-[21px] flex flex-col mb-[12px] text-[14px] ">
                      <div onClick={() => navigate("/clothes")}>
                        <span className="affect_text">{typ}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 1.5,
                },
              }}
              className="w-[288px] relative h-[438px] bg-red-500"
            >
              <div className=" absolute right-0 top-0">
                <img className="w-[268px] h-[385px] object-cover" src={item.image} alt={item?.title} />
              </div>
            </motion.div>
          </div>
        ))}
      </Container>
    </Fragment>
  );
};

export default memo(SubHeaderCategory);
