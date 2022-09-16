export type HouseKeep = {
  id: string;
  title: string;
  value: number;
  isUserAdded: boolean;
};

export type HouseKeeps = {
  sectionTitle: string;
  data: HouseKeep[];
};

export type Property = {
  id: string;
  name: string;
  updatedAt: string;
  fromStation: string;
  address: string;
  lat: number;
  lng: number;
  rent: number;
};
export type Advice = {
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

export type UserForm = {
  name: string
  gender: Gender
  userType: UserType
  workPattern: WorkPattern
}

export const genderList = ["MAN", "WOMAN"] as const
export type Gender = typeof genderList[number]

export const userTypeList = ["STUDENT", "NEW_WORKER", "WORKER"]
export type UserType = typeof userTypeList[number]

export const workPatternList = ["REMOTE", "ELSE"]
export type WorkPattern = typeof workPatternList[number]
