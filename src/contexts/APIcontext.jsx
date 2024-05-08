import PropTypes from "prop-types";
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { APP_TOKEN, PUBLIC_API_URL } from "../constants/urls";

const ApiContext = createContext();

const NUMBER = 1000;

export function useApiContext() {
  return useContext(ApiContext);
}

export function ApiContextProvider({ children }) {
  const [meteoriteData, setMeteoriteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredSearchInput, setfilteredSearchInput] = useState(meteoriteData);

  const getMeteoriteDataWithAxios = async () => {
    setLoading(true);
    const response = await axios.get(
      `${PUBLIC_API_URL}?$limit=${NUMBER}&$$app_token=${APP_TOKEN}`
    );
    setMeteoriteData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getMeteoriteDataWithAxios();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        meteoriteData,
        filteredSearchInput,
        setfilteredSearchInput,
        loading,
        setLoading,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

ApiContextProvider.propTypes = {
  children: PropTypes.element,
};
