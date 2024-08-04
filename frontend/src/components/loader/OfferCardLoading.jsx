import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OfferDetailBadgeLoading from "./OfferDetailBadgeLoading.jsx";

const OfferCardLoading = ({className}) => {
    const [detailed, setDetailed] = useState(true);

    const navigate = useNavigate();
  
    return (
      <div className="flex flex-col items-start justify-start w-full gap-2">
        <div className="flex items-center px-4 gap-x-6 gap-y-2 flex-wrap">
            {
                [1,2,3,4].map(item => <OfferDetailBadgeLoading key={item}/>)
            }
        </div>
        <div
          className={` shadow-sm flex flex-col gap-3 w-full items-center ${className} p-4 rounded-xl`}
        >
          <div className="w-full flex items-center justify-between rounded-2xl">
            <div className="flex items-center gap-2">
              <div className="loader-tag-2 rounded-full size-[40px]"></div>
              <div className="loader-tag-2 rounded-xl  w-[256px] h-[40px]"/>

            </div>
          </div>
          <div className="loader-tag-2 rounded-xl w-full  h-[64px]"/>

         <div className="loader-tag-2 w-full rounded-xl h-[140px]"></div>
        </div>
      </div>
    );
  };

export default OfferCardLoading
