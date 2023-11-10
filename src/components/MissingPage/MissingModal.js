import React, { useState, useContext, useEffect } from 'react';
import { Box, Input, Typography, Modal, Select, SelectChangeEvent, FormControl, MenuItem, InputLabel, Icon, Button } from '@material-ui/core';
import AddButton from './AddButton';
import '../../styles/MissingPage.scss'
import { MissingPageContext } from '../../Context';
import EyeComponent from './EyeComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const arr = ['SDE-1', "SDE-2", "SDE-3"]

export default function BasicModal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Address, setAddress] = useState({ Name: "", Country: "", State: "", City: "", MemberDetails: [] });
    const [NewMemberdetails, setMemberdetails] = useState({ MemberName: "", Role: "", object: {}, id: 6 })
    const [AllofMember, SetAllofMember] = useState([])
    const { orgdata, setorgdata, singleorg, setsingleorg, Allmember, setAllMember } = React.useContext(MissingPageContext)



    const handleChange = (event) => {
        const { name, value } = event.target
        setAddress({ ...Address, [name]: value })

    };

    const HandleMemberChange = (e) => {
        const { name, value } = e.target
        setMemberdetails({ ...NewMemberdetails, [name]: value })


    }


    const handleclick = () => {
        let object = {
            id: NewMemberdetails.id,
            OrgName: Address.Name,
            countryName: Address.Country,
            stateName: Address.State,
            city: Address.City,
            See: <EyeComponent data={{ id: NewMemberdetails.id, OrgName: Address.Name, countryName: Address.Country, stateName: Address.State, city: Address.City, }} />,
            Delete: <Icon>delete</Icon>,
            MemberDetails: []
        }

        SetAllofMember((prev) => [...prev, {id:NewMemberdetails.id,...NewMemberdetails}])
        setMemberdetails({ MemberName: "", Role: "", object, id: ++NewMemberdetails.id })

    }

    console.log(AllofMember)

    const HandleEditDataOfOldMember=(e,id)=>{

        const {name,value} = e.target

        let Newdata=AllofMember.map((item)=>{
            if(item.id===id){
               return {...item,[name]:value}
            }else{
                return item
            }
        })

        SetAllofMember(Newdata)

        console.log(Newdata)
        console.log(e.target.value,id)

    }




    const HandleMemberClick = () => {
        setsingleorg((prev) => [...prev, { ...NewMemberdetails.object, MemberDetails: AllofMember }])
        setAddress({ Name: "", Country: "", State: "", City: "", MemberDetails: [] })
        SetAllofMember([])
        setOpen(false)
    }

    return (
        <div>
            <AddButton onClick={handleOpen}>Add Organization</AddButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h4">
                        Add New Organization
                    </Typography>
                    <Input value={Address.Name} name='Name' onChange={handleChange} placeholder='Organization Name' width="100%" style={{ display: 'block', margin: "10px auto" }} />

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="Country"
                                value={Address.Country}
                                label="Country"
                                onChange={handleChange}
                            >
                                {orgdata.map(({ country }) => {
                                    return country.map(({ countryName }) => {
                                        return <MenuItem key={countryName} value={countryName}>{countryName}</MenuItem>
                                    })
                                })}



                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Address.State}
                                label="State"
                                name="State"
                                onChange={handleChange}
                            >
                                {orgdata.map(({ country }) => {
                                    return country.map(({ countryName, states }) => {
                                        if (Address.Country == countryName) {
                                            return states.map(({ stateName }) => {
                                                return <MenuItem key={stateName} value={stateName}>{stateName}</MenuItem>
                                            })

                                        }

                                    })
                                })}

                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Address.City}
                                label="City"
                                name="City"
                                onChange={handleChange}
                            >

                                {orgdata.map(({ country }) => {
                                    return country.map(({ countryName, states }) => {
                                        return states.map(({ stateName, cities }) => {
                                            if (Address.State == stateName) {
                                                return cities.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)
                                            }
                                        })
                                    })
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                    </Box>
                    <Box>
                        <Typography style={{ marginTop: "15px" }} id="modal-modal-title" variant="h5" component="h4">
                            Add Member
                        </Typography>
                        {AllofMember.length > 0 && AllofMember.map((item, i) => {

                            return <Box key={i} sx={{ minWidth: 120 }}>
                                <Input value={item.MemberName} placeholder="Member Name" onChange={(e)=>HandleEditDataOfOldMember(e,item.id)} name='MemberName' width="100%" style={{ display: 'block', margin: "10px auto" }} />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={item.Role}
                                        label="Role"
                                        name="Role"
                                        onChange={(e)=>HandleEditDataOfOldMember(e,item.id)}>
                                        {arr.map((Newitem, i) => {
                                            if (Newitem == item.Role) {
                                                return <MenuItem key={i} value={item.Role}>{item.Role}</MenuItem>
                                            } else {
                                                return <MenuItem key={i} value={Newitem} >{Newitem}</MenuItem>
                                            }

                                        })}
                                    </Select>
                                    {/* <Button onClick={(e)=>HandleEditDataOfOldMember(eitem.id)} style={{backgroundColor:"teal",color:"white"}}>Edit</Button> */}
                                </FormControl>
                            </Box>
                        })}
                        <Input value={NewMemberdetails.MemberName} placeholder="Member Name" onChange={HandleMemberChange} name='MemberName' width="100%" style={{ display: 'block', margin: "10px auto" }} />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={NewMemberdetails.Role}
                                    label="Role"
                                    name="Role"
                                    onChange={HandleMemberChange}>
                                    <MenuItem value="SDE-1">SDE-1</MenuItem>
                                    <MenuItem value="SDE-2">SDE-2</MenuItem>
                                    <MenuItem value="SDE-3">SDE-3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <AddButton onClick={handleclick} style={{ display: "block", textAlign: "left", backgroundColor: "teal", color: "white", display: "block", margin: "20px auto" }}>Add Member </AddButton>
                    <AddButton onClick={HandleMemberClick} style={{ display: "block", backgroundColor: "teal", color: "white", display: "block", margin: "20px auto" }}>Save </AddButton>

                    {/* <AddButton onClick={handleclick} style={{ backgroundColor: "teal", color: "white", display: "block", margin: "20px auto" }}>Add Member Details</AddButton> */}

                </Box>
            </Modal>
        </div>
    );
}
