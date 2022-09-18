import { useGetBookmarkedProperties } from "../api/BookmarkedPropertyAPI";
import { useGetFilteredProperties } from "../api/PropertyAPI";
import { PropertyWithBookMark } from "../utils/types";

type usePropertyWithBookmarkProps = {
  filterUrl: string;
  user_id: string;
};

const usePropertyWithBookmark = ({
  filterUrl,
  user_id,
}: usePropertyWithBookmarkProps) => {
  const {
    data: properties,
    isError: isFilterError,
    isLoading: isFilterLoading,
  } = useGetFilteredProperties(filterUrl);
  const {
    data: bookmarkedproperties,
    isError: isBookmarkError,
    isLoading: isBookmarkLoading,
  } = useGetBookmarkedProperties(user_id);

  const propertiesWithBookmark: PropertyWithBookMark[] | undefined = properties
    ? properties.map((property) => {
        const is_bookmarked =
          bookmarkedproperties?.find(
            (bookmarked) => bookmarked.id == property.id
          ) !== undefined;
        return {
          ...property,
          is_bookmarked,
        };
      })
    : properties;

  return {
    data: propertiesWithBookmark,
    isLoading: isFilterLoading || isBookmarkLoading,
    isError: isFilterError,
    isBookmarkError,
  };
};

export default usePropertyWithBookmark;
