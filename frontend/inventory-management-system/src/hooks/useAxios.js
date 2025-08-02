import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useAxios({
  url,
  method = "GET",
  body = null,
  headers = null,
  triggerOnMount = true,
  transform,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(triggerOnMount);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });

      const result = transform ? transform(response.data) : response.data;
      setData(result);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers]); // ⛔️ remove transform from dependencies

  useEffect(() => {
    if (triggerOnMount) {
      fetchData();
    }
  }, [fetchData, triggerOnMount]);

  return { data, loading, error, refetch: fetchData };
}

export default useAxios;
