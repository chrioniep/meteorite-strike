import { FaWeightHanging } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { BsCalendar3 } from "react-icons/bs";
import { PiMapPinFill } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { FaWind } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";
import { FaArrowsAltH } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MeteoriteLine = ({ data }) => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const findCountry = () => {
    setLoading(true);
    if (data.reclong) {
      axios
        .get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${data.reclat}&lon=${data.reclong}&format=json&apiKey=1c6480fe81734704bb23de7a30a2a769`
        )
        .then((res) => {
          setCountry(res.data.results[0].country);
          setLoading(false);
        });
    } else {
      setCountry("no location");
      setLoading(false);
    }
  };
  useEffect(() => {
    findCountry();
  }, [data]);
  return (
    <div className="w-full border-[1px] border-gray-300 flex p-5 rounded-md duration-100">
      <div className="w-full">
        <div className="flex items-center space-x-6 mb-4 justify-between">
          {/* <div className={`w-24 h-24 bg-[#E7E7F0] rounded-md`}></div> */}
          <h2 className="text-black text-3xl font-semibold">{data.name}</h2>
          <div className="w-[58px] bg-indigo-600 rounded-full h-[35px] flex items-center justify-center text-white text-semibold text-lg">
            {data.id}
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-cols-2 grid-cols-4 gap-x-6 gap-y-12">
          <div className="">
            <div className="flex items-center space-x-3">
              <FaWeightHanging className="text-gray-400" />
              <span className="text-gray-400">Mass</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data.mass}kg</h3>
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <RxDashboard className="text-gray-400" />
              <span className="text-gray-400">Recclass</span>
            </div>
            <h3 className="font-semibold text-black text-md">
              {data.recclass}
            </h3>
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <BsCalendar3 className="text-gray-400" />
              <span className="text-gray-400">Year</span>
            </div>
            <h3 className="font-semibold text-black text-md">
              {new Date(data.year).getFullYear()}
            </h3>
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <PiMapPinFill className="text-gray-400" />
              <span className="text-gray-400">Location</span>
            </div>
            {!loading && (
              <h3 className="font-semibold text-black text-md">{country}</h3>
            )}
            {loading && <Skeleton width={90} height={20} />}
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <MdEditDocument className="text-gray-400" />
              <span className="text-gray-400">Nametype</span>
            </div>
            <div className="w-[75px] bg-[#2cbf2948] rounded-full h-[22px] flex items-center justify-center text-green-700 text-semibold text-md">
              {data.nametype}
            </div>
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <FaWind className="text-gray-400" />
              <span className="text-gray-400">Fall</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data.fall}</h3>
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <FaArrowsAltV className="text-gray-400" />
              <span className="text-gray-400">Reclat</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data.reclat}</h3>
          </div>
          <div className="">
            <div className="flex items-center space-x-3">
              <FaArrowsAltH className="text-gray-400" />
              <span className="text-gray-400">Reclong</span>
            </div>
            <h3 className="font-semibold text-black text-md">{data.reclong}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
