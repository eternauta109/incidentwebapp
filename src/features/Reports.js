import { useState, useEffect } from "react";
/* import ConfirmNewReport from "./ComfirmNewReport"; */
import { useNavigate, useLocation } from "react-router-dom";
import ReportsServices from "../services/reportsServices";
import {
  Select,
  TextField,
  FormControl,
  Button,
  Checkbox,
  MenuItem,
  InputLabel,
  Grid,
  Box,
  Container,
  FormControlLabel,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { cinemaList, categoryList } from "../config/structure";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/it";

dayjs.locale("it");

export default function Report() {
  const { state } = useLocation();
  const user = useSelector((state) => state.user);

  const [report, setReport] = useState({
    startDate: dayjs().format("DD/MM/YYYY"),
    resolved: false,
    endDate: null,
    cinema: user.is_facility ? "insert cinema" : user.cinema,
    screen_number: user.is_facility
      ? "insert screen number"
      : user.screen_number,
    screen_with_issues: "",
    seat_with_issues: "",
    category: "altro",
    screen_state: "open",
    issue: "",
    note: ""
  });
  const [stDate, setStDate] = useState();
  const [endDate, setEndDate] = useState();

  const navigate = useNavigate();

  const handleChangeStDate = (newDate) => {
    setReport({ ...report, startDate: dayjs(newDate).format("DD/MM/YYYY") });
    setStDate(newDate);
  };

  const handleChangeEndDate = (newDate) => {
    let edDate = null;
    if (report.resolved) {
      edDate = dayjs(endDate).format("DD/MM/YYYY");
    }
    setReport({ ...report, endDate: edDate });
    console.log(newDate);
    setEndDate(newDate);
  };

  const reportChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });

    console.log("item in anomalies form on change", report);
  };

  //registra o aggiorna il report
  const onSubmitReport = async (e) => {
    e.preventDefault();

    if (state) {
      try {
        await ReportsServices.updateReport(report.docId, report).then(
          navigate("../landing")
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await ReportsServices.addReport(report).then(navigate("../landing"));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (state) {
      console.log("state", state);
      setReport({
        ...state
      });
    }
    return () => setReport("");
  }, []);

  return (
    <Container
      sx={{
        borderRadius: 5,
        bgcolor: "#f9fbe7",
        opacity: 0.95,
        width: "100%",
        minHeight: 900,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1
      }}
    >
      <Typography component="h1" variant="h5" color="primary">
        insert incident report form
      </Typography>

      <Box component="form" onSubmit={onSubmitReport}>
        <Grid container sx={{ mb: 2, mt: 2 }} rowSpacing={4} columnSpacing={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid item xs={12} sm={6}>
              <MobileDatePicker
                id="stDate"
                label="Start report"
                inputFormat="DD/MM/YYYY"
                value={report ? dayjs(report.startDate, "DD/MM/YYYY") : stDate}
                onChange={handleChangeStDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                label={report.resolved ? "Resolved" : "not resolved"}
                control={
                  <Checkbox
                    value={report && report.resolved}
                    onChange={() => {
                      setReport({
                        ...report,
                        resolved: !report.resolved,
                        endDate: dayjs().format("DD/MM/YYYY")
                      });
                    }}
                  />
                }
              />
            </Grid>

            {report.resolved && (
              <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                <MobileDatePicker
                  label="End report"
                  inputFormat="DD/MM/YYYY"
                  value={
                    report.endDate
                      ? dayjs(report.endDate, "DD/MM/YYYY")
                      : dayjs()
                  }
                  onChange={handleChangeEndDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            )}
          </LocalizationProvider>

          <Grid item xs={12} sm={10}>
            <TextField
              value={report.cinema}
              InputLabelProps={{ shrink: user.cinema ? true : false }}
              helperText="Please enter cinema name"
              name="cinema"
              onChange={(e) => reportChange(e)}
              id="cinema"
              disabled={user.is_facility ? false : true}
              label="Cinema"
              fullWidth
            />
          </Grid>

          <Grid item xs={4} sm={2}>
            <TextField
              InputLabelProps={{ shrink: user.screen_number ? true : false }}
              value={report.screen_number}
              helperText="n° screen"
              name="screen_number"
              onChange={(e) => reportChange(e)}
              disabled={user.is_facility ? false : true}
              id="screen_number"
              label="Screen number"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container sx={{ mb: 2, mt: 2 }} rowSpacing={4} columnSpacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              helperText="the screen with issue. Ex: 5"
              name="screen_with_issues"
              InputLabelProps={{ shrink: user.screen_number ? true : false }}
              label="Screen"
              onChange={(e) => reportChange(e)}
              value={report ? report.screen_with_issues : ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              helperText="seat with issue. Ex: j-25"
              name="seat_with_issues"
              label="Seats"
              onChange={(e) => reportChange(e)}
              InputLabelProps={{ shrink: user.screen_number ? true : false }}
              value={report ? report.seat_with_issues : ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                defaultOpen={""}
                value={report.category}
                label="Category"
                onChange={(e) => reportChange(e)}
              >
                {categoryList.map((el, key) => (
                  <MenuItem key={key} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Screen State
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="screen_state"
                value={report ? report.screen_state : " "}
                label="Screen State"
                onChange={(e) => reportChange(e)}
              >
                <MenuItem value={"open"}>open</MenuItem>
                <MenuItem value={"close"}>close</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              helperText="explain the issues type"
              id="issue"
              name="issue"
              label="Issue"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => reportChange(e)}
              value={report ? report.issue : ""}
              multiline
              fullWidth
            />
          </Grid>

          <Grid item xs={2} sm={6}>
            <TextField
              helperText="days"
              id="days_work"
              label=""
              value={dayjs().diff(dayjs(stDate), "day")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2} sm={6}>
            <TextField
              helperText="resolution day"
              InputLabelProps={{ shrink: true }}
              id="resolution_day"
              value={report ? report.endDate : "in progress"}
              label="resolution day"
              multiline
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              helperText="Please enter some note"
              id="note"
              name="note"
              label="Note"
              onChange={(e) => {
                reportChange(e);
              }}
              value={report ? report.note : ""}
              InputLabelProps={{ shrink: true }}
              multiline
              fullWidth
            />
          </Grid>

          <Button type="submit" variant="contained" sx={{ mt: 4 }}>
            {state ? "UpDate" : "Register"}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
}
