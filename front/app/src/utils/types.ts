export type HouseKeep = {
  id: string;
  name: string;
  value: number;
  is_prepared: boolean;
  table_name: string;
  table_id: string;
};

export type HouseKeepTable = {
  name: string;
  id: string;
  data: HouseKeep[];
};

export type Property = {
  id: string;
  location: string;
  lat: number;
  lng: number;
  monthly_rent_price: number;
  monthly_maintenance_fee: number;
  initial_cost: number;
  distance_station_raw: string;
  house_layout: string;
  exclusive_area: number;
  age_of_building: number;
  floor_num: number;
  direction: string;
  fetched_at: string;
  image_src: string;
};

export type BookmarkedProperty = {
  user_id: string;
} & Property;

export type PropertyWithBookMark = {
  is_bookmarked: boolean;
} & Property;

export type Advice = {
  id: string;
  user_id: string;
  content: string;
  iconSrc: string;
  created_at: string;
};

export type PaperQuestion = {
  number: number;
  maxQuestion: number;
  content: string;
};

export type LayoutQuestion = {
  number: number;
  maxQuestion: number;
  imageSrc: string[];
};

export type User = {
  id: string;
  name: string;
  gender: Gender;
  user_type: UserType;
  work_pattern: WorkPattern;
  created_at: string;
};

export type UserForm = {
  name: string;
  gender: Gender;
  user_type: UserType;
  work_pattern: WorkPattern;
};

export const genderList = ["MAN", "WOMAN", "ELSE"] as const;
export type Gender = typeof genderList[number];

export const userTypeList = ["STUDENT", "NEW_WORKER", "WORKER", "ELSE"];
export type UserType = typeof userTypeList[number];

export const workPatternList = ["REMOTE", "ELSE"];
export type WorkPattern = typeof workPatternList[number];
