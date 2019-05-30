import React, { useState, useEffect, createRef } from "react";

const Item = props => {
  const { top, left } = props;
  const [click, setClick] = useState(false);

  useEffect(() => {
    let itemRef = createRef();
    props.focus && itemRef.current.focus();
  }, [props.focus]);

  const style = {
    position: "absolute",
    top: top,
    left: left,
    border: "1px solid",
    height: "30px",
    width: "30px"
  };

  const clickedStyle = {
    ...style,
    backgroundColor: "red"
  };

  return (
    <div
      style={click ? clickedStyle : style}
      tabIndex={0}
      onClick={() => setClick(!click)}
    />
  );
};

const Grid = () => {
  const [focusList, setFocusList] = useState(Array(25).fill(false));

  const onHandleFocusList = i => {
    setFocusList([...focusList.slice(0, i), true, focusList.slice(i + 1)]);
  };

  const pointList = [...Array(5)]
    .map((_, i) => [...Array(5)].map((_, j) => [i * 40, j * 40]))
    .flat();
  // 5×5のグリッドを作成
  // [[0,0],[0,40]...[40,0],[40,40]...[160,160]]

  return pointList.map((topLeft, index) => (
    <Item
      focus={focusList[index]}
      key={String(topLeft[0]) + String(topLeft[1])}
      top={topLeft[0]}
      left={topLeft[1]}
    />
  ));
};

export default Grid;
