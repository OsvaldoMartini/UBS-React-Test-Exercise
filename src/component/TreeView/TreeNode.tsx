import React, { FC, useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import TreeView from "./TreeView";
import { ITreeNode } from "../@interfaces";
import "./index.css";

export interface TreeNodeProps {
  optionsInit: string;
  changeOptions: (node: any) => void;
  node: ITreeNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const TreeNode: FC<TreeNodeProps> = (props: any) => {

  const { optionsInit, changeOptions, node, onChange, onKeyDown } = props;
  const [optionSelected, setOptionSelected] = useState(optionsInit);
  const [childVisible, setChildVisiblity] = useState(false);
  const hasChild = node.children ? true : false;


  const handleClick = (node: any) => {
    setChildVisiblity((v) => !v);
    setOptionSelected(node.idKey);
  }

  useEffect(() => {
    changeOptions(optionSelected);
  }, [childVisible, optionSelected])

  return (
    <li
      className="d-tree-node">
      <div className="row">
        {hasChild && (
          <div className={`column ${childVisible ? "caret up ;" : "caret down"}`}>
          </div>
        )}
        {!hasChild && (
          <div className={"column caret down"}>
          </div>
        )}
        <div
          className={`column`}
          onClick={(e) => handleClick(node)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          style={{ textDecoration: `${childVisible ? "underline" : "unset"}` }}
        >
          {node.label}
        </div>
      </div>

      {
        hasChild && childVisible && (
          <div >
            <ul className="d-tree-container">
              <TreeView dataTree={node.children}
                changeOptions={(optionSelected: any) => setOptionSelected(optionSelected)}
                optionsInit={optionSelected}
              />
            </ul>
          </div>
        )
      }
    </li >
  );
};