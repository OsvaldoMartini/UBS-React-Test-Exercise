import React, { FC, useState } from "react";

type CardButtonVariant =
  | "InitialState"
  | "BootstrapCriteria";

type CardButtonState =
  | "default"
  | "titlePosition"
  | "titleTypography"
  | "subTitlePosition"
  | "subTitleTypography"
  | "svgPosition";

const CardButtonVariantClasses: Record<
  CardButtonVariant,
  Record<CardButtonState, string>
> = {
  InitialState: {
    default: "card-main-button",
    titlePosition: "card-main-title-position",
    titleTypography: "card-main-text-typography",
    subTitlePosition: "card-main-subtitle-position",
    subTitleTypography: "card-main-subtitle-typography",
    svgPosition: "card-main-svg-position"
  },
  BootstrapCriteria: {
    default: "card-main-button-boot",
    titlePosition: "card-main-text-position-boot",
    titleTypography: "card-main-text-typography",
    subTitlePosition: "card-main-subtitle-position",
    subTitleTypography: "card-main-subtitle-typography",
    svgPosition: "card-main-svg-position-boot",
  },
};

export interface CardButtonProps {
  children?: string | React.ReactElement;
  className?: string;
  classNamePlus?: string;
  variant: CardButtonVariant;
  disabled?: boolean;
  title?: string;
  subTitle?: string;
  description?: string;
  mainCardPage?: boolean
  addClassNames?: string;
  addLeftPos?: string;
  addTopPos?: string;
  addPlusPos?: string;
  opacityInit?: string;
  hoverClicked?: boolean;
  addDynWidth?: boolean;
  buttCriteria?: any;
  onClick?: (card: any) => void;
}

export const CardButton: FC<CardButtonProps> = ({
  children,
  className,
  classNamePlus = null,
  variant,
  mainCardPage = true,
  opacityInit,
  disabled,
  title,
  subTitle,
  description,
  addClassNames = "",
  addLeftPos,
  addTopPos,
  addPlusPos,
  hoverClicked = false,
  addDynWidth = false,
  buttCriteria,
  ...cardButtonProps
}) => {

  const [hoverSearchCriteria, setHoverSearchCriteria] = useState(false);

  const [opacity, setOpacity] = useState(opacityInit);

  mainCardPage = variant === "InitialState" || variant === "BootstrapCriteria" || false;

  const CardButtonVariantClassName =
    hoverSearchCriteria && !mainCardPage
      ? CardButtonVariantClasses["InitialState"]
      : CardButtonVariantClasses[variant];


  const getTextWidth = (valueText: string) => {
    let text = document.createElement("span");
    document.body.appendChild(text);

    text.style.font = "FrutigerLTStd-Roman";
    text.style.fontSize = 14 + "px";
    text.style.height = 'auto';
    text.style.width = 'auto';
    text.style.position = 'absolute';
    text.style.whiteSpace = 'no-wrap';
    text.innerHTML = valueText;
    //text.hidden = true;
    let width = Math.ceil(text.clientWidth) + 25;
    document.body.removeChild(text);

    return width;
  }

  let dynAddWidth = addDynWidth || getTextWidth(title!);

  return (
    <div
      {...cardButtonProps}
      className={`${addClassNames}`}
      style={{
        left: `${addLeftPos}`,
        top: `${addTopPos}`,
        cursor: `${"grab"}`
      }}
    >
      <div
        div-clicked={String(hoverClicked)}
        onMouseEnter={() => {
          if (variant !== "InitialState") {
            mainCardPage ? setOpacity("100%") : setOpacity("60%");
            setHoverSearchCriteria(true);
          }
        }}
        onMouseLeave={() => {
          if (variant !== "InitialState") {
            mainCardPage ? setOpacity("60%") : setOpacity("100%");
            setHoverSearchCriteria(false);
          }
        }}
        className={CardButtonVariantClassName.default}
      >
        <div
          className={CardButtonVariantClassName.titlePosition}
        >
          <div
            className={CardButtonVariantClassName.titleTypography}
          >
            {title}
          </div>
        </div>
        {mainCardPage && (
          <div
            style={{ left: `${addPlusPos}`, opacity: `${variant === "BootstrapCriteria" ? opacity : opacityInit}` }}
            className={` ${CardButtonVariantClassName.svgPosition}`}
          >
            {mainCardPage && (
              <div
                className={CardButtonVariantClassName.subTitlePosition}
              >
                <div
                  className={CardButtonVariantClassName.subTitleTypography}
                  style={{ width: `${dynAddWidth}px` }}
                >
                  {subTitle}
                </div>
              </div>

            )}
          </div>
        )}
      </div>
    </div>
  );
};
