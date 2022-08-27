import dynamic from "next/dynamic";
import React from "react";

export const PropertySearchMap = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return <Map />;
};
