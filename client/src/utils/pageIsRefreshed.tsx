import { useEffect, useState } from "react";

// preventing refresh page
export const BeforeRefresh = () => {
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    window.onbeforeunload = function () {
      setRefresh(true);
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  return refresh;
};

export const AfterRefresh = () => {
  if (performance.navigation.type === 1) {
    return true;
  } else return false;
};
