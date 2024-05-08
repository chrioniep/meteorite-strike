import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "../../../components/UI/Card";
import PropTypes from "prop-types";
export default function BarChart({ searchedMetheroite, metheroite }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [tabContent, setTabContent] = useState("year");
  const [notNumberMass, setNotNumberMass] = useState(0);
  const [strikeByYear, setStrikeByYear] = useState([{}]);
  const [strikeByClass, setStrikeByClass] = useState([{}]);
  const [averageMetheroiteWeight, setAverageMetheroiteWeight] = useState([]);
  const yearOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Number of strikes by year",
      },
    },
    ticks: {
      precision: 0
    }
  };

  const classData = {
    datasets: [
      {
        data: strikeByClass,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const yearData = {
    datasets: [
      {
        data: strikeByYear,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const tabs = [
    {
      code: "number",
      name: "Number of strikes",
    },
    {
      code: "mass",
      name: "Average mass",
    },
    {
      code: "year",
      name: "Strikes by year",
    },
    {
      code: "recclass",
      name: "Strikes by composition",
    },
  ];
  const changeTab = (code) => {
    setTabContent(code);
  };
  const classOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: tabs.find((item) => item.code === tabContent).name,
      },
    },
    ticks: {
      precision: 0
    }
  };
  useEffect(() => {
    let notNumberCount = 0;
    searchedMetheroite.map((item) => {
      if (!item.mass) notNumberCount++;
      return notNumberCount;
    });
    setNotNumberMass(notNumberCount);
  }, [searchedMetheroite]);

  useEffect(() => {
    const countByYear = {};
    searchedMetheroite.map((item) => {
      countByYear[new Date(item.year).getFullYear()] =
        (countByYear[new Date(item.year).getFullYear()] || 0) + 1;
    });
    setStrikeByYear(countByYear);
    const countByClass = {};
    searchedMetheroite.map((item) => {
      countByClass[item.recclass] = (countByClass[item.recclass] || 0) + 1;
    });
    setStrikeByClass(countByClass);
  }, [searchedMetheroite]);
  useEffect(() => {
    setAverageMetheroiteWeight(
      searchedMetheroite.reduce((total, currentValue) => {
        return currentValue.mass
          ? total + Number(currentValue.mass)
          : total + 0;
      }, 0)
    );
  }, [searchedMetheroite]);
  return (
    <div className="flex items-center">
      <div className="mx-auto w-full max-w-[1450px] self-start">
        <Card className="shadow-lg shadow-indigo-300 mx-auto px-5 py-6">
          <>
            <div className="sm:flex justify-center gap-[12px]">
              {tabs.map((tab) => (
                <button
                  onClick={() => changeTab(tab.code)}
                  key={tab.code}
                  className={`text-indigo-500 rounded-md px-[16px] w-full mb-4 sm:w-auto py-[4px] border-2 border-indigo-400 font-medium hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:border-transparent focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 ${tabContent === tab.code
                    ? "bg-indigo-200 border-indigo-900 text-slate-800"
                    : ""
                    }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
            <div className="flex justify-center max-h-[600px] mx-auto">
              {tabContent === "number" && (
                <p className="bg-[rgba(53,_162,_235,_0.5)] rounded-xl px-5 py-5 mt-5 text-white font-bold sm:text-4xl text-center">
                  Total Numbers of Strikes:{" "}
                  {searchedMetheroite.length
                    ? searchedMetheroite.length
                    : metheroite.length}
                </p>
              )}
              {tabContent === "mass" && (
                <p className=" bg-[rgba(53,_162,_235,_0.5)] rounded-xl px-5 py-5 mt-5 text-white font-bold sm:text-4xl text-center">
                  Average Metheroite Mass:{" "}
                  {(
                    averageMetheroiteWeight /
                    (searchedMetheroite.length - notNumberMass)
                  ).toLocaleString("en-US")}
                  g
                </p>
              )}
              {tabContent === "year" && (
                <Bar options={yearOptions} data={yearData} />
              )}
              {tabContent === "recclass" && (
                <Bar options={classOptions} data={classData} />
              )}
            </div>
          </>
        </Card>
      </div>
    </div>
  );
}

BarChart.propTypes = {
  searchedMetheroite: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      nametype: PropTypes.string,
      recclass: PropTypes.string,
      mass: PropTypes.string,
      fall: PropTypes.string,
      year: PropTypes.string,
      reclat: PropTypes.string,
      reclong: PropTypes.string,
      geolocation: PropTypes.shape({
        latitude: PropTypes.string,
        longitude: PropTypes.string,
      }),
    })
  ),
  metheroite: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      nametype: PropTypes.string,
      recclass: PropTypes.string,
      mass: PropTypes.string,
      fall: PropTypes.string,
      year: PropTypes.string,
      reclat: PropTypes.string,
      reclong: PropTypes.string,
      geolocation: PropTypes.shape({
        latitude: PropTypes.string,
        longitude: PropTypes.string,
      }),
    })
  ),
};
