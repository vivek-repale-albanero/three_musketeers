import React from "react";
import './ColorDrag.scss'

const DropTarget = ({ onDrop, children }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log('drag end!')
  };

  const handleDrop = (e) => {
    console.log('inside handle drop',e)
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    onDrop(data,{x:e.clientX,y:e.clientY},e);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop} className="__bigBox__wrapper">
      {children}
    </div>
  );
};

export default DropTarget;
