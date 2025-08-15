import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useAxios({
  url,
  method = "GET",
  body = null,
  headers = null,
  triggerOnMount = true,
  transform,
  withCredentials = false,
  baseURL,
  axiosInstance,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(triggerOnMount);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (override = {}) => {
    setLoading(true);
    setError(null);

    try {
      const client = axiosInstance || axios;
      const response = await client({
        method,
        url,
        data: body,
        headers,
        withCredentials,
        baseURL,
        ...override,
      });

      const result = transform ? transform(response.data) : response.data;
      setData(result);
      return response;
    } catch (err) {
      console.error(err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers, transform, withCredentials, baseURL, axiosInstance]);

  useEffect(() => {
    if (triggerOnMount) {
      fetchData();
    }
  }, [fetchData, triggerOnMount]);

  return { data, loading, error, refetch: fetchData };
}

export default useAxios;
