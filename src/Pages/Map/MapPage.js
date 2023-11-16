import React, { useState, useMemo, useRef, useEffect } from "react";
import { CSVMap } from "../../Context";
import Layout from "../../Layout/Layout";
import FileUploadModal from "./FileuploadModal";
// import { Container } from "@material-ui/core";
import {
  AlbaButton,
  Container,
  Box,
  AlbaAutocomplete,
  Typography,
} from "@platform/service-ui-libraries";
import "./MapPage.scss";

function MapPage() {
  const fileUploadRef = useRef(null);
  const [fileUploadmodal, setFileUploadModal] = useState({
    status: false,
    isSource: false,
  });
  const [fileSelected, setFileSelected] = useState(null);
  const [sourceFile, setSourceFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const [defaultOpotions, setDefaultOptions] = useState([]);
  const [isSave, setIsSave] = useState(false);

  const openModal = () => {
    setFileUploadModal({ ...fileUploadmodal, status: true, isSource: true });
  };
  const closeModal = () => {
    setFileUploadModal({ ...fileUploadmodal, status: false, isSource: false });
  };
  const openTargetModal = () => {
    setFileUploadModal({ ...fileUploadmodal, status: true, isSource: false });
  };

  const onFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const csvData = event.target.result;
        setFileSelected(csvData);
      };
      fileReader.readAsText(file);
    }
  };

  const onFileUpload = () => {
    const lines = fileSelected.split("\n");
    const headers = lines[0].split(",");
    if (fileUploadmodal.status && fileUploadmodal.isSource) {
      const options = headers.map((val, index) => ({ id: index, label: val }));
      setSourceFile(options);
      closeModal();
    } else {
      setTargetFile(headers);
      closeModal();
    }
  };
  //   console.log("source", sourceFile);
  //   console.log("target",targetFile)

  const onAutoCompleteUpdate = (options, index) => {
    setDefaultOptions((prev) =>
      prev.map((item, ind) => {
        if (ind === index) return { ...item, options: options };
        return item;
      })
    );
  };
  const getValue = (ele) => {
    const value = defaultOpotions.filter((val) => val.id === ele);
    //  return value
    // console.log("value",value)
  };

  useEffect(() => {
    setDefaultOptions(targetFile?.map((item) => ({ id: item, options: null })));
  }, [targetFile]);
  console.log("selected", defaultOpotions);
  const csvMapValues = useMemo(() => {
    return {
      openModal,
      closeModal,
      fileUploadmodal,
      fileUploadRef,
      onFileSelect,
      onFileUpload,
    };
  }, [
    openModal,
    closeModal,
    fileUploadmodal,
    fileUploadRef,
    onFileSelect,
    onFileUpload,
  ]);
  return (
    <>
      <Layout>
        <CSVMap.Provider value={csvMapValues}>
          <Container>
            <div className="Parent_container">
              <Box className="containerLeft">
                <div className="buttonCont">
                  <AlbaButton variant="success" onClick={openModal}>
                    Source CSV
                  </AlbaButton>
                  <AlbaButton variant="success" onClick={openTargetModal}>
                    Target CSV
                  </AlbaButton>
                </div>

                <Box>
                  {sourceFile && targetFile ? (
                    <div className="inner_container">
                      <div className="content">
                        {targetFile.map((ele, index) => (
                          <div key={ele} className="eleMap">
                            <div className="autocomp">
                              <AlbaAutocomplete
                                dataTestId="alba-autocomplete"
                                label="Source File"
                                placeholder="Select Options"
                                loading={false}
                                //   defaultValue={()=>getValue(ele)}
                                options={sourceFile}
                                //   multiple={true}
                                selectAll={true}
                                shrinkList={true}
                                disabled={false}
                                updateValue={(e) => {
                                  onAutoCompleteUpdate(e.selectedItems, index);
                                }}
                              />
                            </div>
                            <div className="labelName">{ele}</div>
                          </div>
                        ))}
                      </div>

                      <div className="btnSave">
                      <AlbaButton
                        variant="success"
                        onClick={() => setIsSave(true)}
                        >
                        Save
                      </AlbaButton>
                        </div>
                    </div>
                  ) : null}
                </Box>
              </Box>
              <Box className="containerRight">
                <Typography variant="h3">Mapped Text</Typography>

                <div className="displayContent">
                {isSave ? (
                  <div className="displayValues">
                    {defaultOpotions.map((item, index) => (
                      <div key={index} className="display">
                        <div className="displayLabel">
                        {item.id}
                        </div>
                        <div className="displayValue">
                          {item.options.map((option, ind) => (
                            <div key={ind}>{option.label}</div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                </div>
              </Box>
            </div>
          </Container>

          {/* Modal for file upload */}
          <FileUploadModal />
        </CSVMap.Provider>
      </Layout>
    </>
  );
}

export default MapPage;
