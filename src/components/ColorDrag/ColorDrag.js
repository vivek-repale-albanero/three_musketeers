import React, { useEffect, useState } from "react";
import { Box } from "@platform/service-ui-libraries";
import "./ColorDrag.scss";
import { useAutocomplete } from "@material-ui/lab";
import { useScrollTrigger } from "@material-ui/core";
import DraggableBox from "./DraggableBox";
import DropTarget from "./DropTarget";
import * as comps from "@platform/service-ui-libraries";

export default function ColorDragComp() {
  //const [isMatched, setIsMatched] = useState(false);
  const [cannotBeAdded, setCannotBeAdded] = useState(false);
  //const [matched,setMatched]=useState(false)

  useEffect(() => {
    if (cannotBeAdded) {
      window.alert("Cannot be added!");
    }
  }, [cannotBeAdded]);

  //if(matched) window.alert('Matched!')
  const colorObjects = [
    {
      text: "yellow",
      color: "yellow",
      showText: false,
    },
    {
      text: "green",
      color: "green",
      showText: false,
    },
    {
      text: "red",
      color: "red",
      showText: false,
    },
    {
      text: "orange",
      color: "orange",
      showText: false,
    },
  ];

  const colorObjectsScrambled = [
    {
      text: "green",
      color: "white",
      showText: true,
    },
    {
      text: "yellow",
      color: "white",
      showText: true,
    },
    {
      text: "orange",
      color: "white",
      showText: true,
    },
    {
      text: "red",
      color: "white",
      showText: true,
    },
  ];
  const [itemsInBigbox, setItemsInBigbox] = useState([]);

  const handleDragStart = ({ boxData, event }) => {
    const data = JSON.stringify(boxData);
    event.dataTransfer.setData("text/plain", data);
    //console.log("drag start!");
  };
  //let shouldBreak = false;
  const handleDrop = (droppedBox, position, e) => {
    setCannotBeAdded(false);

    const isMatch = itemsInBigbox?.some(
      (box) => box.color === droppedBox.color && box.text === droppedBox.text
    );

    if (isMatch) {
      setCannotBeAdded(true);
    }

    !isMatch &&
      setItemsInBigbox(
        itemsInBigbox?.map((box) => {
          // if (shouldBreak) return;
          //const xOK = Math.abs(box.position.x - position.x) <= 450;
          const yOK = Math.abs(box.position.y - position.y) <= 350;
          console.log(
            "box item",
            box,
            " and dropped item",
            droppedBox,
            "having position",
            position,
            // "xok is",
            // xOK,
            " and yOK is ",
            yOK
          );
          if (yOK && box.color === droppedBox.text) {
            // console.log("matched in the handleDrop!");
            // shouldBreak = true;
            setCannotBeAdded(false);
            return { ...box, showText: true };
          } else {
            setCannotBeAdded(true);
            return box;
          }
        })
      );

    if (!isMatch && !droppedBox.showText) {
      setItemsInBigbox([...itemsInBigbox, { ...droppedBox, position }]);
      setCannotBeAdded(false);
    }
    console.log("In the drag drop and cannotbeadded is", cannotBeAdded);
  };
  //console.log("items in box", itemsInBigbox);
  return (
    <div className="__body">
      <div className="__smallBox__wrapper">
        {/* Color boxes which are available and to be dragged in the right box */}
        <Box>
          <div className="__smallBox__wrapper">
            {colorObjects.map((item) => (
              <DraggableBox
                key={item.color}
                color={item.color}
                text={item.text}
                showText={item.showText}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </Box>
        {/* Color boxes which are to be matched with the already present boxes in the right box */}
        <Box>
          <div className="__smallBox__wrapper">
            {colorObjectsScrambled.map((item) => (
              <DraggableBox
                key={item.color}
                color={item.color}
                text={item.text}
                onDragStart={handleDragStart}
                showText={item.showText}
              />
            ))}
          </div>
        </Box>
      </div>

      {/* Comp with dragged comps */}

      <DropTarget onDrop={handleDrop}>
        {itemsInBigbox?.map((box) => {
          //console.log("displaying box ", box);
          return (
            <div
              key={box.text}
              style={{
                width: "150px",
                height: "150px",
                background: box.color,
                color: "black",
                margin: "8px",
                border: "2px solid black",
                //   position: 'absolute',
                //   left: '60%',
                //   top: box.position.y + 'px',
              }}
            >
              {box.showText ? box.text : ""}
            </div>
          );
        })}
      </DropTarget>
    </div>
  );
}
