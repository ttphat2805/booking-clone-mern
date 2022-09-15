import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })();
  }, [url]);
  const reFetch = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
