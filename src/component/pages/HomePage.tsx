import React, { FC, useState, useEffect } from "react";
import { ICardMainData } from "../@interfaces/CardMainData.d";
import { CardButton } from "../cards/CardButton";
import { cardsData } from "../../data/cardsData";
import TreeView from "../TreeView/TreeView";
import { treeData } from "../../data/treeViewData";
import { getAll } from "../../api/API";
import { ITreeNode } from "../@interfaces";


type HomePageBootVariant = "InitialState" | "HoverCriteria";

export interface HomePageBootProps {
  children?: string | React.ReactElement;
  title: string;
  className?: string;
  variant: HomePageBootVariant;
  disabled?: boolean;
  changeValues?: (value: any) => void;
}

export const HomePageBoot: FC<HomePageBootProps> = ({
  children,
  title = "Search",
  className,
  variant = "InitialState",
  disabled,
  changeValues,
  ...homePageBootProps
}) => {

  const [optionSelected, setOptionSelected] = useState("");

  const [filtered, setFiltered] = useState<any[]>(cardsData);

  const [treeNodeData, setTreeNodeData] = useState<ITreeNode[]>([]);
  const [dataMenuTree, setDataMenuTree] = useState<any[]>([]);


  useEffect(() => {
    getAll().then((rep) => setDataMenuTree(rep));
  }, [])

  useEffect(() => {
    if (dataMenuTree.length > 0) {
      let treeFiltered = dataMenuTree.filter((item) => {
        let bcap1 = item.BCAP1.split(" ")[item.BCAP1.split(" ").length - 1];
        let bcap2 = item.BCAP2.split(" ")[item.BCAP2.split(" ").length - 1];
        let bcap3 = item.BCAP3.split(" ")[item.BCAP3.split(" ").length - 1];
        return (bcap1.indexOf(optionSelected) > -1 || bcap2.indexOf(optionSelected) > -1 || bcap3.indexOf(optionSelected) > -1);
      });

      let cards = treeFiltered.map((item) => {
        return {
          id: item.id,
          title: item.name,
          subTitle: `Total spend: $${Number(item.spend).toFixed(2)}`
        }
      });

      setFiltered(cards);

    }
  }, [optionSelected])

  useEffect(() => {

    if (dataMenuTree.length > 0) {
      const copyMenuTree = dataMenuTree.map(object => ({ ...object }));

      // Type of List that I can get the last child to verify all existents
      let cleanBCAPs = copyMenuTree.reduce((acc, current) => {
        const x = acc.find((item: any) => item.BCAP3 === current.BCAP3);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, [])
        .sort(function (a: any, b: any) {
          if (a.BCAP3 < b.BCAP3) {
            return -1;
          } else if (a.BCAP3 > b.BCAP3) {
            return 1;
          } else {
            return null;
          }
        });

      let grouped = Object.entries(
        cleanBCAPs
          .reduce(function (r: any, a: any) {
            r[a.BCAP1] = r[a.BCAP1] || [];
            delete a.id;
            delete a.name;
            delete a.spend;
            r[a.BCAP1].push(a);
            return r;
          }, Object.create(null)),
      ).map((item) => {
        return { key: item[0], value: item[1] };
      }) || [];

      let level0: ({ key: string; idKey: string; } | any)[] = [];
      let level1: ({ key: string; idKey: string; } | any)[] = [];
      let level2: ({ key: string; idKey: string; } | any)[] = [];
      let treeGroup: { key: string; label: any; icon: string; title: any; parent?: string }[] = [];

      grouped.forEach((item: any) => {

        level0 = Object.entries(
          item.value
            .reduce(function (r: any, a: any) {
              r[a.BCAP1] = r[a.BCAP1] || [];
              r[a.BCAP1].push(a);
              return r;
            }, Object.create(null)),
        ).map((item) => {
          return {
            key: item[0],
            idKey: item[0].split(" ")[item[0].split(" ").length - 1],
            title: item[0],
            label: item[0],
            icon: "caret down"
          };
        }) || [];


        level1 = Object.entries(
          item.value
            .reduce(function (r: any, a: any) {
              r[a.BCAP2] = r[a.BCAP2] || [];
              r[a.BCAP2].push(a);
              return r;
            }, Object.create(null)),
        ).map((item) => {
          return {
            key: item[0],
            idKey: item[0].split(" ")[item[0].split(" ").length - 1],
            title: item[0],
            label: item[0],
            icon: "caret down"
          };
        }) || [];

        level1 = level1.map((item) => {
          let tp = level0.filter((it) => {
            return item.idKey.indexOf(it.idKey + ".") > -1;
          }) || null;

          return {
            ...item,
            parent: tp !== null && tp[0].idKey

          }
        })

        level2 = Object.entries(
          item.value
            .reduce(function (r: any, a: any) {
              r[a.BCAP3] = r[a.BCAP3] || [];
              r[a.BCAP3].push(a);
              return r;
            }, Object.create(null)),
        ).map((item) => {
          return {
            key: item[0],
            idKey: item[0].split(" ")[item[0].split(" ").length - 1],
            title: item[0],
            label: item[0],
            icon: "caret down"
          };
        }) || [];


        level2 = level2.map((item) => {
          let tp = level1.filter((it) => {
            return item.idKey.indexOf(it.idKey + ".") > -1;
          }) || null;

          return {
            ...item,
            parent: tp !== null && tp[0].idKey

          }
        })

        level2.map((item) => {
          let tp = level1.filter((it) => {
            return item.idKey.indexOf(it.idKey + ".") > -1;
          }) || null;

          return {
            ...item,
            parent: tp !== null && tp[0].idKey

          }
        })

        let allLevels = level0.map((lv0) => {
          return {
            ...lv0,
            children: level1.map((lv1) => {
              if (lv1.idKey.indexOf(lv0.idKey + ".") > -1) {
                return {
                  ...lv1,
                  children: level2.filter((lv2) => {
                    if (lv2.idKey.indexOf(lv1.idKey + ".") > -1) {
                      return {
                        ...lv2
                      };
                    }
                  })

                };
              }
            })
          }
        });

        treeGroup.push(allLevels[0]);

      });

      setTreeNodeData(treeGroup);

    }
  }, [dataMenuTree])


  const handleCardSelection = (card: any) => {
    console.log("Application  Selected:", card)
  };

  return (

    <div {...homePageBootProps} className="app-global">
      <header>
        <div id="ubsLogo" className="header-bar-logo-boot" />
        <span className="header-bar-title-boot">Pharos Coding Exercise</span>
        <hr className="divider-line-header"></hr>
      </header>
      <section >
        <div>
          <aside>
            <div>
              <div className="container-menu-left">
                <aside className="menu-position">
                  <div className="title-menu">Navigation</div>
                  <TreeView dataTree={treeNodeData}
                    changeOptions={(optionSelected: any) => setOptionSelected(optionSelected)}
                    optionsInit={optionSelected}
                  >
                  </TreeView>
                </aside>
                <hr className="divider-line-vertical"></hr>

                <section >
                  <div className="container-main-panel" style={{ paddingTop: "5px" }}>
                    {filtered &&
                      filtered.map((card: ICardMainData, index: number) => {
                        return (
                          <div>
                            <div key={`_${card.id}`} style={{ position: "inherit" }}>
                              <CardButton
                                classNamePlus={"hover-card-main-svg"}
                                addClassNames={``}
                                addLeftPos={`inherit`}
                                addTopPos={"24px"}
                                key={`card_${card.id}`}
                                title={card.title}
                                subTitle={card.subTitle}
                                variant={"BootstrapCriteria"}
                                buttCriteria={card}
                                opacityInit={"60%"}
                                addDynWidth={true}
                                onClick={() => {
                                  handleCardSelection(card);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </section>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <footer>
        <div className="rectangle-bottom"></div>
      </footer>
    </div>
  );
};

export default HomePageBoot;
