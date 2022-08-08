export interface ITreeNode {
  key: string;
  label: string;
  icon: string;
  title: string;
  children?: ITreeNode[];
}