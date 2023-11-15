import React, { useState } from "react";
import { AlbaButton, TextForm } from "@platform/service-ui-libraries";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from "@material-ui/lab/TreeItem";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
    
    
    margin:'100px auto',
    padding:"20px",
    textAlign:"center"
  },
});

function SeeAllParentDetail({ data }) {
  const classes = useStyles();

  const [checked, setChecked] = useState({});
  console.log("data",data,)
  console.log("checked",checked,)

// iterate to parent any child is checked then parent is going to checked
  const handleToggle = (id) => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked, [id]: !prevChecked[id] };

      // If a child is checked or unchecked, update the parent's checked state
      data.forEach((parent) => {
        if (parent.child.some((item) => newChecked[item.id])) {
          newChecked[parent.id] = true;
        } else {
          newChecked[parent.id] = false;
        }
      });

      console.log("NewChecked",newChecked)

      return newChecked;
    });
  };
//This function checks whether all children of a given parent are checked.
  const allChildrenChecked = (parent) => {
    return parent.child.every((item) => checked[item.id]);
  };

  //It handle parent checked if we checked the parent 
  const handleParentChange = (parent) => {
    const newChecked = { ...checked };
    newChecked[parent.id] = !newChecked[parent.id];

    parent.child.forEach((item) => {
      newChecked[item.id] = newChecked[parent.id];
    });
    console.log('handleParentChange',newChecked)

    setChecked(newChecked);
  };

  return (
    <TreeView className={classes.root}>
      {data.map((parent) => (
        <TreeItem
          key={parent.id}
          nodeId={parent.id.toString()}
          label={
            <div>
              <Checkbox
                checked={checked[parent.id] || false}
                indeterminate={!allChildrenChecked(parent) && parent.child.some((item) => checked[item.id])}
                onChange={() => handleParentChange(parent)}
              />
              {parent.parentName}
            </div>
          }
        >
          {parent.child.map((item) => (
            <TreeItem
              key={item.id}
              nodeId={item.id.toString()}
              label={
                <div>
                  <Checkbox
                    checked={checked[item.id] || false}
                    onChange={() => handleToggle(item.id)}
                  />
                  {item.name}
                </div>
              }
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  
  );
}

export default SeeAllParentDetail;
