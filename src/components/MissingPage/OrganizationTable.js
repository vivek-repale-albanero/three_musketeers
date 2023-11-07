import * as React from 'react';
import { Table, Icon, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import { MissingPageContext } from '../../Context';
import EyeComponent from './EyeComponent';


const columns = [
  {
    id: 'OrgName',
    label: 'Organization Name',
    minWidth: 170
  },
  {
    id: 'countryName',
    label: 'Country',
    minWidth: 100
  },
  {
    id: 'stateName',
    label: 'State',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
    align: 'right',

  },
  {
    id: 'MemberDetails',
    label: 'Members Count',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'See',
    label: 'Details',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Delete',
    label: 'Delete',
    minWidth: 170,
    align: 'right',
  },
];



export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { orgdata, setorgdata, singleorg, setsingleorg, Allmember } = React.useContext(MissingPageContext)


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  function GetRows(data, Allmember) {
    let Rows = [];
    const uniqueOrganizations = new Set();
    data.forEach(({ OrgName, country, id }) => {
      if (!uniqueOrganizations.has(id)) {
        country.forEach(({ countryName, states }) => {
          if (!uniqueOrganizations.has(id)) {
            states.forEach(({ stateName, cities }) => {
              if (!uniqueOrganizations.has(id)) {
                uniqueOrganizations.add(id);
                Rows.push({
                  id,
                  OrgName,
                  countryName,
                  stateName,
                  city: cities[0],
                  Memberscount: 0,
                  MemberDetails:[],
                  See: <EyeComponent data={{ id, OrgName, countryName, stateName, city: cities[0] }} />,
                  Delete: <Icon>delete</Icon>
                });
              }
            });
          }
        });
      }
    });

    return Rows
    // Rows array now contains one entry for each of the five organizations
  }
  

  React.useEffect(() => {
    let Rows = GetRows(orgdata, Allmember)
    setsingleorg(Rows)
  }, [])

  


  const handleclick = (value, id, row) => {

    let Newdata = [...singleorg]
    if (value.props?.children == "delete") {
      Newdata = Newdata.filter((item) => {
        return item.id !== row.id
      })
    } else if (value.props?.children == "visibility") {
      setcurrentvalue('visibility')
    } else {
      Newdata = [...singleorg]
    }

    setsingleorg(Newdata)
  }
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Organization
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {singleorg
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell onClick={() => handleclick(value, row.id, row)} key={column.id} align={column.align}>
                          {column.id=="MemberDetails"?value?.length:value}
                        </TableCell>

                      );
                    })}

                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={singleorg.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
