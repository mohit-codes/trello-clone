/* eslint-disable no-unused-vars */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import { backendUrl } from "../util/constant";

export const useAxiosGet = (path) => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    let unmounted = false;
    const fetch = async () => {
      try {
        const url = `${backendUrl}/${path}/${user._id}`;
        const res = await axios.get(url);
        if (!unmounted) {
          setData(res.data[`${path}`]);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (!unmounted) {
          setLoading(false);
          setError(true);
          setErrorMessage(err.message);
        }
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
