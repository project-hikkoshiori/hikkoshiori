import dynamic from "next/dynamic";
import React from "react";
import { Property } from "../../utils/types";

type Props = {
  properties: Property[];
};

export const PropertySearchMap = ({ properties }: Props) => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return <Map properties={properties} />;
};
