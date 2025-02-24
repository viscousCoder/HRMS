import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { FaCalendarPlus, FaEdit, FaTrash } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.tsx";
import {
  handleGetCalenderData,
  handleSendCalenderData,
} from "../../store/calenderSlice.tsx";
import { getDetails } from "../../store/employeeSlice.tsx";

interface propsType {
  isClicked: boolean;
}

const CalendarWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const CalendarGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const CalendarDay = styled(Paper)(({ theme, isToday, hasEvents, days }) => ({
  padding: theme.spacing(1),
  minHeight: "100px",
  height: "fit-content",
  cursor: "pointer",
  position: "relative",
  backgroundColor: isToday ? "#e3f2fd" : "inherit",
  //   backgroundColor: isToday ? "#e3f2fd" : "inherit",
  border: isToday ? "2px solid #1976d2" : "none",
  //   boxShadow: isToday ? "0 0 10px rgba(25, 118, 210, 0.2)" : "none",
  "&:hover": {
    backgroundColor: theme.palette.action?.hover,
  },
}));

const eventTypes = [
  { id: 1, name: "Meeting", color: "#FF4081" },
  { id: 2, name: "Holiday", color: "#00BCD4" },
  { id: 3, name: "Task", color: "#4CAF50" },
  { id: 4, name: "Reminder", color: "#FFC107" },
  { id: 5, name: "Present", color: "#70e04c" },
];

const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: dayjs(),
    end: dayjs().add(1, "hour"),
    type: 1,
    description: "Weekly team sync",
  },
  {
    id: 2,
    title: "Holiday",
    start: dayjs(),
    end: dayjs().add(1, "hour"),
    type: 2,
    description: "Weekly team sync",
  },
];

const Attendance = ({ isClicked }: propsType) => {
  const data = useSelector<RootState>((state) => state.calender?.data);
  const newData = data
    ?.map((item) => JSON.parse(item.calender_data))
    ?.map((item) => ({
      ...item,
      start: dayjs(item.start),
      end: dayjs(item.end),
    }));
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openEventForm, setOpenEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const role = localStorage.getItem("role");
  const [eventForm, setEventForm] = useState({
    title: "",
    start: dayjs(),
    end: dayjs().add(1, "hour"),
    type: 1,
    description: "",
    isEveryone: false,
  });
  const dispatch = useDispatch<AppDispatch>();

  /**first time data getting */
  useEffect(() => {
    console.log("hi");
    // const token = localStorage.getItem("token");
    // if (token)
    dispatch(getDetails());
    dispatch(handleGetCalenderData());
  }, []);
  // useEffect(() => {
  //   if (!currentDate) {
  //     console.log("hello");
  //     setCurrentDate(dayjs());
  //   }
  // }, [currentDate]);

  useEffect(() => {
    console.log(isClicked, "hello");
    if (isClicked) {
      let data = true;
      for (let i = 0; i < newData?.length; i++) {
        console.log("helliooo", i);
        if (
          newData[i].start.$D === dayjs().$D &&
          newData[i].start.$Y === dayjs().$Y &&
          newData[i].title === "Present"
        ) {
          data = false;
        }
      }

      if (data) {
        let presentData = {
          id: Date.now(),
          title: "Present",
          start: dayjs(),
          end: dayjs().add(1, "hour"),
          type: 5,
          description: "Employee is present",
          isEveryone: false,
        };
        // setEventForm(presentData);
        // handleEventSubmit(false);
        // dispatch(handleSendCalenderData(presentData));
        dispatch(handleSendCalenderData(presentData)).then(() => {
          dispatch(handleGetCalenderData());
        });

        setUpdateData(true);
      }
    }
  }, [isClicked]);

  // useEffect(() => {
  //   console.log(isClicked, "hello");
  //   if (updateData) {
  //     dispatch(handleGetCalenderData());
  //     setUpdateData(false);
  //   }
  // }, [updateData, dispatch]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEventForm({ ...eventForm, start: date, end: date.add(1, "hour") });
    setOpenEventForm(true);
  };

  const handleEventSubmit = (all: false) => {
    console.log(all, "testing", eventForm);
    // setEventForm((prev) => ({ ...prev, isEveryone: all }));
    console.log(eventForm, "hellos");

    if (eventForm.start.isAfter(eventForm.end)) {
      setSnackbar({
        open: true,
        message: "Start time must be before end time",
        severity: "error",
      });
      return;
    }

    if (eventForm.title !== "") {
      if (!all) {
        if (selectedEvent) {
          setEvents(
            events?.map((event) =>
              event.id === selectedEvent.id
                ? { ...eventForm, id: event.id }
                : event
            )
          );
          setSnackbar({
            open: true,
            message: "Event updated successfully",
            severity: "success",
          });
        } else {
          setEvents([...events, { ...eventForm, id: Date.now() }]);
          setSnackbar({
            open: true,
            message: "Event created successfully",
            severity: "success",
          });
          dispatch(handleSendCalenderData(eventForm)).then(() => {
            dispatch(handleGetCalenderData());
          });
        }
      } else {
        if (selectedEvent) {
          setEvents(
            events?.map((event) =>
              event.id === selectedEvent.id
                ? { ...eventForm, id: event.id }
                : event
            )
          );
          setSnackbar({
            open: true,
            message: "Event updated successfully",
            severity: "success",
          });
        } else {
          setEvents([...events, { ...eventForm, id: Date.now() }]);
          setSnackbar({
            open: true,
            message: "Event created successfully",
            severity: "success",
          });
          dispatch(
            handleSendCalenderData({ ...eventForm, isEveryone: true })
          ).then(() => {
            dispatch(handleGetCalenderData());
          });
        }
      }
    }
    handleCloseEventForm();
    // if (form) handleCloseEventForm();
  };

  /**sadas */
  // if (isClicked) {
  //   let data = true;
  //   for (let i = 0; i < newData?.length; i++) {
  //     if (
  //       newData[i].start.$D === dayjs().$D &&
  //       newData[i].start.$Y === dayjs().$Y &&
  //       newData[i].title === "Present"
  //     ) {
  //       data = false;
  //     }
  //   }

  //   if (data) {
  //     let presentData = {
  //       id: Date.now(),
  //       title: "Present",
  //       start: dayjs(),
  //       end: dayjs().add(1, "hour"),
  //       type: 5,
  //       description: "Employee is present",
  //     };
  //     setEventForm(presentData);
  //     handleEventSubmit(false);
  //   }
  // }

  const handleDeleteEvent = (event) => {
    setEvents(newData?.filter((e) => e.id !== event.id));
    setSnackbar({
      open: true,
      message: "Event deleted successfully",
      severity: "success",
    });
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEventForm(event);
    setOpenEventForm(true);
  };

  const handleCloseEventForm = () => {
    setOpenEventForm(false);
    setSelectedEvent(null);
    setEventForm({
      title: "",
      start: dayjs(),
      end: dayjs().add(1, "hour"),
      type: 1,
      description: "",
      isEveryone: false,
    });
    dispatch(handleGetCalenderData());
  };

  const getDaysInMonth = (date) => {
    const start = date.startOf("month");
    const end = date.endOf("month");
    const days = [];

    // Padding for the days before the first of the month
    const startDayOfWeek = start.day(); // 0 for Sunday, 1 for Monday, etc.
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null); // Add placeholders
    }

    let current = start;
    while (current.isBefore(end) || current.isSame(end, "day")) {
      days.push(current);
      current = current.add(1, "day");
    }

    return days;
  };

  const renderCalendar = () => {
    if (!currentDate) return null;

    const days = getDaysInMonth(currentDate);

    return days?.map((day, index) => {
      if (day === null) {
        return <CalendarDay key={`placeholder-${index}`} />;
      }

      const dayEvents = newData?.filter((event) =>
        event.start.isSame(day, "day")
      );

      return (
        <CalendarDay
          key={day.toString()}
          onClick={() => handleDateClick(day)}
          isToday={day.isSame(dayjs(), "day")}
          days={day.format("D")}
          hasEvents={dayEvents.length > 0}
        >
          <Typography variant="body2">{day.format("D")}</Typography>
          {dayEvents?.map((event) => (
            <Box
              key={event.id}
              sx={{
                backgroundColor: eventTypes.find((t) => t.id === event.type)
                  ?.color,
                color: "white",
                padding: "2px 4px",
                borderRadius: "4px",
                marginTop: "2px",
                fontSize: "12px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleEditEvent(event);
              }}
            >
              {event.title}
            </Box>
          ))}
        </CalendarDay>
      );
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => prev.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prev) => prev.subtract(1, "month"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handlePreviousMonth}>
              <ChevronLeft />
            </IconButton>
            <Typography variant="h5">
              {currentDate.format("MMMM YYYY")}
            </Typography>
            <IconButton onClick={handleNextMonth}>
              <ChevronRight />
            </IconButton>
          </Box>
          <Button
            startIcon={<FaCalendarPlus />}
            variant="contained"
            onClick={() => handleDateClick(dayjs())}
          >
            Add Event
          </Button>
        </Box>

        <Grid container spacing={1} sx={{ marginTop: 2 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]?.map((day) => (
            <Grid item key={day} xs={1.7}>
              <Typography align="center" variant="subtitle2">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <CalendarGrid>{renderCalendar()}</CalendarGrid>

        <Dialog
          open={openEventForm}
          onClose={handleCloseEventForm}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {selectedEvent ? "Edit Event" : "Add New Event"}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <TextField
                label="Event Title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm({ ...eventForm, title: e.target.value })
                }
                fullWidth
                required
              />

              <DateTimePicker
                label="Start Date & Time"
                value={eventForm.start}
                onChange={(newValue) =>
                  setEventForm({ ...eventForm, start: newValue })
                }
              />

              <DateTimePicker
                label="End Date & Time"
                value={eventForm.end}
                onChange={(newValue) =>
                  setEventForm({ ...eventForm, end: newValue })
                }
              />

              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={eventForm.type}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, type: e.target.value })
                  }
                  label="Event Type"
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm({ ...eventForm, description: e.target.value })
                }
                multiline
                rows={4}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            {selectedEvent && (
              <Button
                startIcon={<FaTrash />}
                onClick={() => {
                  handleDeleteEvent(selectedEvent);
                  handleCloseEventForm();
                }}
                color="error"
              >
                Delete
              </Button>
            )}
            <Button onClick={handleCloseEventForm}>Cancel</Button>
            <Button
              onClick={() => handleEventSubmit(false)}
              variant="contained"
              color="primary"
            >
              {selectedEvent ? "Update" : "Create"}
            </Button>
            <Button
              onClick={() => handleEventSubmit(true)}
              variant="contained"
              color="primary"
            >
              {selectedEvent ? "Update" : "Create All"}
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CalendarWrapper>
    </LocalizationProvider>
  );
};

export default Attendance;
