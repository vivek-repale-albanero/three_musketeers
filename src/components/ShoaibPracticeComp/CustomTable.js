import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Table } from "@platform/primary-table";
import { MissingPageContext, PermissionContext } from "../../Context";
import { GetRows } from "../MissingPage/OrganizationTable";
import { Box, Button, Typography, Modal } from "@material-ui/core";
import useDebouncing from "./useDebouncing";
import axios from "axios";
import "../../styles/MissingPage.scss";
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
  ShowSnackbar,
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
import {
  DeleteSingleOrgData,
  HandleOrgPatchData,
  MultiDeleteRecordsFunc,
  ShoaibReloadFetchResultsFunc,
  fetchOrgData,
  fetchSearchResultsFunc,
} from "../../api/api";
import AlbaAutoComplete from "./AlbaAutoComplete1";
import AlbaAutoCompl from "./AlbaAutoComplete1";

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
  const [page, setPage] = useState(0);
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
  const [patchdata, setpatcdata] = useState([]);
  const seeUserDetail = useRef([]);
  //ASK......
  // const [Extracteddata, SetExtractededdata] = useState([]);

  const [openModal, setOpenModal] = useState({
    status: false,
    SeeDetailsModalobj: {},
    orgModalStatus: false,
    orgModalData: {
      OrgName: "",
      countryName: "",
      stateName: "",
      city: "",
      MemberDetail: [],
    },
  });

  const fetchData = async () => {
    const { response, error } = await fetchOrgData({ page, pageSize });
    if (response?.statusText == "OK") {
      let GetMassageData = GetRows(response?.data);

      setpatcdata(response?.data);
      setJsonData(GetMassageData);
    } else {
      setJsonData([]);
      console.log(error, "error", "Something went wrong in fetchmetdata");
      ShowSnackbar(true, "error", "Something Went Wrong in fetchmetdata");
    }
  };

  const handleOpen = (data) => {
    console.log(data, "data");
    setOpenModal({ ...openModal, status: true, SeeDetailsModalobj: data });
  };

  const handleClose = () => {
    setOpenModal({ ...openModal, status: false });
  };

  // console.log(JSONData,"JSONData")
  // console.log(list);

  /// ASK
  // function handledelete({ id }) {
  //   console.log(Extracteddata);
  //   let AfterDeletinngThedata = Extracteddata.filter((item) => item.id !== id);
  //   \eddata(AfterDeletinngThedata);
  // }

  const handleOnChangePage = (page) => {
    setPage(page + 1);
  };

  const handleOnChangePageSize = (pageSize, page) => {
    setPageSize(pageSize);
  };

  const onReload = async () => {
    if (searchText) {
      handleSearch(searchText);
    } else {
      let { response, error } = await ShoaibReloadFetchResultsFunc({
        page,
        pageSize,
        searchText,
      });
      if (response?.statusText == "OK") {
        let GetMassageData = GetRows(response?.data);

        setJsonData(GetMassageData);
      } else {
        console.log(
          error,
          "error",
          "Something went wrong in ShoaibReloadFetchResultsFunc"
        );
        ShowSnackbar(
          true,
          "error",
          "Something Went Wrong in ShoaibReloadFetchResultsFunc"
        );
      }
    }
  };

  const SingleDeleteRecords = async ({ id }) => {
    // console.log("inner",Extracteddata)
    const { response, error } = await DeleteSingleOrgData({ id });
    if (response?.statusText == "OK") {
      fetchData(page, pageSize);
      console.log("SingleData Delete ", response);
    } else {
      console.log(
        error,
        "error",
        "Something went wrong in SingleDeleteRecords"
      );
      ShowSnackbar(
        true,
        "error",
        "Something Went Wrong in SingleDeleteRecords"
      );
    }
  };

  // console.log("outer",Extracteddata)

  const MultiDeleteRecords = async (id) => {
    for (let i = 0; i < id.length; i++) {
      const { response, error } = await MultiDeleteRecordsFunc(id[i]);
      if (response.statusText == "OK") {
        fetchData(page, pageSize);
        console.log("MultiDeleteRecords", response);
      } else {
        console.log(
          error,
          "error",
          "Something went wrong in MultiDeleteRecords"
        );
        ShowSnackbar(
          true,
          "error",
          "Something Went Wrong in MultiDeleteRecords"
        );
      }
    }
  };

  const fetchSearchResults = async (searchText) => {
    const { response, error } = await fetchSearchResultsFunc({
      searchText,
      page,
      pageSize,
    });

    if (response?.statusText == "OK") {
      let GetMassageData = GetRows(response?.data);

      setJsonData(GetMassageData);
    } else {
      console.log(error, "error", "Something went wrong in fetchSearchResults");
      ShowSnackbar(true, "error", "Something Went Wrong in fetchSearchResults");
    }
  };

  const handleSearch = useCallback(
    async (searchText) => {
      setSearchText(searchText);
      if (searchText?.length > 2) {
        await fetchSearchResults(searchText);
      } else if (!searchText?.length && page == 0) {
        console.log("executed");
        await fetchData();
      }
    },
    [searchText, page, pageSize]
  );

  const debounceFunction = useDebouncing(handleSearch, 1000);

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

  const startTableButton = useCallback(() => {
    return (
      <AlbaButton variant="success" onClick={HandleAddorganizationBtn}>
        Add New Organization
        {/* <Icon>upload</Icon> */}
      </AlbaButton>
    );
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      handleSearch(searchText);
    } else {
      fetchData();
    }

    // let getdata= GetRows(orgdata)
    // SetExtractededdata(getdata)
    setActionComponents([startTableButton]);
  }, [page, pageSize, searchText]);

  const seeuserdetailvalidation = () => {
    console.log(seeUserDetail);
    let checkValidations = seeUserDetail.current.map((ref) => {
      console.log(ref);
      if (!ref) {
        return false;
      } else {
        return ref?.checkValidation();
      }
    });

    return checkValidations.every(Boolean);
  };

  const customValidation = (value) => {
    let msg;
    if (value.length < 2) {
      msg = "Value should be greater than 2";
    }
    if (value.length >= 10) {
      msg = "value should be less than 10";
    }
    return msg;
  };
  const HandleEdit = async (patchid) => {
    console.log(seeuserdetailvalidation());
    if (seeuserdetailvalidation()) {
      handleClose();
    }
    let obj = { ...openModal.SeeDetailsModalobj };

    let newdata = JSONData.map((item) => {
      if (item.id == patchid) {
        return obj;
      } else {
        return item;
      }
    });
    setJsonData(newdata);
    // const NewData= patchdata.reduce((acc,{id,OrgName,country})=>{
    //  let newobj={}
    //   if(id==patchid){
    //     newobj.id=patchid
    //     acc.OrgName=obj.OrgName

    //    return country.map(({countryName,states})=>{
    //     countryName=obj.countryName
    //     return states.map(({stateName,cities})=>{
    //       stateName=obj.stateName
    //       return cities.map((item)=>{
    //         cities[0]=item
    //       })
    //     })
    //    })

    //   }
    //   return acc
    // },[])
    // console.log("patchdataid",NewData)
    // handleClose()
    // const{response,error}=await HandleOrgPatchData({
    // id,obj
    // })
  };

  return (
    <div>
      <div className="ALbaButton">
        <AddOrgModal
          data={{ openModal, setOpenModal }}
          myFunction={fetchData}
        />
      </div>
      <div>
        <AlbaAutoCompl className="alba-autocomplete__input__search__selection input " data={JSONData} page={page} pageSize={pageSize} update={setJsonData} setjson={setJsonData} />
      </div>
      <Table
        className="orgTable"
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
          maxWidth={"sm"}
          fullWidth
        >
          <DialogTitle id="draggable-dialog-title">
            <div className="__title">
              <span>Organization Details</span>
              <IconButton onClick={handleClose}>
                <Icon>close</Icon>
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="TextFormDivWatch">
              <TextForm
                label={"Organization Name"}
                placeholder="Organization Name"
                fieldValue={openModal?.SeeDetailsModalobj?.OrgName}
                onChange={(e) =>
                  setOpenModal({
                    ...openModal,
                    SeeDetailsModalobj: {
                      ...openModal.SeeDetailsModalobj,
                      OrgName: e,
                    },
                  })
                }
                maxWidth={"100px"}
                ref={(e) => (seeUserDetail.current[0] = e)}
                validationsDetail={{
                  validations: {
                    whiteSpace: true,
                    required: true,
                  },
                }}
                validationFunc={customValidation}
                fullWidth
                className="TextFormInputWatch"
              ></TextForm>
              <TextForm
                label={"Country"}
                ref={(e) => (seeUserDetail.current[1] = e)}
                fieldValue={openModal?.SeeDetailsModalobj?.countryName}
                onChange={(e) =>
                  setOpenModal({
                    ...openModal,
                    SeeDetailsModalobj: {
                      ...openModal.SeeDetailsModalobj,
                      countryName: e,
                    },
                  })
                }
                placeholder="Countery Name"
                validationsDetail={{
                  validations: {
                    whiteSpace: true,
                    required: true,
                  },
                }}
              ></TextForm>
              <TextForm
                label={"StateName"}
                ref={(e) => (seeUserDetail.current[2] = e)}
                fieldValue={openModal?.SeeDetailsModalobj?.stateName}
                placeholder="State Name"
                onChange={(e) =>
                  setOpenModal({
                    ...openModal,
                    SeeDetailsModalobj: {
                      ...openModal.SeeDetailsModalobj,
                      stateName: e,
                    },
                  })
                }
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
              ></TextForm>
              <TextForm
                label={"City"}
                ref={(e) => (seeUserDetail.current[3] = e)}
                fieldValue={openModal?.SeeDetailsModalobj?.city}
                placeholder="City Name"
                onChange={(e) =>
                  setOpenModal({
                    ...openModal,
                    SeeDetailsModalobj: {
                      ...openModal.SeeDetailsModalobj,
                      city: e,
                    },
                  })
                }
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
              ></TextForm>
              <TextForm
                label={"Member Count"}
                fieldValue={openModal?.SeeDetailsModalobj?.Membercount}
                ref={(e) => (seeUserDetail.current[4] = e)}
                placeholder="Member count"
                validationsDetail={{
                  validations: {
                    required: true,
                    whiteSpace: true,
                  },
                }}
                onChange={(e) =>
                  setOpenModal({
                    ...openModal,
                    SeeDetailsModalobj: {
                      ...openModal.SeeDetailsModalobj,
                      Membercount: e,
                    },
                  })
                }
              ></TextForm>
            </div>
          </DialogContent>

          <DialogActions>
            <div style={{ display: "flex" }}>
              <div className="al-flex ">
                <AlbaButton
                  variant="danger"
                  onClick={() => {
                    HandleEdit(openModal?.SeeDetailsModalobj.id);
                  }}
                >
                  Edit
                </AlbaButton>
              </div>
              <div className="al-flex AlbabottonBack">
                <AlbaButton
                  variant="danger"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Back
                </AlbaButton>
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
