import React, { useState, useContext } from 'react';
import { Box, Input, Typography, Modal, Select, SelectChangeEvent, FormControl, MenuItem, InputLabel, Icon } from '@material-ui/core';
import AddButton from './AddButton';
import '../../styles/MissingPage.scss'
import { MissingPageContext } from '../../Context';
import EyeComponent from './EyeComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Address, setAddress] = useState({ Name: "", Country: "", State: "", City: "" });
    const [Memberdetails, setMemberdetails] = useState({ MemberName: "", Role: "" })
    const { orgdata, setorgdata, singleorg, setsingleorg, Allmember, setAllMember } = React.useContext(MissingPageContext)
    const [id, setid] = useState(6)


    const handleChange = (event) => {
        const { name, value } = event.target
        setAddress({ ...Address, [name]: value })
    };
    const HandleMemberChange = (e) => {
        const { name, value } = e.target
        setMemberdetails({ ...Memberdetails, [name]: value })
    }

    const handleclick = () => {
        const object = {
            id: id,
            OrgName: Address.Name,
            countryName: Address.Country,
            stateName: Address.State,
            city: Address.City,
            See: <EyeComponent data={{ id, OrgName:Address.Name,  countryName: Address.Country, stateName: Address.State, city: Address.City, }} />,
            Delete: <Icon>delete</Icon>,
            // Memberscount:Allmember.length
        }
        console.log(object,"obj")
        setid(id+1)
        setAllMember((prev) => [...prev, Memberdetails])
 
        console.log(Memberdetails,Allmember,"asdfadsfadsfd")
        setsingleorg((prev) => [...prev, object])
        setOpen(false)

    }
    console.log(Memberdetails,Allmember,"asdfadsfadsfd")


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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>



                    <Box>
                        <Typography id="modal-modal-title" variant="h5" component="h4">
                            Add Member Details
                        </Typography>
                        <Input value={Memberdetails.MemberName} placeholder="Member Name" onChange={HandleMemberChange} name='MemberName' width="100%" style={{ display: 'block', margin: "10px auto" }} />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Memberdetails.Role}
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
                    <AddButton onClick={handleclick} style={{ backgroundColor: "teal", color: "white", display: "block", margin: "20px auto" }}>Add Details</AddButton>
                </Box>
            </Modal>
        </div>
    );
}
