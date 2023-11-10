
import React, { useState, useCallback, useContext, useEffect } from "react";
import { Table } from "@platform/primary-table";
import { MissingPageContext, PermissionContext } from "../../Context";
import { GetRows } from "../MissingPage/OrganizationTable";
import { Box, Button, Typography, Modal } from "@material-ui/core";
import useDebouncing from "./useDebouncing";
import axios from "axios";
import {
  AlbaButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogActions,
  DraggableModal,
  IconButton,
  SelectForm,
  DialogContent,
  TextForm,
} from "@platform/service-ui-libraries";
// import CompareFilesModal from "../../../../platform-ui-modals-dev/src/components/CompareFiles/AutomationDialogs/CompareFilesModal";
let Metadata = [
  {
    id: 1,
    OrgName: "Acme Corporation",
    countryName: "USA",
    stateName: "California",
    city: "Los Angeles",
  },
  {
    id: 2,
    OrgName: "Tech Innovators",
    countryName: "USA",
    stateName: "New York",
    city: "New York City",
  },
  {
    id: 3,
    OrgName: "Global Solutions Ltd.",
    countryName: "Canada",
    stateName: "Ontario",
    city: "Toronto",
  },
  {
    id: 4,
    OrgName: "Dynamic Systems Inc.",
    countryName: "USA",
    stateName: "Texas",
    city: "Austin",
  },
  {
    id: 5,
    OrgName: "Infinite Technologies",
    countryName: "UK",
    stateName: "England",
    city: "London",
  },
  {
    id: 6,
    OrgName: "Innovate Labs",
    countryName: "USA",
    stateName: "California",
    city: "San Francisco",
  },
  {
    id: 7,
    OrgName: "GlobalTech Group",
    countryName: "Australia",
    stateName: "New South Wales",
    city: "Sydney",
  },
  {
    id: 8,
    OrgName: "Nexa Innovations",
    countryName: "India",
    stateName: "Karnataka",
    city: "Bangalore",
  },
  {
    id: 9,
    OrgName: "Futura Systems",
    countryName: "USA",
    stateName: "Florida",
    city: "Miami",
  },
  {
    id: 10,
    OrgName: "TechX Solutions",
    countryName: "Canada",
    stateName: "British Columbia",
    city: "Vancouver",
  },
  {
    id: 11,
    OrgName: "Infinite Ideas Inc.",
    countryName: "USA",
    stateName: "Illinois",
    city: "Chicago",
  },
  {
    id: 12,
    OrgName: "Global Innovators",
    countryName: "UK",
    stateName: "Scotland",
    city: "Edinburgh",
  },
  {
    id: 13,
    OrgName: "Future Technologies",
    countryName: "Germany",
    stateName: "Bavaria",
    city: "Munich",
  },
  {
    id: 14,
    OrgName: "NextGen Systems",
    countryName: "USA",
    stateName: "Massachusetts",
    city: "Boston",
  },
  {
    id: 15,
    OrgName: "InnovaTech Inc.",
    countryName: "Canada",
    stateName: "Quebec",
    city: "Montreal",
  },
  {
    id: 16,
    OrgName: "TechSolutions Ltd.",
    countryName: "India",
    stateName: "Maharashtra",
    city: "Mumbai",
  },
  {
    id: 17,
    OrgName: "Futurix Innovations",
    countryName: "USA",
    stateName: "Washington",
    city: "Seattle",
  },
  {
    id: 18,
    OrgName: "SwiftTech Group",
    countryName: "Australia",
    stateName: "Victoria",
    city: "Melbourne",
  },
  {
    id: 19,
    OrgName: "InnovateNow Inc.",
    countryName: "USA",
    stateName: "Colorado",
    city: "Denver",
  },
  {
    id: 20,
    OrgName: "TechWave Solutions",
    countryName: "UK",
    stateName: "Wales",
    city: "Cardiff",
  },
  {
    id: 21,
    OrgName: "FutureGrowth Ltd.",
    countryName: "India",
    stateName: "Delhi",
    city: "New Delhi",
  },
  {
    id: 22,
    OrgName: "Innovative Labs",
    countryName: "USA",
    stateName: "Texas",
    city: "Dallas",
  },
  {
    id: 23,
    OrgName: "GlobalTech Innovations",
    countryName: "Canada",
    stateName: "Alberta",
    city: "Calgary",
  },
  {
    id: 24,
    OrgName: "TechMasters Inc.",
    countryName: "USA",
    stateName: "Florida",
    city: "Orlando",
  },
  {
    id: 25,
    OrgName: "InnovaCorp",
    countryName: "UK",
    stateName: "Northern Ireland",
    city: "Belfast",
  },
  {
    id: 26,
    OrgName: "GlobalTrends Ltd.",
    countryName: "Australia",
    stateName: "Queensland",
    city: "Brisbane",
  },
  {
    id: 27,
    OrgName: "FutureWave Systems",
    countryName: "India",
    stateName: "Tamil Nadu",
    city: "Chennai",
  },
  {
    id: 28,
    OrgName: "TechNexa Solutions",
    countryName: "USA",
    stateName: "California",
    city: "San Diego",
  },
  {
    id: 29,
    OrgName: "InnoVision Tech",
    countryName: "Canada",
    stateName: "Ontario",
    city: "Ottawa",
  },
  {
    id: 30,
    OrgName: "GlobalEdge Innovations",
    countryName: "USA",
    stateName: "Arizona",
    city: "Phoenix",
  },
  {
    id: 31,
    OrgName: "NextInnovate Inc.",
    countryName: "UK",
    stateName: "England",
    city: "Manchester",
  },
  {
    id: 32,
    OrgName: "FutureCraft Ltd.",
    countryName: "India",
    stateName: "Kerala",
    city: "Trivandrum",
  },
  {
    id: 33,
    OrgName: "InnovateIt Solutions",
    countryName: "USA",
    stateName: "New Jersey",
    city: "Jersey City",
  },
  {
    id: 34,
    OrgName: "TechFusion Inc.",
    countryName: "Canada",
    stateName: "Quebec",
    city: "Quebec City",
  },
  {
    id: 35,
    OrgName: "GlobalNexa Tech",
    countryName: "Australia",
    stateName: "Western Australia",
    city: "Perth",
  },
  {
    id: 36,
    OrgName: "FuturePath Systems",
    countryName: "USA",
    stateName: "Colorado",
    city: "Colorado Springs",
  },
  {
    id: 37,
    OrgName: "InnoSolutions Ltd.",
    countryName: "UK",
    stateName: "Scotland",
    city: "Glasgow",
  },
  {
    id: 38,
    OrgName: "TechGenius Innovations",
    countryName: "India",
    stateName: "Gujarat",
    city: "Ahmedabad",
  },
  {
    id: 39,
    OrgName: "FutureFusion Inc.",
    countryName: "USA",
    stateName: "Illinois",
    city: "Springfield",
  },
  {
    id: 40,
    OrgName: "GlobalSolve Tech",
    countryName: "Canada",
    stateName: "British Columbia",
    city: "Victoria",
  },
  {
    id: 41,
    OrgName: "InnovateX Inc.",
    countryName: "Australia",
    stateName: "New South Wales",
    city: "Newcastle",
  },
  {
    id: 42,
    OrgName: "TechSynergy Solutions",
    countryName: "India",
    stateName: "Andhra Pradesh",
    city: "Hyderabad",
  },
  {
    id: 43,
    OrgName: "FutureTech Innovations",
    countryName: "USA",
    stateName: "Washington",
    city: "Spokane",
  },
  {
    id: 44,
    OrgName: "GlobalInnova Labs",
    countryName: "Canada",
    stateName: "Alberta",
    city: "Edmonton",
  },
  {
    id: 45,
    OrgName: "NextWave Tech",
    countryName: "UK",
    stateName: "Wales",
    city: "Swansea",
  },
  {
    id: 46,
    OrgName: "InnovateItNow Inc.",
    countryName: "India",
    stateName: "Tamil Nadu",
    city: "Coimbatore",
  },
  {
    id: 47,
    OrgName: "TechNexa Innovations",
    countryName: "USA",
    stateName: "California",
    city: "San Jose",
  },
  {
    id: 48,
    OrgName: "FutureGrowth Systems",
    countryName: "Canada",
    stateName: "Ontario",
    city: "Hamilton",
  },
  {
    id: 49,
    OrgName: "GlobalTech Corp",
    countryName: "Australia",
    stateName: "Queensland",
    city: "Gold Coast",
  },
  {
    id: 50,
    OrgName: "TechMasters Innovate",
    countryName: "USA",
    stateName: "Arizona",
    city: "Tucson",
  },
];

import * as list from "@platform/service-ui-libraries";
import AddOrgModal from "./AddOrgModal";

const textToCsvMetadata = (actions) => {
  return {
    columns: [
      {
        componentId: "SELECT_ROWS",
        fixed: true,
        id: "SELECT_ROWS",
        isComponent: true,
        name: "Checkbox",
      },
      { name: "Organization Name", id: "OrgName", searchable: true },
      { name: "Country", id: "countryName", searchable: true },
      { name: "State", id: "stateName", searchable: true },
      { name: "City", id: "city", searchable: true },
      { name: "Members Count", id: "Membercount", searchable: true },

      {
        name: "Actions",
        isComponent: true,
        componentId: "ACTION_PANEL",
        props: {
          actions: [
            {
              icon: "visibility",
              title: "View details",
              componentId: "CLICK_ACTION",
              onClick: (id) => {
                actions.handleOpen(id);
              },
            },
            {
              icon: "delete",
              title: "Delete",
              componentId: "DELETE_ROW",
              onClick: (row) => {
                actions.SingleDeleteRecords(row);
              },
            },
          ],
        },
      },
    ],
    data: actions.data,
    pagination: true,
    reload: true,
    selectRecordsFunctionality: true,
    handleSearch: actions?.handleSearch,
    deleteRecords: (recordsId) => actions.MultiDeleteRecords(recordsId),
    onReload: actions?.onReload,
    onChangePage: (e, page) => actions.onPageChange(page),
    onChangeRowsPerPage: (size, page) => actions.onRowsChange(size, page),
    searchData: true,
    totalCount: actions.totalCount,
    numericPagination: true,
  };
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CustomTable() {
  const [page, setPage] = useState(1);
  // const [Pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState("");
  const [data, setData] = useState([]);
  const [fileSelectionPopup, setFileSelectionPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [fileSelectionProps, setFileSelectionProps] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([{ tableName: "" }]);
  const [reRunObj, setReRunObj] = useState({});
  const [actionComponents, setActionComponents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [JSONData, setJsonData] = useState([]);
  const {
    orgdata,
    setorgdata,
    singleorg,
    setsingleorg,
    Allmember,
    setAllMember,
  } = React.useContext(MissingPageContext);
  //ASK......
  // const [Extracteddata, SetExtractededdata] = useState([]);

  const [openModal, setOpenModal] = useState({
    status: false,
    SeeDetailsModalobj: {

    },
    orgModalStatus: false,
    orgModalData: {
      OrgName:"",
      countryName:"",
      stateName:"",
      city:"",
      MemberDetail:[]
    },
  });

  const fetchData = async (page, pageSize) => {
    let url = `http://localhost:3000/Metadata?_page=${page}&_limit=${pageSize}`;
    try {
      let fetchData = await fetch(url);
      let Newdata = await fetchData.json();
      setJsonData(Newdata);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (id) => {
    console.log(id, "id");
    setOpenModal({ ...openModal, status: true, SeeDetailsModalobj: id });
  };

  const handleClose = () => {
    setOpenModal({ ...openModal, status: false });
  };

  console.log(list);

  /// ASK
  // function handledelete({ id }) {
  //   console.log(Extracteddata);
  //   let AfterDeletinngThedata = Extracteddata.filter((item) => item.id !== id);
  //   \eddata(AfterDeletinngThedata);
  // }

  const handleOnChangePage = (page) => {
    console.log(page);
    setPage(page + 1);
  };

  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
  };

  const onReload = async () => {
    if (searchText) {
      handleSearch(searchText);
    } else {
      try {
        let url = `http://localhost:3000/Metadata?_page=${page}&_limit=${pageSize}`;
        let GetTheData = await fetch(url);
        let GottheData = await GetTheData.json();
        setJsonData(GottheData);
      } catch (error) {
        console.log(true, "error", error?.response?.data?.message);
      }
    }
  };

  const SingleDeleteRecords = async ({ id }) => {
    try {
      axios
        .delete(`http://localhost:3000/Metadata/${id}`)
        .then((res) => fetchData());
    } catch (error) {
      console.log(error);
    }
  };

  const MultiDeleteRecords = async (id) => {
    console.log(id);

    try {
      for (let i = 0; i < id.length; i++) {
        console.log(id[i]);
        axios
          .delete(`http://localhost:3000/Metadata/${id[i]}`)
          .then((res) => fetchData());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchResults = async (searchText) => {
    console.log("response", searchText);

    let url = `http://localhost:3000/Metadata?_page=${page}&_limit=${pageSize}&q=${searchText}`;

    try {
      let GetSearchData = await fetch(url);
      let GotSearchData = await GetSearchData.json();
      setJsonData(GotSearchData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = useCallback(
    async (searchText) => {
      setSearchText(searchText);
      if (searchText?.length > 2) {
        await fetchSearchResults(searchText);
      } else if (!searchText?.length && page == 0) {
        await fetchData();
      }
    },
    [searchText, page, pageSize]
  );
  const debounceFunction = useDebouncing(fetchSearchResults, 1000);

  // const handleStopJob = async (row) => {
  //   const payload = {
  //     [rowId]: row?.id,
  //     origin: row?.origin,
  //     sourceType: row?.sourceType,
  //   };
  //   const { response, error } = await apiMethodStop(payload);
  //   if (response?.data?.success) {
  //     ShowSnackbar(true, "success", response?.data?.message);
  //     await onReload();
  //   } else ShowSnackbar(true, "error", error?.response?.data?.message);
  // };

  const HandleAddorganizationBtn = () => {
    setOpenModal({ ...openModal, orgModalStatus: true });
  };

  useEffect(() => {
    if (searchText.length > 2) {
      handleSearch(searchText);
    } else {
      fetchData(page, pageSize);
    }
  }, [page, pageSize, searchText]);

  // console.log(Extracteddata);
  return (
    <div>
      <div className="ALbaButton">
        <AlbaButton
          className="button_Confirm"
          // variant="success"
          icon="folder_zip"
          onClick={HandleAddorganizationBtn}
        >
          Add New Organization
        </AlbaButton>

        <AddOrgModal data={{ openModal, setOpenModal }} />
      </div>
      <Table
        tableProps={{
          ...textToCsvMetadata({
            onPageChange: handleOnChangePage,
            onRowsChange: handleOnChangePageSize,
            onReload: onReload,
            SingleDeleteRecords,
            MultiDeleteRecords,
            handleSearch: debounceFunction,
            handleOpen,
            // totalCount: totalCount,
            // handleStopJob: handleStopJob
          }),
          data: JSONData,
          actionComponents: actionComponents,
          title: "Organization Details",
        }}
      />
      {openModal.status && (
        <Dialog
          //  open={compareFilesDialog.status}
          open={openModal.status}
          className="appModal"
          PaperComponent={DraggableModal}
          maxWidth={"md"}
          fullWidth
        >
          <DialogTitle className="__title" id="draggable-dialog-title">
            Organization Details
            <IconButton onClick={handleClose}>
              <Icon>close</Icon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextForm
            label={'Organization Name'}
              placeholder="Organization Name"
              fieldValue={openModal?.SeeDetailsModalobj?.OrgName}
            ></TextForm>
            <TextForm
             label={'Country'}  fieldValue={openModal?.SeeDetailsModalobj?.countryName} placeholder="Countery Name"></TextForm>
            <TextForm label={'StateName'} fieldValue={openModal?.SeeDetailsModalobj?.stateName} placeholder="State Name"></TextForm>
            <TextForm label={'City'} fieldValue={openModal?.SeeDetailsModalobj?.city}placeholder="City Name"></TextForm>
            <TextForm label={'Member Count'}  fieldValue={openModal?.SeeDetailsModalobj?.Membercount}placeholder="Member count"></TextForm>

          </DialogContent>

          <DialogActions>
            <div className="al-flex al-v-center al-spc-btw al-flex1">
              <Typography>
                *Duplicate records will not be compared, they will be dropped
                and saved separately.
              </Typography>
              <div className="al-flex">
                <AlbaButton
                  variant="danger"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {step != 1 ? <span>Back</span> : <span>Cancel</span>}
                </AlbaButton>
                {/* <AlbaButton variant="primary" loading={isLoadingProceedButton} onClick={handleProceed}>
                   {step != 2 ? <span>Next</span> : <span>Confirm</span>}
                 </AlbaButton> */}
              </div>
            </div>
          </DialogActions>
        </Dialog>
      )}
      {/* <button onClick={handlclick}>click</button> */}
    </div>
  );
}

export default CustomTable;
