import React, { useEffect, useState } from "react";
import { AlbaAutocomplete } from "@platform/service-ui-libraries";
import { Typography } from "@platform/service-ui-libraries";
export default function PlatformAutoComplete({ setProducts }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const [options, setOptions] = useState([]);
  const [loding, setLoding] = useState(false);
  const [defaultVal, setDefaultVal] = useState([]);

  const fetchData = async () => {
    try {
      setLoding(true);
      const response = await fetch(`http://localhost:3000/products`);
      const data = await response.json();

      setOptions(
        data.map((elem) => {
          return { ...elem, id: elem.id, label: elem.name };
        })
      );
      setLoding(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoding(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("options",options);

  // const handleSearch = () => {};

  //   const handleItemsSelected = (e) => {
  //     setSelectedItems([...selectedItems, e.target.value]);
  //     setDefaultVal(e.target.value);
  //   };

  
  const handleProductsTableChange = (items) => {
    console.log("getting item", items);
    setSelectedItems([...items]);
    setDefaultVal([...defaultVal, ...items]);
    setProducts(items);
  };

  console.log(defaultVal, "defa");

  return (
    <div>
      <AlbaAutocomplete
        options={options}
        // defaultVal={defaultVal}
        updateValue={(val) => handleProductsTableChange(val.selectedItems)}
        multiple={true}
        selectAll={true}
//         customListRender={({ availableItems ,handleItemSelected}) => {
// return availableItems.map(item=>(
//     <div key={item.id} style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:'20px',marginBottom:'10px',padding:'10px',borderBottom:'1px solid black'}}>
// <Typography>
//     {item.name}
// </Typography>
// <Typography>
//    Price: {item.price}
// </Typography>
//     </div>
// ))
//             }}
      />
    </div>
  );
}
