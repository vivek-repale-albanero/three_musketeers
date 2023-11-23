import React from "react";

function ParacticeStyling() {
  return (
    <div
      className="al-pb-10"
      style={{
        height: "900px",
        border: "1px solid red",
        width: "90%",
        margin: "20px auto ",
      }}
    >
      hey
      <div>
        <div>
          <div
            className="al-flex al-row-dir al-gap-10 al-pt-10"
            style={{ height: "600px", border: "1px solid pink" }}
          >
            <div
              style={{ border: "1px solid red", height: "100px", width: "10%" }}
            >
              1
            </div>
            <div
              style={{
                border: "1px solid black",
                height: "100px",
                width: "10%",
              }}
            >
              {" "}
              2
            </div>
            <div
              style={{
                border: "1px solid green",
                height: "100px",
                width: "10%",
              }}
            >
              3
            </div>
            <div
              style={{
                border: "1px solid green",
                height: "100px",
                width: "10%",
              }}
            >
              3
            </div>{" "}
            <div
              style={{
                border: "1px solid green",
                height: "100px",
                width: "10%",
              }}
            >
              3
            </div>
            <div
              style={{
                border: "1px solid green",
                height: "100px",
                width: "10%",
              }}
            >
              3
            </div>
            <div
              style={{
                border: "1px solid blue",
                height: "100px",
                width: "10%",
              }}
            >
              4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParacticeStyling;
