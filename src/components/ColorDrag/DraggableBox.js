import React from "react";
const DraggableBox = ({ color, text, onDragStart,showText }) => {
    const handleDragStart = (e) => {
        console.log('drag start',e)
      onDragStart({boxData:{color,text,showText},event:e});
    };
  
    return (
      <div
        style={{
          width: '150px',
          height: '150px',
          backgroundColor: color,
          color: 'black',
          margin: '8px',
          cursor: 'move',
          border:'1px solid black'
          
        }}
        draggable
        onDragStart={handleDragStart}
      >
        {showText?text:''}
      </div>
    );
  };

  export default DraggableBox