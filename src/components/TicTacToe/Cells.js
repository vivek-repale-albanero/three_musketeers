import { Grid, Paper } from "@mui/material";

const Cell = ({ cell, onClick }) => {

    return <div >
        <Paper
            variant="outlined"
            onClick={onClick}
            style={{
                height: 120,
                width: 120,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                margin: 'auto',


            }}
        >
            <img src={cell} alt="" />
        </Paper>
    </div>
}


export default Cell

