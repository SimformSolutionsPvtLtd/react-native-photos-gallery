export interface ItemData {
  id: number;
  title: string;
  isSelected: boolean;
}

export interface ListItem {
  item: ItemData;
  data: Array<ItemData>;
  setData: React.Dispatch<React.SetStateAction<Array<ItemData>>>;
}
