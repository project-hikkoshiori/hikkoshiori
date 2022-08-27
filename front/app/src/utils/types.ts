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
