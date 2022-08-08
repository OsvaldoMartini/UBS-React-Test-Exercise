import React, { FC, useState, useEffect } from "react";
import { TreeNode } from "./TreeNode";
import { ITreeNode } from "../@interfaces";
import "./index.css";

export interface ITreeViewProps {
  dataTree: any[];
  optionsInit?: any;
  changeOptions?: (value: any) => void;
}

const TreeView: FC<ITreeViewProps> = (props: any) => {

  const { dataTree, optionsInit, changeOptions } = props;

  const [optionSelected, setOptionSelected] = useState(optionsInit);

  useEffect(() => {
    changeOptions(optionSelected);
  }, [optionSelected])

  return (
    <div className="d-tree">
      <ul className="d-tree-container">
        {dataTree.map((tree: ITreeNode) => (
          <TreeNode
            key={tree.key}
            node={tree}
            changeOptions={(optionSelected: any) => setOptionSelected(optionSelected)}
            optionsInit={optionSelected}
          />
        ))}
      </ul>
    </div>
  );
};

export default TreeView;

