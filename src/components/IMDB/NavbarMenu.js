import { Menu, MenuItem } from "@material-ui/core";
import React from "react";

export default function NavbarMenu({ open, handleClose }) {
  const openMenu = Boolean(open);

  return (
    <Menu id="basic-menu" anchorEl={open} open={openMenu} onClose={handleClose}>
      <MenuItem>Top 250 movies</MenuItem>
      <MenuItem>Most Popular movies</MenuItem>

      <MenuItem>Browse Movie by Genre</MenuItem>
    </Menu>
  );
}
