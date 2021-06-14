import { MenuItem, Select } from "@material-ui/core";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobRankList,
  getStatusList,
  getTechnologyList,
  updateAccountByID,
} from "../accountSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%)`,
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    width: 100,

    marginTop: "20px",
    marginBottom: "20px",
  },
}));
function EditForm(props) {
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.data);
  const technology = useSelector((state) => state.account.technology);
  const jobrank = useSelector((state) => state.account.jobrank);
  const status = useSelector((state) => state.account.status);

  const [dataToEdit, setDataToEdit] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      data.forEach((element) => {
        if (element.id === props.idToEdit) {
          setDataToEdit(element);
        }
      });
    }
    dispatch(getTechnologyList());
    dispatch(getJobRankList());
    dispatch(getStatusList());
  }, [data, dispatch, props.idToEdit]);

  const onSubmitHandle = (data) => {
    console.log(data);
    try {
      const result = dispatch(
        updateAccountByID({ id: props.idToEdit, payload: data })
      );
      const res = unwrapResult(result);
      props.handleSubmit(false);
    } catch (e) {
      console.log(e);
      window.alert("Some error occurred!");
    }
  };
  if (dataToEdit && technology && jobrank && status) {
    return (
      <div className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmitHandle)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="fullname"
                name="fullname"
                label="FullName"
                fullWidth
                defaultValue={dataToEdit.fullname}
                autoFocus
                {...register("fullname")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="account"
                name="account"
                label="Account"
                defaultValue={dataToEdit.account}
                {...register("account")}
                autoFocus
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Select
                autoFocus
                label="Technology"
                {...register("technology_id")}
                style={{ width: "200px" }}
                defaultValue={dataToEdit.technology_id}
              >
                {technology.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                autoFocus
                label="Job Range"
                {...register("job_range_id")}
                style={{ width: "200px" }}
                defaultValue={dataToEdit.job_range_id}
              >
                {jobrank.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                autoFocus
                label="Status"
                {...register("status_id")}
                style={{ width: "200px" }}
                defaultValue={dataToEdit.status_id}
              >
                {status.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            className={classes.button}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  } else return <CircularProgress />;
}

export default EditForm;
