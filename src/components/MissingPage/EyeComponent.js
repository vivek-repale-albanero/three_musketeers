import { Icon, Modal, Box, FormControl, InputLabel, Select, MenuItem, Typography, Input } from '@material-ui/core'
import React, { useState } from 'react'
import AddButton from './AddButton'

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
function EyeComponent({ data }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id, OrgName, countryName, stateName, city } = data
    const [init, setinit] = useState({ OrgName, countryName, stateName, city })

    return (
        <div>
            <Icon onClick={handleOpen}>visibility</Icon>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h4">
                        Organization Details
                    </Typography>
                    <Input
                        value={init.OrgName}
                        name='Name'
                        // onChange={handleChange} 
                        placeholder='Organization Name' width="100%" style={{ display: 'block', margin: "10px auto" }} />

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="Country"
                                value={init.countryName}
                                label="Country"
                            // onChange={handleChange}
                            >
                                <MenuItem value={init.countryName}>{init.countryName}</MenuItem>
                                <MenuItem value={10}></MenuItem>
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
                                value={init.stateName}
                                label="State"
                                name="State"
                            // onChange={handleChange}
                            >
                                <MenuItem value={init.stateName}>{init.stateName}</MenuItem>
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
                                value={init.city}
                                label="City"
                                name="City"
                            // onChange={handleChange}
                            >
                                <MenuItem value={init.city}>{init.city}</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>



                    <Box>

                        <Input
                            // value={Memberdetails.MemberName}
                            placeholder="Members Count"
                            // onChange={HandleMemberChange}
                            name='Member Count' width="100%"
                            style={
                                {
                                    display: 'block',
                                    margin: "10px auto"
                                }} />


                    </Box>

                    <AddButton
                        // onClick={handleclick}
                        style={
                            {
                                backgroundColor: "teal",
                                color: "white",
                                display: "block",
                                margin: "20px auto"
                            }}
                    >Save
                    </AddButton>


                </Box>
            </Modal>
        </div>
    )
}

export default EyeComponent
