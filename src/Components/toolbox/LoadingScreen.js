import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";

function LoadingScreen({ loading, setLoading }) {
  useEffect(() => {
    setLoading(true);

    const timing = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timing);
  }, [setLoading, loading]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <BarLoader height="4px" width="99%" color={"red"} loading={loading} />
    </div>
  );
}

export default LoadingScreen;
