// import React, { useState, useCallback } from "react";

// import {
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Typography,
//   CircularProgress,
//   Autocomplete,
//   Avatar,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import axios, { AxiosError } from "axios";

// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Image from "../assets/google.png";

// const RegisterForm: React.FC = () => {
//   // const apiuri = import.meta.env.VITE_SECRET_API_URL;

//   const navigate = useNavigate();
//   const [formValues, setFormValues] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//   });

//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Address autocomplete state
//   const [addressOptions, setAddressOptions] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
//     null
//   );

//   const apiData = (query: string) => {
//     if (!query.trim()) {
//       setAddressOptions([]);
//       return;
//     }

//     setLoading(true);
//     const config = {
//       method: "get",
//       url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=94a5631c98e84c2fb7233fcbe791569e`,
//     };

//     axios(config)
//       .then((response) => {
//         const results = response.data.features.map(
//           (item: any) => item.properties.formatted
//         );
//         setAddressOptions(results);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const debouncedApiCall = useCallback(
//     (query: string) => {
//       if (debounceTimeout) {
//         clearTimeout(debounceTimeout);
//       }

//       const timeoutId = setTimeout(() => {
//         apiData(query);
//       }, 500);

//       setDebounceTimeout(timeoutId);
//     },
//     [debounceTimeout]
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const handleAddressInputChange = (
//     event: React.SyntheticEvent<Element, Event>,
//     newValue: string
//   ) => {
//     console.log(event);
//     setFormValues({ ...formValues, address: newValue });
//     debouncedApiCall(newValue);
//   };

//   const handleAddressChange = (
//     // event: React.ChangeEvent<{}>,
//     event: React.SyntheticEvent<Element, Event>,
//     newValue: string | null
//   ) => {
//     console.log(event);
//     setFormValues({ ...formValues, address: newValue || "" });
//   };

//   const validate = (): boolean => {
//     let valid = true;
//     const newErrors = {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       address: "",
//     };

//     // Username validation
//     if (!formValues.username || formValues.username.length < 4) {
//       newErrors.username = "Username must be at least 4 characters.";
//       valid = false;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formValues.email || !emailRegex.test(formValues.email)) {
//       newErrors.email = "Invalid email format.";
//       valid = false;
//     }

//     // Password validation
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
//     if (!formValues.password || !passwordRegex.test(formValues.password)) {
//       newErrors.password =
//         "Password must be 8-15 characters, include a letter and a number.";
//       valid = false;
//     }

//     // Confirm Password validation
//     if (formValues.password !== formValues.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//       valid = false;
//     }

//     // Address validation
//     if (!formValues.address) {
//       newErrors.address = "Address is required.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log("Form Submitted Successfully", formValues);
//       try {
//         const response = await axios.post(
//           // `${apiuri}/signup`,
//           // "http://localhost:8000/signup",
//           // "https://useronboarding-tau.vercel.app/signup",
//           "https://user-onboard.onrender.com/signup",
//           formValues
//         );
//         if (response.status === 201) {
//           toast.success("Register successfully");
//           navigate("/login");
//         }
//       } catch (error) {
//         const err = error as AxiosError;
//         toast.error("Email already exist");
//         setErrors({
//           ...errors,
//           email: "Email already exist",
//         });
//         console.log(err);
//       }
//     }
//   };

//   const google = () => {
//     // window.open("http://localhost:8000/auth/google", "_self");
//     // window.open("https://useronboarding-tau.vercel.app/auth/google", "_self");
//     window.open("https://user-onboard.onrender.com/auth/google", "_self");
//     // window.open(`${apiuri}/auth/google`, "_self");
//   };

//   // const getUser = async () => {
//   //   try {
//   //     const response = await axios.get("https://user-onboard.onrender.com/login/success", {
//   //       withCredentials: true,
//   //     });
//   //     // console.log(response.data.user._id, "Data");
//   //     localStorage.setItem("token", response.data.token);
//   //     localStorage.setItem("accessToken", response.data.user.accessToken);
//   //     localStorage.setItem("itemId", response.data.user.itemId);
//   //     localStorage.setItem("userId", response.data.user._id);
//   //     // setUserdata(response.data.user);
//   //     navigate("/");
//   //   } catch (error) {
//   //     console.log("error", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   getUser();
//   // }, []);

//   return (
//     <form onSubmit={handleSubmit} method="post">
//       <TextField
//         label="Username"
//         fullWidth
//         margin="normal"
//         name="username"
//         value={formValues.username}
//         onChange={handleInputChange}
//         error={Boolean(errors.username)}
//         helperText={errors.username}
//       />
//       <TextField
//         label="Email"
//         fullWidth
//         margin="normal"
//         name="email"
//         value={formValues.email}
//         onChange={handleInputChange}
//         error={Boolean(errors.email)}
//         helperText={errors.email}
//       />
//       <TextField
//         label="Password"
//         fullWidth
//         margin="normal"
//         type={showPassword ? "text" : "password"}
//         name="password"
//         value={formValues.password}
//         onChange={handleInputChange}
//         error={Boolean(errors.password)}
//         helperText={errors.password}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <TextField
//         label="Confirm Password"
//         fullWidth
//         margin="normal"
//         type={showConfirmPassword ? "text" : "password"}
//         name="confirmPassword"
//         value={formValues.confirmPassword}
//         onChange={handleInputChange}
//         error={Boolean(errors.confirmPassword)}
//         helperText={errors.confirmPassword}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <Autocomplete
//         freeSolo
//         options={addressOptions}
//         inputValue={formValues.address}
//         onInputChange={handleAddressInputChange}
//         onChange={handleAddressChange}
//         loading={loading}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Address"
//             fullWidth
//             margin="normal"
//             error={Boolean(errors.address)}
//             helperText={errors.address}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <>
//                   {loading ? (
//                     <CircularProgress color="inherit" size={20} />
//                   ) : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             }}
//           />
//         )}
//       />
//       <Button
//         type="submit"
//         fullWidth
//         variant="contained"
//         color="primary"
//         sx={{ mt: 2 }}
//       >
//         Register
//       </Button>
//       <Typography textAlign="center" my={2}>
//         or
//       </Typography>

//       <Button
//         startIcon={<Avatar src={Image} />}
//         onClick={google}
//         fullWidth
//         variant="outlined"
//         color="primary"
//         sx={{ mb: 2, p: 0 }}
//       >
//         Login with Google
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;

// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Modal,
//   Button,
//   TextField,
//   MenuItem,
//   Grid,
//   IconButton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { DndContext, DragEndEvent, DragStartEvent, useSensor, useSensors } from "@hello-pangea/dnd";
// import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const CalendarWrapper = styled(Box)(({ theme }) => ({
//   padding: theme.spacing(2),
//   maxWidth: 1200,
//   margin: "0 auto",
// }));

// const CalendarHeader = styled(Box)(({ theme }) => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: theme.spacing(2),
// }));

// const CalendarGrid = styled(Grid)(({ theme }) => ({
//   gap: theme.spacing(1),
// }));

// const DateCell = styled(Paper)(({ theme, isToday, hasEvents }) => ({
//   padding: theme.spacing(1),
//   minHeight: 100,
//   cursor: "pointer",
//   position: "relative",
//   backgroundColor: isToday ? theme.palette.primary.light : "inherit",
//   border: hasEvents ? `2px solid ${theme.palette.secondary.main}` : "none",
//   "&:hover": {
//     backgroundColor: theme.palette.action.hover,
//   },
// }));

// const EventCard = styled(Paper)(({ theme, eventColor }) => ({
//   padding: theme.spacing(1),
//   marginBottom: theme.spacing(0.5),
//   backgroundColor: eventColor || theme.palette.primary.main,
//   color: "white",
//   borderRadius: theme.shape.borderRadius,
//   cursor: "grab",
// }));

// const ModalContent = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   maxWidth: 400,
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: theme.shape.borderRadius,
//   padding: theme.spacing(3),
//   boxShadow: theme.shadows[5],
// }));

// const InteractiveCalendar = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [events, setEvents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   const eventTypes = [
//     { type: "meeting", color: "#1976d2" },
//     { type: "birthday", color: "#e91e63" },
//     { type: "holiday", color: "#4caf50" },
//   ];

//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     type: "meeting",
//     date: null,
//   });

//   const daysInMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0
//   ).getDate();

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setSelectedEvent(null);
//     setNewEvent({ ...newEvent, date });
//     setModalOpen(true);
//   };

//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//     setNewEvent(event);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setSelectedEvent(null);
//     setNewEvent({
//       title: "",
//       description: "",
//       type: "meeting",
//       date: null,
//     });
//   };

//   const handleSaveEvent = () => {
//     if (selectedEvent) {
//       setEvents(
//         events.map((event) =>
//           event.id === selectedEvent.id ? { ...newEvent, id: event.id } : event
//         )
//       );
//     } else {
//       setEvents([
//         ...events,
//         { ...newEvent, id: Date.now(), date: selectedDate },
//       ]);
//     }
//     handleModalClose();
//   };

//   const handleDeleteEvent = () => {
//     setEvents(events.filter((event) => event.id !== selectedEvent.id));
//     handleModalClose();
//   };

//   const sensors = useSensors(
//     useSensor(DragEndEvent, {
//       onDragEnd: (event) => {
//         if (!event.destination) return;

//         const items = Array.from(events);
//         const [ reorderedItem] = items.splice(event.source.index, 1);
//         items.splice(event.destination.index, 0, {
//           ...reorderedItem,
//           date: new Date(event.destination.droppableId),
//         });

//         setEvents(items);
//       },
//     })
//   );

//   const renderCalendarGrid = () => {
//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
//       const dayEvents = events.filter(
//         (event) => new Date(event.date).toDateString() === date.toDateString()
//       );

//       days.push(
//         <Grid item xs={isMobile ? 12 : 6} sm={4} md={3} lg={2} key={i}>
//           <Droppable droppableId={date.toISOString()}>
//             {(provided) => (
//               <DateCell
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 isToday={date.toDateString() === new Date().toDateString()}
//                 hasEvents={dayEvents.length > 0}
//                 onClick={() => handleDateClick(date)}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`Date ${date.toLocaleDateString()}`}
//               >
//                 <Typography variant="subtitle2">{i}</Typography>
//                 {dayEvents.map((event, index) => (
//                   <Draggable
//                     key={event.id}
//                     draggableId={event.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <EventCard
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         eventColor={eventTypes.find((t) => t.type === event.type).color}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleEventClick(event);
//                         }}
//                       >
//                         <Typography variant="caption">{event.title}</Typography>
//                       </EventCard>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </DateCell>
//             )}
//           </Droppable>
//         </Grid>
//       );
//     }
//     return days;
//   };

//   return (
//     <CalendarWrapper>
//       <CalendarHeader>
//         <IconButton onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
//           <FaChevronLeft />
//         </IconButton>
//         <Typography variant="h5">
//           {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
//         </Typography>
//         <IconButton onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
//           <FaChevronRight />
//         </IconButton>
//       </CalendarHeader>

//       <DndContext sensors={sensors}>
//         <CalendarGrid container>
//           {renderCalendarGrid()}
//         </CalendarGrid>
//       </DndContext>

//       <Modal open={modalOpen} onClose={handleModalClose}>
//         <ModalContent>
//           <Typography variant="h6" gutterBottom>
//             {selectedEvent ? "Edit Event" : "New Event"}
//           </Typography>
//           <TextField
//             fullWidth
//             label="Title"
//             value={newEvent.title}
//             onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             multiline
//             rows={3}
//             value={newEvent.description}
//             onChange={(e) =>
//               setNewEvent({ ...newEvent, description: e.target.value })
//             }
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             select
//             label="Event Type"
//             value={newEvent.type}
//             onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
//             margin="normal"
//           >
//             {eventTypes.map((type) => (
//               <MenuItem key={type.type} value={type.type}>
//                 {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSaveEvent}
//               startIcon={selectedEvent ? <FaEdit /> : <FaPlus />}
//             >
//               {selectedEvent ? "Update" : "Add"} Event
//             </Button>
//             {selectedEvent && (
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={handleDeleteEvent}
//                 startIcon={<FaTrash />}
//  >
//                 Delete
//               </Button>
//             )}
//           </Box>
//         </ModalContent>
//       </Modal>
//     </CalendarWrapper>
//   );
// };

// export default InteractiveCalendar;

/*
import React, { useState } from "react";
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
  Alert
} from "@mui/material";
import { styled } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { FaCalendarPlus, FaEdit, FaTrash } from "react-icons/fa";

const CalendarWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1)
}));

const CalendarGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2)
}));

const CalendarDay = styled(Paper)(({ theme, isToday, hasEvents }) => ({
  padding: theme.spacing(1),
  height: "100px",
  cursor: "pointer",
  position: "relative",
  backgroundColor: isToday ? theme.palette.primary.light : "inherit",
  "&:hover": {
    backgroundColor: theme.palette.action.hover
  }
}));

const eventTypes = [
  { id: 1, name: "Meeting", color: "#FF4081" },
  { id: 2, name: "Holiday", color: "#00BCD4" },
  { id: 3, name: "Task", color: "#4CAF50" },
  { id: 4, name: "Reminder", color: "#FFC107" }
];

const initialEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: dayjs(),
    end: dayjs().add(1, "hour"),
    type: 1,
    description: "Weekly team sync"
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openEventForm, setOpenEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const [eventForm, setEventForm] = useState({
    title: "",
    start: dayjs(),
    end: dayjs().add(1, "hour"),
    type: 1,
    description: ""
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEventForm({ ...eventForm, start: date, end: date.add(1, "hour") });
    setOpenEventForm(true);
  };

  const handleEventSubmit = () => {
    if (eventForm.start.isAfter(eventForm.end)) {
      setSnackbar({
        open: true,
        message: "Start time must be before end time",
        severity: "error"
      });
      return;
    }

    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...eventForm, id: event.id } : event
      ));
      setSnackbar({
        open: true,
        message: "Event updated successfully",
        severity: "success"
      });
    } else {
      setEvents([...events, { ...eventForm, id: Date.now() }]);
      setSnackbar({
        open: true,
        message: "Event created successfully",
        severity: "success"
      });
    }

    handleCloseEventForm();
  };

  const handleDeleteEvent = (event) => {
    setEvents(events.filter(e => e.id !== event.id));
    setSnackbar({
      open: true,
      message: "Event deleted successfully",
      severity: "success"
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
      description: ""
    });
  };

  const getDaysInMonth = (date) => {
    const start = date.startOf("month");
    const end = date.endOf("month");
    const days = [];
    let current = start;

    while (current.isBefore(end) || current.isSame(end, "day")) {
      days.push(current);
      current = current.add(1, "day");
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentDate);

    return days.map((day) => {
      const dayEvents = events.filter(event => event.start.isSame(day, "day"));
      return (
        <CalendarDay
          key={day.toString()}
          onClick={() => handleDateClick(day)}
          isToday={day.isSame(dayjs(), "day")}
          hasEvents={dayEvents.length > 0}
        >
          <Typography variant="body2">{day.format("D")}</Typography>
          {dayEvents.map(event => (
            <Box
              key={event.id}
              sx={{
                backgroundColor: eventTypes.find(t => t.id === event.type)?.color,
                color: "white",
                padding: "2px 4px",
                borderRadius: "4px",
                marginTop: "2px",
                fontSize: "12px"
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarWrapper>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">
            {currentDate.format("MMMM YYYY")}
          </Typography>
          <Button
            startIcon={<FaCalendarPlus />}
            variant="contained"
            onClick={() => handleDateClick(dayjs())}
          >
            Add Event
          </Button>
        </Box>

        <Grid container spacing={1} sx={{ marginTop: 2 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Grid item key={day} xs={1.7}>
              <Typography align="center" variant="subtitle2">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <CalendarGrid>
          {renderCalendar()}
        </CalendarGrid>

        <Dialog open={openEventForm} onClose={handleCloseEventForm} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedEvent ? "Edit Event" : "Add New Event"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <TextField
                label="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                fullWidth
                required
              />

              <DateTimePicker
                label="Start Date & Time"
                value={eventForm.start}
                onChange={(newValue) => setEventForm({ ...eventForm, start: newValue })}
              />

              <DateTimePicker
                label="End Date & Time"
                value={eventForm.end}
                onChange={(newValue) => setEventForm({ ...eventForm, end: newValue })}
              />

              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
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
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
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
            <Button onClick={handleEventSubmit} variant="contained" color="primary">
              {selectedEvent ? "Update" : "Create"}
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

export default Calendar; */

/*
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Grid,
  Typography,
  Modal,
  Button,
  TextField,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { styled } from "@mui/system";
import { FaCalendarPlus, FaEdit, FaTrash, FaClock, FaBell, FaUsers } from "react-icons/fa";

const CalendarCell = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "120px",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    backgroundColor: theme.palette.grey[100]
  }
}));

const EventChip = styled(Chip)({
  margin: "2px",
  maxWidth: "95%"
});

const InteractiveCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: "2024-01-15",
      type: "meeting",
      description: "Weekly team sync"
    },
    {
      id: 2,
      title: "Project Deadline",
      date: "2024-01-18",
      type: "deadline",
      description: "Submit final deliverables"
    }
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "meeting",
    description: ""
  });

  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      date: selectedDate
    };
    setEvents([...events, event]);
    setOpenModal(false);
    setNotification({ open: true, message: "Event added successfully!", severity: "success" });
    resetForm();
  };

  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id ? { ...selectedEvent, ...newEvent } : event
    );
    setEvents(updatedEvents);
    setOpenModal(false);
    setNotification({ open: true, message: "Event updated successfully!", severity: "info" });
    resetForm();
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setNotification({ open: true, message: "Event deleted successfully!", severity: "error" });
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      type: "meeting",
      description: ""
    });
    setSelectedEvent(null);
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "meeting":
        return <FaUsers />;
      case "deadline":
        return <FaClock />;
      default:
        return <FaBell />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case "meeting":
        return "primary";
      case "deadline":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs>
            <Typography variant="h4" component="h1">
              Interactive Calendar
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<FaCalendarPlus />}
              onClick={() => {
                setSelectedDate(new Date().toISOString().split("T")[0]);
                setOpenModal(true);
              }}
            >
              Add Event
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {[...Array(31)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CalendarCell>
                <Typography variant="subtitle2" gutterBottom>
                  January {index + 1}, 2024
                </Typography>
                {events
                  .filter(
                    (event) =>
                      new Date(event.date).getDate() === index + 1 &&
                      new Date(event.date).getMonth() === 0
                  )
                  .map((event) => (
                    <EventChip
                      key={event.id}
                      icon={getEventIcon(event.type)}
                      label={event.title}
                      color={getEventColor(event.type)}
                      onDelete={() => handleDeleteEvent(event.id)}
                      onClick={() => {
                        setSelectedEvent(event);
                        setNewEvent({
                          title: event.title,
                          type: event.type,
                          description: event.description
                        });
                        setOpenModal(true);
                      }}
                    />
                  ))}
              </CalendarCell>
            </Grid>
          ))}
        </Grid>

        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            resetForm();
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "400px" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </Typography>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={newEvent.type}
                label="Event Type"
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
                <MenuItem value="reminder">Reminder</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={selectedEvent ? handleEditEvent : handleAddEvent}
              >
                {selectedEvent ? "Update" : "Add"} Event
              </Button>
            </Box>
          </Box>
        </Modal>

        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default InteractiveCalendar;
 */
