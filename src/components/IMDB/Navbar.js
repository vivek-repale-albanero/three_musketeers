// import imdb from "../../assets/imdb.svg";

// import React from "react";
// import "./Navbar.scss";

// export default function Navbar() {
//   return (
//     // <div className="__navbar">
//     //   <div className="__navbar__wrapper">
//     //     <div className="__navbar__icon">
//     //       <img src={imdb} />
//     //     </div>

//     //   </div>
//     // </div>

//   );
// }

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import "./Navbar.scss";

import imdbIcon from "../../assets/imdb.png";
import { TextForm, InputAdornment } from "@platform/service-ui-libraries";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: "brown",
//   },
//   toolBar: {

//     marginRight: "200px",
//     marginLeft: "200px",
//   },
//   imdbIcon: {
//     margin: theme.spacing(2),
//     color:'white'
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     color: "white",
//     display: "flex",
//     gap: "20px",
//   },
//   title: {
//     flexGrow: 1,
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "500px",
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   navitem: {
//     color: "white",
//     margin: "30px",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

export default function Navbar() {
  return (
    // <div className={classes.root}>
    //   <AppBar position="static">
    //     <div className={classes.toolBar}>
    //       <Toolbar>
    //         <div className={classes.imdbIcon}>
    //           <Typography>IMDB</Typography>
    //         </div>

    //         <IconButton
    //           edge="start"
    //           className={classes.menuButton}
    //           color="inherit"
    //           aria-label="open drawer"
    //         >
    //           <MenuIcon />
    //           <Typography>Menu</Typography>
    //         </IconButton>

    //         <div className={classes.search}>
    //           <div className={classes.searchIcon}>
    //             <SearchIcon />
    //           </div>
    //           <InputBase
    //             placeholder="Search…"
    //             classes={{
    //               root: classes.inputRoot,
    //               input: classes.inputInput,
    //             }}
    //             inputProps={{ "aria-label": "search" }}
    //           />
    //         </div>

    //         {/* <div className={classes.navItem}>
    //             <Typography>
    //                 IMDB Pro
    //             </Typography>
    //         </div> */}

    //         <div className={classes.navItem}>
    //           <Typography>WatchList</Typography>
    //         </div>
    //       </Toolbar>
    //     </div>
    //   </AppBar>
    // </div>

    <div className="__navbar">
      <AppBar>
        <div style={{ padding: "0 100px" }}>
          <Toolbar>
            <div className="__navItems__wrapper">
              <div className=".__imdbIcon">
                <img style={{ width: "50px", height: "50px" }} src={imdbIcon} />
              </div>

              <div className="__navItem__menu">
                <MenuIcon className="__menu__icon" />
                <Typography className="__menu__icon">Menu</Typography>
              </div>

              <div className="__nav__searchbar">
                <TextForm
                placeholder='Search movies'
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className=".__imdbIcon">
                <img
                  style={{ width: "40px", height: "40px" }}
                  src="https://m.media-amazon.com/images/G/01/IMDbPro/images/IMDbPro_brand_logo_small._SL1280_FMpng_.png"
                />
              </div>

              <div className="__navItem__menu">
                <AddBoxIcon className="__menu__icon" />
                <Typography className="__menu__icon">Wishlist</Typography>
              </div>

              <Typography style={{color:'white',fontWeight:'bold'}}>Sign in</Typography>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}
