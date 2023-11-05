import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Page3(props) {
  const { value, setValue } = props;

  const getOrdinal = (num) => {
    if (num % 100 >= 11 && num % 100 <= 13) {
      return num + "th";
    } else {
      switch (num % 10) {
        case 1:
          return num + "st";
        case 2:
          return num + "nd";
        case 3:
          return num + "rd";
        default:
          return num + "th";
      }
    }
  };

  const substance_list = [
    "ASA",
    "Aspirin",
    "aspirin",
    "APAP",
    "Acetaminophen",
    "acetaminophen",
    "Tylenol",
    "tylenol",
    "EtOH",
    "Etoh",
    "ETOH",
    "etoh",
    "Methanol",
    "methanol",
    "Ethylene glycol",
    "ethylene glycol",
    "Antifreeze",
    "antifreeze",
    "EG",
    "eg",
    "Valproic acid",
    "valproic acid",
    "VPA",
    "Lithium",
    "lithium",
    "Iron",
    "iron",
    "Carbamazepine",
    "carbamazepine",
    "CBZ",
    "Phenobarbital",
    "phenobarbital",
    "Phenytoin",
    "phenytoin",
    "Digoxin",
    "digoxin",
    "Lead",
    "lead",
    "Pb",
    "pb",
  ];

  const agents_num_unknown = () => {
    var myArray = (
      <>
        <label>Severity of exposure based on the clinical presentation </label>
        <br />
        <FormControl style={{ width: "322px" }}>
          <InputLabel id="demo-simple-select-label">Select here...</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={value?.v3_1}
            label="Select here..."
            onChange={(e) => setValue({ ...value, v3_1: e.target.value })}
          >
            <MenuItem value={"mild-moderate"}>Mild-Moderate</MenuItem>
            <MenuItem value={"severe"}>Severe</MenuItem>
          </Select>
        </FormControl>
        <br />
        {value?.substance_level === "yes" && (
          <>
            <label> Severity of exposure based on the serum level </label>
            <br />
            <FormControl style={{ width: "322px" }}>
              <InputLabel id="demo-simple-select-label">
                Select here...
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={value?.v3_2}
                label="Select here..."
                onChange={(e) => setValue({ ...value, v3_2: e.target.value })}
              >
                <MenuItem value={"mild-moderate"}>Mild-Moderate</MenuItem>
                <MenuItem value={"severe"}>Severe</MenuItem>
              </Select>
            </FormControl>
            <br />
          </>
        )}
        <label> Possible symptoms based on the severity of exposure </label>{" "}
        <br />
        <TextField
          id="3-3"
          label="Write here..."
          variant="outlined"
          multiline
          maxRows={4}
          sx={{ width: "644px" }}
          value={value?.v3_3}
          onChange={(e) => setValue({ ...value, v3_3: e.target.value })}
        />
        <br />
      </>
    );
    return myArray;
  };
  const agents_num = () => {
    let length = value?.agents;
    var myArray = [];
    for (let i = 0; i < length; i++) {
      myArray[i] = (
        <>
          <label>
            {" "}
            Toxic dose of the {getOrdinal(1 + i)} substance is known?{" "}
          </label>
          <br />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value?.[`v3_${i + 1}_1`]}
              onChange={(e) =>
                setValue({ ...value, [`v3_${i + 1}_1`]: e.target.value })
              }
            >
              <FormControlLabel
                value="known"
                control={<Radio />}
                label="Known"
              />
              <FormControlLabel
                value="unknown"
                control={<Radio />}
                label="Unknown"
              />
            </RadioGroup>
          </FormControl>
          <br />
          {value?.[`v3_${i + 1}_1`] === "known" && (
            <>
              <label> Toxic dose of the {getOrdinal(1 + i)} substance </label>{" "}
              <br />
              <TextField
                id={`3-1-${i}`}
                label="Write here..."
                variant="outlined"
                value={value?.[`v3_${i + 1}_2`]}
                onChange={(e) =>
                  setValue({ ...value, [`v3_${i + 1}_2`]: e.target.value })
                }
              />
              <FormControl style={{ width: "100px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.[`v3_${i + 1}_2_unit`]}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      [`v3_${i + 1}_2_unit`]: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"mg/kg"}>mg/kg</MenuItem>
                  <MenuItem value={"mg"}>mg</MenuItem>
                  <MenuItem value={"ml"}>ml</MenuItem>
                </Select>
              </FormControl>
              <br />
            </>
          )}
          <label> Severity of exposure based on the dose </label> <br />
          <FormControl style={{ width: "322px" }}>
            <InputLabel id="demo-simple-select-label">
              Select here...
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={value?.[`v3_${i + 1}_3`]}
              label="Select here..."
              onChange={(e) =>
                setValue({ ...value, [`v3_${i + 1}_3`]: e.target.value })
              }
            >
              <MenuItem value={"mild-moderate"}>Mild-Moderate</MenuItem>
              <MenuItem value={"severe"}>Severe</MenuItem>
            </Select>
          </FormControl>
          <br />
          <label>
            Severity of exposure based on the clinical presentation{" "}
          </label>
          <br />
          <FormControl style={{ width: "322px" }}>
            <InputLabel id="demo-simple-select-label">
              Select here...
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={value?.[`v3_${i + 1}_4`]}
              label="Select here..."
              onChange={(e) =>
                setValue({ ...value, [`v3_${i + 1}_4`]: e.target.value })
              }
            >
              <MenuItem value={"mild-moderate"}>Mild-Moderate</MenuItem>
              <MenuItem value={"severe"}>Severe</MenuItem>
            </Select>
          </FormControl>
          <br />
          {substance_list.includes(value?.[`v2_4_${i + 1}`]) && (
            <>
              <label>
                Toxic serum level of the {getOrdinal(1 + i)} substance{" "}
              </label>
              <br />
              <TextField
                id={`3-4-${i}`}
                label="Write here..."
                variant="outlined"
                value={value?.[`v3_${i + 1}_5`]}
                onChange={(e) =>
                  setValue({ ...value, [`v3_${i + 1}_5`]: e.target.value })
                }
              />
              <FormControl style={{ width: "100px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.[`v3_${i + 1}_8`]}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, [`v3_${i + 1}_8`]: e.target.value })
                  }
                >
                  <MenuItem value={"mg/dL"}>mg/dL</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mEq/L"}>mEq/L</MenuItem>
                  <MenuItem value={"mcg/dL"}>mcg/dL</MenuItem>
                  <MenuItem value={"ng/mL"}>ng/mL</MenuItem>
                  <MenuItem value={"mmol/L"}>mmol/L</MenuItem>
                </Select>
              </FormControl>
              <br />
              <label> Severity of exposure based on the serum level </label>
              <br />
              <FormControl style={{ width: "322px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select here...
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.[`v3_${i + 1}_6`]}
                  label="Select here..."
                  onChange={(e) =>
                    setValue({ ...value, [`v3_${i + 1}_6`]: e.target.value })
                  }
                >
                  <MenuItem value={"mild-moderate"}>Mild-Moderate</MenuItem>
                  <MenuItem value={"severe"}>Severe</MenuItem>
                </Select>
              </FormControl>
              <br />
            </>
          )}
          <label> Possible symptoms based on the severity of exposure </label>{" "}
          <br />
          <TextField
            id={`3-6-${i}`}
            label="Write here..."
            variant="outlined"
            multiline
            maxRows={4}
            sx={{ width: "644px" }}
            value={value?.[`v3_${i + 1}_7`]}
            onChange={(e) =>
              setValue({ ...value, [`v3_${i + 1}_7`]: e.target.value })
            }
          />
          <br />
        </>
      );
    }
    return myArray;
  };

  const assessment = () => {
    let length = value?.agents;
    var myArray = [];
    var doseArray = [];

    for (let i = 0; i < length; i++) {
      doseArray[i] =
        (value[`v2_5_unit_${i + 1}`] === "mcg"
          ? value[`v2_5_${i + 1}`] * 0.001
          : value[`v2_5_unit_${i + 1}`] === "g"
          ? value[`v2_5_${i + 1}`] * 1000
          : value[`v2_5_${i + 1}`]) /
        (value?.weightunit === "kg" ? value?.weight : value?.weight * 0.45);
      doseArray[i] = Math.floor(doseArray[i] * 100) / 100.0;
      myArray[i] = (
        <span>
          {`${
            value[`v3_${i + 1}_1`] === "known"
              ? "The toxic dose of " +
                getOrdinal(1 + i) +
                " substance" +
                "(" +
                value?.[`v2_4_${i + 1}`] +
                ")" +
                " is " +
                value[`v3_${i + 1}_2`] +
                " " +
                value[`v3_${i + 1}_2_unit`] +
                ", and the "
              : ""
          }${
            value[`v3_${i + 1}_1`]
              ? "Pt ingested " +
                value?.[`v2_5_${i + 1}`] +
                " " +
                value?.[`v2_5_unit_${i + 1}`] +
                " " +
                "(" +
                doseArray[i] +
                "mg/kg" +
                ") and based on this dose, the severity of exposure is " +
                (value[`v3_${i + 1}_3`]
                  ? "expected to be " + value[`v3_${i + 1}_3`]
                  : "yet to be determined") +
                ". "
              : ""
          }${
            value[`v3_${i + 1}_1`]
              ? "The clinical presentation " +
                (value[`v3_${i + 1}_4`]
                  ? "also suggests a " +
                    value[`v3_${i + 1}_4`] +
                    " severity of exposure."
                  : "does not provide a clear indication of the severity at this point. Therefore, further evaluation is necessary to determine the severity based on clinical presentation.")
              : ""
          }`}
          <br />
          <br />
          {substance_list.includes(value?.[`v2_4_${i + 1}`]) && (
            <>
              {`${
                value[`v3_${i + 1}_1`]
                  ? value[`v3_${i + 1}_5`]
                    ? "The toxic serum level of the " +
                      getOrdinal(1 + i) +
                      " substance" +
                      "(" +
                      value?.[`v2_4_${i + 1}`] +
                      ") is " +
                      value[`v3_${i + 1}_5`] +
                      (value[`v3_${i + 1}_8`]
                        ? " " + value[`v3_${i + 1}_8`]
                        : "") +
                      "."
                    : "However, the toxic serum level of the " +
                      getOrdinal(1 + i) +
                      " substance(" +
                      value?.[`v2_4_${i + 1}`] +
                      ") is yet to be determined. The serum level will provide valuable information to assess the severity of exposure accurately. It is essential to monitor the patient's clinical condition closely until the serum level is obtained."
                  : ""
              }           
          `}
              <br />
              <br />
            </>
          )}
        </span>
      );
    }
    return myArray;
  };
  const assessment_ = () => {
    let length = value?.agents;
    var myArray = [];

    let a = 0;
    for (let i = 0; i < length; i++) {
      a = value?.[`v3_${i + 1}_1`] ? (value?.[`v3_${i + 1}_7`] ? i + 1 : a) : a;
      console.log(a);
    }

    for (let i = 0; i < length; i++) {
      myArray[i] = (
        <span>
          {`${
            value[`v3_${i + 1}_1`]
              ? value[`v3_${i + 1}_7`]
                ? "the possible symptoms of the " +
                  getOrdinal(1 + i) +
                  " substance(" +
                  value?.[`v2_4_${i + 1}`] +
                  ") are " +
                  value[`v3_${i + 1}_7`] +
                  (a === i + 1 ? "." : ", ")
                : ""
              : ""
          } `}
        </span>
      );
    }

    return myArray;
  };

  const assessment__ = () => {
    let length = value?.agents;
    let a = 0;
    for (let i = 0; i < length; i++) {
      a = value?.[`v3_${i + 1}_1`] ? (value?.[`v3_${i + 1}_7`] ? i + 1 : a) : a;
    }
    return a > 0 ? "Based on the severity of exposure, " : "";
  };

  return (
    <Box>
      {value?.substance === "yes" ? agents_num() : agents_num_unknown()}
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
          {value?.substance === "yes" ? assessment() : ""}
          {value?.substance === "yes" ? assessment__() : ""}
          {value?.substance === "yes" ? assessment_() : ""}
          {value?.substance !== "yes"
            ? (value?.v3_1
                ? "The clinical presentation suggests a " +
                  value?.v3_1 +
                  " severity of exposure. "
                : "") +
              (value?.substance_level === "yes" && value.v3_2
                ? "Based on this serum level, the severity of exposure is predicated to be " +
                  value.v3_2 +
                  ". "
                : "") +
              (value?.v3_3
                ? "Based on the severity of exposure, the possible symptoms are " +
                  value?.v3_3 +
                  ". "
                : "")
            : ""}
        </label>
        <br />
      </div>
    </Box>
  );
}
