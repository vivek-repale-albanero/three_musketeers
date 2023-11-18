import React from "react";
import Navbar from "../components/IMDB/Navbar";
import './LayoutIMDB.scss'

function LayoutIMDB({ children }) {
  return (
    <div className="__imdb__layout">
       

      <Navbar />
      <div className="__imdb__content">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default LayoutIMDB;
