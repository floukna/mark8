import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const TableCellStyle = styled(TableCell)`
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  font-family: "Prompt", sans-serif !important;

  .box-error {
    background: red;
    color: white;
    padding: 0.75rem;
  }
`;

const TableHeadStyle = styled(TableHead)`
  font-family: "Prompt", sans-serif !important;
`;

const initialState = {
  mouseX: null,
  mouseY: null,
};

const Box = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .container {
    display: flex;
    justify-content: space-between;
    .box-status {
      border-radius: 16px;
      padding: 0.25rem 0.65rem;
    }
    .box-status.co {
      color: #f2c94d;
      background: #fcf2cf;
    }
    .box-status.post {
      color: #8ad9ab;
      background: #def4e6;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function TableCompoennt({ head, data }) {
  const classes = useStyles();
  const [amenitiesData, setAmenities] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Data, setData] = useState([]);
  const [editPhoto, setEditPhoto] = useState({ id: 0 });
  const amenities = [
    "Aircon",
    "Bath tub",
    "Electric stove",
    "Furniture",
    "Gas stove",
    "Refrigerator",
    "Washing machine",
    "Water heater",
  ];

  function createData(val) {
    return Object.fromEntries(
      head.map((_, i) => {
        return [head[i], val[i]];
      })
    );
  }

  useEffect(() => {
    if (data) {
      let create = data.map((val) => createData(val));
      create = create.map((val) => {
        const listAmenities = [];
        const status = [];
        if (val["Aircon"]) {
          listAmenities.push(amenities[0]);
        }
        if (val["Bath tub"]) {
          listAmenities.push(amenities[1]);
        }
        if (val["Electric stove"]) {
          listAmenities.push(amenities[2]);
        }
        if (val["Furniture"]) {
          listAmenities.push(amenities[3]);
        }
        if (val["Gas stove"]) {
          listAmenities.push(amenities[4]);
        }
        if (val["Refrigerator"]) {
          listAmenities.push(amenities[5]);
        }
        if (val["Washing machine"]) {
          listAmenities.push(amenities[6]);
        }
        if (val["Water heater"]) {
          listAmenities.push(amenities[7]);
        }

        if (val["agent_post"]) {
          status.push("Agent post");
        }
        if (val["accept_agent"]) {
          status.push("รับ Co-Agent");
        }
        return {
          ...val,
          status,

          amenities: listAmenities,
        };
      });
      setData(create);
    }
  }, [data]);

  const Header = [
    "",
    "CONDO NAME",
    "RENT PRICE (Baht)",
    "SELL PRICE (Baht)",
    "BEDROOM",
    "BATHROOM",
    "SIZE (sqm.)",
    "FLOOR",
    "STATUS",
    "PHOTO",
    "TITLE",
    "DESCRIPTION",
    "Amentites",
  ];

  //   const handleClose = () => {
  //     setTimeout(() => {
  //       setState(initialState);
  //     }, 300);
  //   };

  //   const handleHover = (event, data) => {
  //     setAmenities(data);
  //     setState({
  //       mouseX: event.clientX - 2,
  //       mouseY: event.clientY - 4,
  //     });
  //   };

  //   const handleHover = (event, data) => {
  //     setAmenities(data);
  //     setAnchorEl(event.currentTarget);
  //   };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  //   const enterMenu = () => {
  //     setMenu(true);
  //   };

  //   const leaveMenu = () => {
  //     setTimeout(() => {
  //       setMenu(false);
  //     }, 300);
  //   };

  const handlePopoverOpen = (event, data) => {
    setAmenities(data);

    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (data) => {
    if (data) {
      return (
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          //   classes={{
          //     paper: classes.paper,
          //   }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div
            style={{
              padding: "1rem",
              borderBottom: "3px solid",
              borderColor: "blue",
              textAlign: "center",
            }}
          >
            Amentities
          </div>
          {data.map((val, index) => (
            <div key={val + index} style={{ padding: ".5rem 1rem" }}>
              {val}
            </div>
          ))}
        </Popover>
      );
    }
  };

  const boxError = (data) => {
    if (
      data.rent_price === null ||
      data.rent_price === null ||
      data.bedroom === null ||
      data.bath === null ||
      data["size (sq.m)"] === null ||
      data.floor === null ||
      data.photo1 === null ||
      data.description === null ||
      data.title === null
    ) {
      return true;
    }
    return false;
  };

  const checkNotFound = (data) => {
    if (data !== null) {
      return data;
    }
    return <span style={{ color: "red" }}>not found</span>;
  };

  const handleUpload = ({ target }, data) => {
    const image = URL.createObjectURL(target.files[0]);
    data.photo1 = image;
    setData([...Data, data]);
  };
  return (
    <TableContainer
      component={Paper}
      style={{ fontFamily: "Prompt , sans-serif" }}
    >
      <Table
        aria-label="simple table"
        style={{ fontFamily: "Prompt , sans-serif" }}
      >
        <TableHeadStyle style={{ fontFamily: "Prompt , sans-serif" }}>
          <TableRow>
            {Header.map((val) => (
              <TableCell
                key={val}
                style={{ fontSize: "12px", color: "#00000073" }}
              >
                <Box style={{ width: "100%" }}> {val}</Box>
              </TableCell>
            ))}

            {/* <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHeadStyle>
        <TableBody style={{ color: "red" }}>
          {Data.map((row) => (
            <TableRow key={row.id}>
              <TableCellStyle>
                {boxError(row) ? (
                  <div className="box-error" style={{ textAlign: "center" }}>
                    {row.id}
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>{row.id}</div>
                )}
              </TableCellStyle>
              <TableCellStyle>
                <Box style={{ width: "150px" }}>
                  {" "}
                  {checkNotFound(row["condo_name-EN"])}
                </Box>
              </TableCellStyle>
              <TableCellStyle>
                {row.rent_price ? (
                  <>
                    {formatNumber(row.rent_price)}
                    <span style={{ color: "#00000073" }}>/month</span>
                  </>
                ) : row.rent_price === 0 ? null : (
                  checkNotFound(row.rent_price)
                )}
              </TableCellStyle>
              <TableCellStyle>
                {row.sale_price
                  ? formatNumber(row.sale_price)
                  : row.sale_price === 0
                  ? null
                  : checkNotFound(row.sale_price)}
              </TableCellStyle>
              <TableCellStyle>{checkNotFound(row.bedroom)}</TableCellStyle>
              <TableCellStyle>{checkNotFound(row.bath)}</TableCellStyle>
              <TableCellStyle>
                {checkNotFound(row["size (sq.m)"])}
              </TableCellStyle>
              <TableCellStyle>{checkNotFound(row.floor)}</TableCellStyle>

              <TableCellStyle>
                <Box style={{ width: "220px" }}>
                  <div className="container">
                    {row.status.length
                      ? row.status.map((val) => (
                          <div
                            className={`box-status ${
                              val === "Agent post" && "post"
                            } ${val === "รับ Co-Agent" && "co"}`}
                          >
                            {val}
                          </div>
                        ))
                      : null}
                  </div>
                </Box>
              </TableCellStyle>
              <TableCellStyle>
                <Box style={{ width: "150px" }}>
                  {row.photo1 ? (
                    <div
                      style={{ width: "100%" }}
                      onMouseOver={() => setEditPhoto({ id: row.id })}
                      onMouseLeave={() => setEditPhoto({ id: 0 })}
                    >
                      <img src={row.photo1} width="30px" height="30px" />
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`upload-file${row.id}`}
                        type="file"
                        onChange={(e) => handleUpload(e, row)}
                      />
                      {editPhoto.id === row.id && (
                        <>
                          <label htmlFor={`upload-file${row.id}`}>
                            <span
                              style={{
                                marginLeft: "20px",
                                color: "blue",
                                position: "relative",
                                top: "-7.5px",
                                cursor: "pointer",
                              }}
                            >
                              Edit photo
                            </span>
                          </label>
                        </>
                      )}
                    </div>
                  ) : (
                    checkNotFound(row.photo1)
                  )}
                </Box>
              </TableCellStyle>
              <TableCellStyle>
                {" "}
                <Box style={{ width: "150px" }}>{checkNotFound(row.title)}</Box>
              </TableCellStyle>
              <TableCellStyle>
                <Box style={{ width: "150px" }}>
                  {" "}
                  {checkNotFound(row.description)}
                </Box>
              </TableCellStyle>
              <TableCellStyle>
                <Box style={{ width: "70px" }}>
                  {" "}
                  {row.amenities.length}
                  <ArrowDropDownIcon
                    style={{
                      marginLeft: "10px",
                      position: "relative",
                      top: "7px",
                    }}
                    onMouseEnter={(e) => handlePopoverOpen(e, row.amenities)}
                    onMouseLeave={handlePopoverClose}
                  />
                </Box>

                {/* {row.amenities.map((vall) => (
                  <div>{vall}</div>
                ))} */}
              </TableCellStyle>
            </TableRow>
          ))}
        </TableBody>
        {handleMenu(amenitiesData)}
      </Table>
    </TableContainer>
  );
}
