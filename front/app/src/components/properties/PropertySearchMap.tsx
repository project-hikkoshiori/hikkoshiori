import dynamic from "next/dynamic";
import React from "react";
import { Property, PropertyWithBookMark } from "../../utils/types";

type Props = {
  properties: (Property &
    Partial<Pick<PropertyWithBookMark, "is_bookmarked">>)[];
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
