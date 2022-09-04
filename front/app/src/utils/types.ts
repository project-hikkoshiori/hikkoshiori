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
  id: string;
  text: string;
  iconSrc: string;
};

export type PaperQuestion = {
  number: number;
  maxQuestion: number;
  content: string;
};
