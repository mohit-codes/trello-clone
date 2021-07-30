/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../util/constant";

export const useAxiosGet = (path, id) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    let unmounted = false;
    const fetch = async () => {
      try {
        const url = backendUrl + path + id;
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
        setErrorMessage(err.message);
      }
    };
    fetch();
    return () => {
      unmounted = true;
    };
  }, [path]);

  const addItem = (item) => {
    setData((prevData) => [...prevData, item]);
  };

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((obj) => obj._id !== id));
  };

  return {
    data,
    error,
    setData,
    loading,
    errorMessage,
    addItem,
    removeItem,
  };
};
