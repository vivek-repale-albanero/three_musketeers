import React, { useEffect, useState } from 'react';

// TreeNode component represents a node in the tree
const TreeNode = ({ data }) => {
    const[newData]=data
  // State to track whether the checkbox is checked or not
  const [isChecked, setChecked] = useState(false);

  const filterSingleParentdata = ()=>{

    // let Newdata = data.filter((item)=>item.id!==id)
    // multidata(Newdata)

  }

//   console.log(data,"singledata")
  useEffect(()=>{

    // filterSingleParentdata()

  },[])

//   console.log(data)

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    // Update the state based on the checkbox status
    setChecked(event.target.checked);
  };

//   console.log(newData,"newData")
  return (
    <div style={{margin:"auto"}}>
    <dt>
      {/* Checkbox for the current node */}
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      {/* Label for the current node */}
      <label>{newData?.parentName}</label>

      {/* Render child items if there are any */}
      {newData?.child?.length > 0 && (
        <> 
          {/* Map through each child and render a list item with a checkbox and label */}
          {newData?.child?.map((child, index) => (
            <dd key={child.id}>
              <input type="checkbox" />
              <label>{child.name}</label>
            </dd>
          ))} 
        </>
      )} 
    </dt>
    </div>
  );
};


export default TreeNode;
