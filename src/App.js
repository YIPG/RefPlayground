import React, { useState, useEffect, createRef } from "react"

const Item = props => {
  const { top, left } = props
  const [click, setClick] = useState(false)

  let itemRef = createRef()

  useEffect(() => {
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
    const { key } = target
    key === "Enter" && setClick(!click)
    key === "ArrowRight" && props.rightArrowClick()
    key === "ArrowLeft" && props.leftArrowClick()
  }

  return (
    <div
      ref={itemRef}
      style={click ? clickedStyle : style}
      tabIndex={0}
      onClick={() => setClick(!click)}
      onKeyDown={target => handleKeyDown(target)}
    />
  )
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focusIndex: 0
    }
  }

  rightArrowClick() {
    this.state.focusIndex < 25 &&
      this.setState({
        focusIndex: this.state.focusIndex + 1
      })
  }

  leftArrowClick() {
    this.state.focusIndex > 0 &&
      this.setState({
        focusIndex: this.state.focusIndex - 1
      })
  }

  render() {
    const length = 50

    // 5×5のグリッドを作成
    // [[0,0],[0,40]...[40,0],[40,40]...[160,160]]
    const pointList = [...Array(5)]
      .map((_, i) => [...Array(5)].map((_, j) => [i * length, j * length]))
      .flat()

    return (
      <div
        style={{
          display: "flex",
          margin: "3rem 20rem",
          flexDirection: "column"
        }}
      >
        <div style={{ position: "relative" }}>
          {pointList.map((topLeft, index) => (
            <Item
              rightArrowClick={this.rightArrowClick.bind(this)}
              leftArrowClick={this.leftArrowClick.bind(this)}
              focus={index === this.state.focusIndex}
              key={String(topLeft[0]) + String(topLeft[1])}
              top={topLeft[0]}
              left={topLeft[1]}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Grid
