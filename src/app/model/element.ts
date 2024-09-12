export interface Element {
  isSelected: boolean;
  position: number;
  name: string;
  weight: number;
  symbol: string;
  isEdit: boolean;
}

export const ElementColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'position',
    type: 'number',
    label: 'Position',
    required: true,
  },
  {
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'weight',
    type: 'number',
    label: 'Weight',
    step: '0.0001',
  },
  {
    key: 'symbol',
    type: 'text',
    label: 'Symbol',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
