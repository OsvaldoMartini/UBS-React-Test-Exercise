import { ITreeNode } from "../component/@interfaces";

const data011: ITreeNode = {
  key: "0-1-1",
  label: "Document-0-1.doc",
  icon: "caret down",
  title: "Documents Folder",
};

const data012: ITreeNode = {
  key: "0-1-2",
  label: "Document-0-2.doc",
  icon: "caret down",
  title: "Documents Folder",
};

const data013: ITreeNode = {
  key: "0-1-3",
  label: "Document-0-3.doc",
  icon: "caret down",
  title: "Documents Folder",
};

const data014: ITreeNode = {
  key: "0-1-4",
  label: "Document-0-4.doc",
  icon: "caret down",
  title: "Documents Folder",
};

const data00: ITreeNode = {
  key: "0-0",
  label: "Document 1-1",
  icon: "caret down",
  title: "Documents Folder",
  children: [data011, data012, data013, data014]
}

const data0: ITreeNode = {
  key: "0",
  label: "Documents",
  icon: "caret down",
  title: "Documents Folder",
  children: [data00]
};


const data10: ITreeNode = {
  key: "1-0",
  label: "Documents",
  icon: "caret down",
  title: "Documents Folder",
};

const data11: ITreeNode = {
  key: "1-1",
  label: "Documents",
  icon: "caret down",
  title: "Documents Folder",
};

const data1: ITreeNode = {
  key: "1",
  label: "Desktop",
  icon: "fa fa-desktop",
  title: "Desktop Folder",
  children: [data10, data11]
};

const data2: ITreeNode = {
  key: "2",
  label: "Downloads",
  icon: "fa fa-download",
  title: "Downloads Folder",
};

export const treeData = [
  data0,
  data1,
  data2
];

