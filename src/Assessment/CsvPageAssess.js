import React,{useState,useMemo,useRef, useEffect} from "react";
import { assessCsv } from "../Context";
import {
    AlbaButton
  } from "@platform/service-ui-libraries";
import Layout from "../Layout/Layout";
import CsvModal from "./CsvModal";
import { Table } from "@platform/primary-table";
import EditTable from "../components/EditTable";
import "./CsvPageAssess.scss"




  function CsvPageAssess (){
   
   
    const [csvData, setCsvData] = useState([]);
    const [csvHeaders,setCsvHeaders] = useState([]);
    const [uploadModal,setUploadModal] = useState(false)
    const [showTable, setShowTable] = useState(false);
    const [filename,setFileName] =useState(null);
    const [isUploading,setIsUploading] = useState(false);
    const [uploadErrMsg,setUploadErrMsg] =useState(null);
    const [columns,setColumns]=useState([
        {
            name: "Actions",
            isComponent: true,
            componentId: "ACTION_PANEL",
            props: {
                actions: [
                    {
                        icon: "edit",
                        title: "Edit File",
                        isComponent:true,
                        componentId: "CLICK_ACTION",
                        onClick: (row) => {
                            openEditModal(row);
                          },
                      },
                  ],
              },
          },
      ]);
    const [csvFormModal, setCsvFormModal] = useState({
        status: false,
        edit: false,
        data: {}
      })
      const [showDownload, setShowDownload] = useState(false);

    const csvfileInputRef = useRef(null);
    
     
    const processData = (CsvFile) => {
        const lines = CsvFile.split("\n");
        const headers = lines[0].split(",");
        const data = [];
        for (let i = 0; i < lines.length; i++) {
          const values = lines[i].split(",");
          const entry = {};
          for (let j = 0; j < headers.length; j++) {
            entry[headers[j]] = values[j];
          }
          data.push(entry);
        }
    
        if (Object.keys(data[0]).length === 1 && data[0].hasOwnProperty("")) {
          data.shift();
        }

        setCsvHeaders(headers)
        const fieldValues = data.slice(1,data.length)
        setCsvData(fieldValues)
        console.log(fieldValues)
      };
      
      // console.log()
    const onFileChange =(event)=>{
        const file = event.target.files[0];
        if(file){
            setIsUploading(true)
            setFileName(file.name)

            const fileReader = new FileReader()
            fileReader.onload = function (event){
                const CsvFile = event.target.result;
                processData(CsvFile)
                setIsUploading(false)
            }
            fileReader.readAsText(file);
        }
    }

    const onImport = ()=>{
        setUploadModal(true)
     
    }
    const modalClose = ()=>{
         setUploadModal(false)
    } 
    
    const onUpload =()=>{
        modalClose() 
          createColumns(csvData[0]);
    }
   
   
    const openEditModal = (row) => {
        setCsvFormModal({
          ...csvFormModal,
          status: true,
          edit: true,
          data:row
        })
      };
    const closeCsvModal = () => {
        setCsvFormModal({
          ...csvFormModal,
          status: false,
          edit: false,
          data: {}
        })
      }

      const saveData = (newData, isAdding) => {

        const updated = csvData.map((ele)=>  (ele.id === newData.id)? ele = newData : ele)
         setCsvData(updated)
         setShowDownload(true);

      }
      

      const handleDownloadEditedFile = () => {
        // Create a CSV file with the updated data
        const csvContent = "data:text/csv;charset=utf-8," +csvHeaders.join(',')+"\n"+ csvData.map(row => Object.values(row).join(',')).join('\n');
        console.log("head",csvHeaders)
        console.log("csvCOntent",csvContent)
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "edited_data.csv");
        document.body.appendChild(link);
        link.click();
      };

   

    const csvViewTableMetaData =(actions)=>{

      return{
            columns:columns,
            data: actions?.data,
            enableDictionary:true,
        }
    }
    const createColumns = (obj) =>{
        const columnHead =Object.keys(obj).map((val)=>({name:val,id:val}))
        setColumns([...columnHead,...columns])
        setTimeout(()=>{
            setShowTable(true);
        },200)
     }

   

     

    const csvassess = useMemo (()=>{
        return{
            uploadModal,
            modalClose,
            onFileChange,
            csvfileInputRef,
            filename,
            uploadErrMsg,
            isUploading,
            onUpload
            }
           },[
            uploadModal,
            modalClose,
            onFileChange,
            csvfileInputRef,
            filename,
            uploadErrMsg,
            isUploading,
            onUpload
           ])
    return(
        <>
        <Layout>
        <assessCsv.Provider value={csvassess}>
           <div className="butn_div">

            <AlbaButton variant="success" onClick={onImport}>
               Import CSV    
            </AlbaButton>
            {showDownload && (
                <AlbaButton
                variant="success"
                onClick={handleDownloadEditedFile}
                >
                  Download Edited File
                </AlbaButton>
        )}
        </div>
             
             <CsvModal/>

            {showTable  &&
            <Table tableProps={{
                ...csvViewTableMetaData({
                    extractColumnsFromData:true,
                    openEditModal 
                }),
                data:csvData 
            }}/>
        }
             {csvFormModal.status && csvFormModal.edit && (
          <EditTable
            open={csvFormModal.status && csvFormModal.edit}
            data={csvFormModal.data}
            onSave={(newData) => saveData(newData, false)}
            onCancel={closeCsvModal}
            isAdding={false}
          />
        )}
            
        </assessCsv.Provider>
        </Layout>
        </>
    )
  }


  export default CsvPageAssess;