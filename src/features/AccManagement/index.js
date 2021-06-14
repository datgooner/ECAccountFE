import {
  Button,
  CircularProgress,
  createMuiTheme,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountByID, getAccountList } from "./accountSlice";
import CustomToolbar from "./components/CustomToolbar";
import EditForm from "./components/EditForm";
const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexDirection: "column",
      "& .ant-empty-img-1": {
        fill: theme.palette.type === "light" ? "#aeb8c2" : "#262626",
      },
      "& .ant-empty-img-2": {
        fill: theme.palette.type === "light" ? "#f5f5f7" : "#595959",
      },
      "& .ant-empty-img-3": {
        fill: theme.palette.type === "light" ? "#dce0e6" : "#434343",
      },
      "& .ant-empty-img-4": {
        fill: theme.palette.type === "light" ? "#fff" : "#1c1c1c",
      },
      "& .ant-empty-img-5": {
        fillOpacity: theme.palette.type === "light" ? "0.8" : "0.08",
        fill: theme.palette.type === "light" ? "#f5f5f5" : "#fff",
      },
    },
    label: {
      marginTop: theme.spacing(1),
    },
  }),
  { defaultTheme }
);
function CustomNoRowsOverlay() {
  const classes = useStyles();

  return (
    <GridOverlay className={classes.root}>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <div className={classes.label}>No Rows</div>
    </GridOverlay>
  );
}

function AccManagement() {
  const dataRaw = useSelector((state) => state.account.data);

  const dispatch = useDispatch();
  const [idToEdit, setIdToEdit] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (e) => {
    dispatch(getAccountList());
    setOpen(e);
  };
  const renderDetailsButton = (params) => {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 5 }}
          onClick={() => {
            setIdToEdit(params.row.id);
            setOpen(true);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 10 }}
          onClick={() => {
            if (window.confirm("Are you sure to delete this item?"))
              try {
                const result = dispatch(deleteAccountByID(params.row.id));
                dispatch(getAccountList());
                const res = unwrapResult(result);
              } catch (e) {
                console.log(e);
                window.alert("Some error occurred!");
              }
          }}
        >
          Delete
        </Button>
      </div>
    );
  };
  const data = useMemo(() => {
    if (dataRaw) {
      let temp = [
        {
          field: "",
          headerName: "Button",
          sortable: false,
          width: 200,
          disableClickEventBubbling: true,
          renderCell: renderDetailsButton,
        },
        {
          field: "id",
          headerName: "ID",
          width: 90,
        },
        {
          field: "fullname",
          headerName: "FullName",
          width: 180,
          editable: true,
        },

        {
          field: "account",
          headerName: "Account",
          width: 130,
          editable: true,
        },
        {
          field: "phone_number",
          headerName: "Phone",
          width: 150,
          editable: true,
        },
        {
          field: "technology",
          headerName: "Technology",
          width: 160,
          editable: true,
        },
        {
          field: "job_range",
          headerName: "Job Range",
          width: 150,
          editable: true,
        },
        {
          field: "language",
          headerName: "Language",
          width: 150,
          editable: true,
        },
        {
          field: "ob_day",
          headerName: "Day Onboard",
          width: 150,
          editable: true,
        },
        {
          field: "status",
          headerName: "Status",
          width: 150,
          editable: true,
        },
      ];

      return {
        columns: temp,
        rows: dataRaw.map((d) => ({
          id: d.id,
          fullname: d.fullname,
          account: d.account,
          phone_number: d.phone_number,
          technology: d.technology.name,
          job_range: d.job_range.name,
          language: d.language,
          ob_day: d.ob_day,
          status: d.status.name,
        })),
      };
    }
  }, [dataRaw]);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAccountList());
  }, [dispatch]);
  if (dataRaw)
    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          {...data}
          onError={() => console.log("some error")}
          aria-label="Account List"
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomToolbar,
          }}
          componentsProps={{ toolbar: { dispatch: dispatch } }}
          filterModel={{
            items: [
              {
                columnField: "",
                operatorValue: "contains",
                value: "",
              },
            ],
          }}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <EditForm idToEdit={idToEdit} handleSubmit={handleSubmit} />
        </Modal>
      </div>
    );
  else return <CircularProgress />;
}

export default AccManagement;
