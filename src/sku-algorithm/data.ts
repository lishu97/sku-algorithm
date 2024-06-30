
export type CommoditySpecsType = {
  title: string;
  list: Array<string>;
};

export type SpecCategoryType = {
  id: string;
  specs: Array<string>;
};

export type SpecStateType = {
  specList: Array<CommoditySpecsType>;
  specCombinationList: Array<SpecCategoryType>;
};

export type AdjoinType = Array<string>;
