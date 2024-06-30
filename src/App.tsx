import React, { useState, useMemo } from "react";
import { SpecAdjoinMatrix, SpecStateType } from "./sku-algorithm";
import "./App.css";
const classNames = require("classnames");


const initialState: SpecStateType = {
  // specList: [
  //   {title: "颜色", list: ["白色", "粉色"]},
  //   {title: "体重", list: ["G", "KG"]},
  //   {title: "尺寸", list: ["1寸", "2寸", "3寸"]},
  //   {title: "形状", list: ["圆", "正方", "三角"]},
  // ],
  // specCombinationList: [
  //   {id: "1", specs: ["G", "1寸", "白色", "正方"]},
  //   {id: "2", specs: ["G", "1寸", "白色", "圆"]},
  //   {id: "3", specs: ["G", "1寸", "粉色", "圆"]},
  //   {id: "4", specs: ["G", "1寸", "粉色", "正方"]},
  //   {id: "5", specs: ["KG", "3寸", "白色", "圆"]},
  //   {id: "6", specs: ["KG", "2寸", "粉色", "正方"]},
  // ],
  // specList: [
  //   {title: "颜色", list: ["白色", "粉色"]},
  //   {title: "尺寸", list: ["1寸", "2寸"]},
  //   {title: "体重", list: ["G", "KG"]}
  // ],
  // specCombinationList: [
  //   {id: "1", specs: ["KG", "1寸", "白色"]},
  //   {id: "2", specs: ["G", "2寸", "白色"]},
  //   {id: "3", specs: ["G", "1寸", "粉色"]}
  // ],
  specList: [
    { title: "颜色", list: ["红色", "紫色", "白色", "黑色"] },
    { title: "套餐", list: ["套餐一", "套餐二", "套餐三", "套餐四"] },
    { title: "内存", list: ["64G", "128G", "256G"] },
  ],
  specCombinationList: [
    { id: "1", specs: ["紫色", "套餐一", "64G"] },
    { id: "2", specs: ["紫色", "套餐一", "128G"] },
    { id: "3", specs: ["紫色", "套餐二", "128G"] },
    { id: "4", specs: ["黑色", "套餐三", "256G"] },
  ],
};

const App: React.FC = () => {
  const { specList, specCombinationList } = initialState;
  // 已选择的规格，长度为规格列表的长度
  const [specsS, setSpecsS] = useState(Array(specList.length).fill(""));

  // 创建一个规格矩阵
  const specAdjoinMatrix = useMemo(() => new SpecAdjoinMatrix(specList, specCombinationList), [specList, specCombinationList]);
  // 获得可选项表
  const optionSpecs = specAdjoinMatrix.getSpecsOptions(specsS);

  const handleClick = function (bool: boolean, text: string, index: number) {
    // 排除可选规格里面没有的规格
    if (specsS[index] !== text && !bool) return;
    // 根据text判断是否已经被选中了
    specsS[index] = specsS[index] === text ? "" : text;
    setSpecsS(specsS.slice());
  };

  return (
    <div className="container">
      {specList.map(({ title, list }, index) => (
        <div key={index}>
          <p className="title">{title}</p>
          <div className="specBox">
            {list.map((value, i) => {
              const isOption = optionSpecs.includes(value); // 当前规格是否可选
              const isActive = specsS.includes(value); // 当前规格是否被选
              return (
                <span
                  key={i}
                  className={classNames({
                    specOption: isOption,
                    specAction: isActive,
                    specDisabled: !isOption,
                  })}
                  onClick={() => handleClick(isOption, value, index)}
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
