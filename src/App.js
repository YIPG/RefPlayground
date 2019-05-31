import React, { useState, useEffect, createRef } from "react"
import { relative } from "upath"

const Item = props => {
  const { top, left } = props
  const [click, setClick] = useState(false)

  useEffect(() => {
    let itemRef = createRef()
    props.focus && itemRef.current.focus()
  }, [props.focus])

  const style = {
    position: "absolute",
    top: top,
    left: left,
    border: "1px solid",
    height: "40px",
    width: "40px"
  }

  const clickedStyle = {
    ...style,
    backgroundColor: "red"
  }

  const handleKeyDown = target => {
    if (target.key === "Enter") setClick(!click)
  }

  return (
    <div
      style={click ? clickedStyle : style}
      tabIndex={0}
      onClick={() => setClick(!click)}
      onKeyDown={target => handleKeyDown(target)}
    />
  )
}

const Grid = () => {
  const [focusList, setFocusList] = useState(Array(25).fill(false))

  const onHandleFocusList = i => {
    setFocusList([...focusList.slice(0, i), true, focusList.slice(i + 1)])
  }

  const length = 50

  const pointList = [...Array(5)]
    .map((_, i) => [...Array(5)].map((_, j) => [i * length, j * length]))
    .flat()
  // 5×5のグリッドを作成
  // [[0,0],[0,40]...[40,0],[40,40]...[160,160]]

  return (
    <div
      style={{
        margin: "3rem 20rem"
      }}
    >
      <div style={{ position: "relative" }}>
        {pointList.map((topLeft, index) => (
          <Item
            focus={focusList[index]}
            key={String(topLeft[0]) + String(topLeft[1])}
            top={topLeft[0]}
            left={topLeft[1]}
          />
        ))}
      </div>
    </div>
  )
}

export default Grid
