import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Page1(props) {
  const { value, setValue } = props;

  return (
    <Box>
      <label> Caller's name </label> <br />
      <TextField
        id="1-1"
        label="Write here..."
        variant="outlined"
        value={value?.name}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        sx={{ width: "322px" }}
      />
      <br />
      <label> Caller's title </label> <br />
      <TextField
        id="1-2"
        label="Write here..."
        variant="outlined"
        value={value?.title}
        onChange={(e) => setValue({ ...value, title: e.target.value })}
        sx={{ width: "322px" }}
      />
      <br />
      <label> Call back number </label> <br />
      <TextField
        id="1-3"
        label="Write here..."
        variant="outlined"
        value={value?.callbacknumber}
        onChange={(e) => setValue({ ...value, callbacknumber: e.target.value })}
        sx={{ width: "322px" }}
      />
      <br />
      <label> Healthcare facility's name </label> <br />
      <TextField
        id="1-4"
        label="Write here..."
        variant="outlined"
        value={value?.facility}
        onChange={(e) => setValue({ ...value, facility: e.target.value })}
        sx={{ width: "644px" }}
      />
      <br />
      <label> Unit where the patient is currently located </label> <br />
      <TextField
        id="1-5"
        label="Write here..."
        variant="outlined"
        value={value?.unit}
        onChange={(e) => setValue({ ...value, unit: e.target.value })}
        sx={{ width: "644px" }}
      />
      <br />
      <br />
      <br />
      <div
        style={{
          backgroundColor: "lightgray",
          width: "605px",
          borderRadius: "5px",
          padding: "10px 20px",
        }}
      >
        <label>
          {value?.name}
          {value?.title ? ", " + value?.title : ""}
          {value?.facility ? " from " + value?.facility : ""}
          {value?.callbacknumber
            ? " (contact number: " +
              value?.callbacknumber +
              ") dialed the poison center"
            : ""}
          {value?.unit
            ? ", seeking assistance for a patient located in the " +
              value?.unit +
              "."
            : ""}
        </label>
        <br />
      </div>
    </Box>
  );
}
