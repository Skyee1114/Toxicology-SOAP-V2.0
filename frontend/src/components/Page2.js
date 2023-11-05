import React, { useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function Page2(props) {
  const { value, setValue } = props;
  const curyear = new Date().getFullYear();
  const curmonth = new Date().getMonth();

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

  const getMonthName = (num) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[num - 1];
  };

  const daily_dose = () => {
    let length = value?.agents;
    var myArray = [];

    for (let i = 0; i < length; i++) {
      myArray[i] = (
        <>
          <Box>
            <label> {getOrdinal(1 + i)} substance's daily dose </label> <br />
            <TextField
              id={`2-50-${i}`}
              label="Write here..."
              variant="outlined"
              value={value?.[`v2_50_${i + 1}`]}
              onChange={(e) =>
                setValue({ ...value, [`v2_50_${i + 1}`]: e.target.value })
              }
              sx={{ width: "222px" }}
            />
            <FormControl style={{ width: "100px" }}>
              <InputLabel id="demo-simple-select-label">
                Select a unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={value?.[`v2_50_unit_${i + 1}`]}
                label="Select a unit"
                onChange={(e) =>
                  setValue({
                    ...value,
                    [`v2_50_unit_${i + 1}`]: e.target.value,
                  })
                }
              >
                <MenuItem value={"mcg"}>mcg</MenuItem>
                <MenuItem value={"mg"}>mg</MenuItem>
                <MenuItem value={"g"}>g</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      );
    }
    return myArray;
  };

  const agents_num = () => {
    let length = value?.agents;
    var myArray = [];

    for (let i = 0; i < length; i++) {
      myArray[i] = (
        <>
          <Box>
            <label> {getOrdinal(1 + i)} substance's name </label> <br />
            <TextField
              id={`2-4-${i}`}
              label="Write here..."
              variant="outlined"
              value={value?.[`v2_4_${i + 1}`]}
              onChange={(e) =>
                setValue({ ...value, [`v2_4_${i + 1}`]: e.target.value })
              }
              sx={{ width: "222px" }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> {getOrdinal(1 + i)} substance's Dose </label> <br />
              <TextField
                id={`2-5-${i}`}
                label="Write here..."
                variant="outlined"
                value={value?.[`v2_5_${i + 1}`]}
                onChange={(e) =>
                  setValue({ ...value, [`v2_5_${i + 1}`]: e.target.value })
                }
                sx={{ width: "122px" }}
              />
              <FormControl style={{ width: "100px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.[`v2_5_unit_${i + 1}`]}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({
                      ...value,
                      [`v2_5_unit_${i + 1}`]: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"mcg"}>mcg</MenuItem>
                  <MenuItem value={"mg"}>mg</MenuItem>
                  <MenuItem value={"g"}>g</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <label> Amount </label> <br />
                <TextField
                  id={`2-8-${i}`}
                  label="Write here..."
                  variant="outlined"
                  value={value?.[`v2_8_${i + 1}`]}
                  onChange={(e) =>
                    setValue({ ...value, [`v2_8_${i + 1}`]: e.target.value })
                  }
                  sx={{ width: "122px" }}
                />
                <FormControl style={{ width: "100px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Select a unit
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={value?.[`v2_8_unit_${i + 1}`]}
                    label="Select a unit"
                    onChange={(e) =>
                      setValue({
                        ...value,
                        [`v2_8_unit_${i + 1}`]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"oz"}>oz</MenuItem>
                    <MenuItem value={"lbs"}>lbs</MenuItem>
                    <MenuItem value={"ml"}>ml</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"tsp"}>tsp</MenuItem>
                    <MenuItem value={"tab/pill/capsule"}>
                      tab/pill/capsule
                    </MenuItem>
                    <MenuItem value={"taste/lick/drop"}>
                      taste/lick/drop
                    </MenuItem>
                    <MenuItem value={"Mouthful(s)"}>Mouthful(s)</MenuItem>
                    <MenuItem value={"Sip(s)"}>Sip(s)</MenuItem>
                    <MenuItem value={"each (e.g. bites/sting)"}>
                      each (e.g. bites/sting)
                    </MenuItem>
                    <MenuItem value={"units/IU"}>units/IU</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {(value?.[`v2_8_unit_${i + 1}`] === "ml" ||
                value?.[`v2_8_unit_${i + 1}`] === "L" ||
                value?.[`v2_8_unit_${i + 1}`] === "tsp" ||
                value?.[`v2_8_unit_${i + 1}`] === "oz" ||
                value?.[`v2_8_unit_${i + 1}`] === "Sip(s)" ||
                value?.[`v2_8_unit_${i + 1}`] === "Mouthful(s)" ||
                value?.[`v2_8_unit_${i + 1}`] === "taste/lick/drop") && (
                <>
                  <Box>
                    <label> Concentration (%) </label> <br />
                    <TextField
                      id={`2-8-1-${i}`}
                      label="Write here..."
                      variant="outlined"
                      value={value?.[`v2_8_1_${i + 1}`]}
                      onChange={(e) =>
                        setValue({
                          ...value,
                          [`v2_8_1_${i + 1}`]: e.target.value,
                        })
                      }
                      sx={{ width: "200px" }}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box>
              <label> Formulation </label>
              <br />
              <FormControl style={{ width: "200px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select here...
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.[`v2_7_${i + 1}`]}
                  label="Select a race"
                  onChange={(e) =>
                    setValue({ ...value, [`v2_7_${i + 1}`]: e.target.value })
                  }
                >
                  <MenuItem value={"solid(tablet/capsules/caplet)"}>
                    Solid(tablet/capsules/caplet)
                  </MenuItem>
                  <MenuItem value={"liquid, aerosol/mist/spray/gas"}>
                    Liquid, Aerosol/mist/spray/gas
                  </MenuItem>
                  <MenuItem value={"powder/granules, cream/lotion/gel"}>
                    Powder/granules, Cream/lotion/gel
                  </MenuItem>
                  <MenuItem value={"patch"}>Patch</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                  <MenuItem value={"unknown"}>Unknown</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Type of release </label>
              <br />
              <FormControl style={{ width: "200px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select here...
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.[`v2_6_${i + 1}`]}
                  label="Select a race"
                  onChange={(e) =>
                    setValue({ ...value, [`v2_6_${i + 1}`]: e.target.value })
                  }
                >
                  <MenuItem value={"extended-release"}>
                    Extended-Release (XL)
                  </MenuItem>
                  <MenuItem value={"sustained-release"}>
                    Sustained-Release (SR)
                  </MenuItem>
                  <MenuItem value={"immediate-release"}>
                    Immediate-Release (IR)
                  </MenuItem>
                  <MenuItem value={" "}>Not applicable</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {(value?.[`v2_8_unit_${i + 1}`] === "ml" ||
              value?.[`v2_8_unit_${i + 1}`] === "L" ||
              value?.[`v2_8_unit_${i + 1}`] === "tsp" ||
              value?.[`v2_8_unit_${i + 1}`] === "oz" ||
              value?.[`v2_8_unit_${i + 1}`] === "Sip(s)" ||
              value?.[`v2_8_unit_${i + 1}`] === "Mouthful(s)" ||
              value?.[`v2_8_unit_${i + 1}`] === "taste/lick/drop" ||
              value?.[`v2_8_unit_${i + 1}`] === "tab/pill/capsule") && (
              <Box>
                <label> Optional </label>
                <br />
                <FormControl style={{ width: "200px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Select here...
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={value?.[`v2_6_1_${i + 1}`]}
                    label="Select a race"
                    onChange={(e) =>
                      setValue({
                        ...value,
                        [`v2_6_1_${i + 1}`]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"salicylate"}>Salicylate type</MenuItem>
                    <MenuItem value={"fluoride"}>Fluoride type</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
            {(value?.[`v2_8_unit_${i + 1}`] === "ml" ||
              value?.[`v2_8_unit_${i + 1}`] === "L" ||
              value?.[`v2_8_unit_${i + 1}`] === "tsp" ||
              value?.[`v2_8_unit_${i + 1}`] === "oz" ||
              value?.[`v2_8_unit_${i + 1}`] === "Sip(s)" ||
              value?.[`v2_8_unit_${i + 1}`] === "Mouthful(s)" ||
              value?.[`v2_8_unit_${i + 1}`] === "taste/lick/drop" ||
              value?.[`v2_8_unit_${i + 1}`] === "tab/pill/capsule") &&
              (value?.[`v2_6_1_${i + 1}`] === "salicylate" ||
                value?.[`v2_6_1_${i + 1}`] === "fluoride") && (
                <Box>
                  <label> Type of {value?.[`v2_6_1_${i + 1}`]} </label> <br />
                  <TextField
                    id={`2-4-1-${i}`}
                    label="Write here..."
                    variant="outlined"
                    value={value?.[`v2_4_1_${i + 1}`]}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        [`v2_4_1_${i + 1}`]: e.target.value,
                      })
                    }
                    sx={{ width: "200px" }}
                  />
                </Box>
              )}
          </Box>
        </>
      );
    }
    return myArray;
  };

  const substances_dose = () => {
    let length = value?.agents;
    var myArray = [];
    var doseArray = [];
    var flag;
    for (let i = 0; i < length; i++) {
      doseArray[i] =
        (value[`v2_5_unit_${i + 1}`] === "mcg"
          ? value[`v2_5_${i + 1}`] * 0.001
          : value[`v2_5_unit_${i + 1}`] === "g"
          ? value[`v2_5_${i + 1}`] * 1000
          : value[`v2_5_unit_${i + 1}`] === "mg"
          ? value[`v2_5_${i + 1}`]
          : "") /
        (value?.weightunit === "kg" ? value?.weight : value?.weight * 0.45);
      doseArray[i] = Math.floor(doseArray[i] * 100) / 100.0;
      myArray[i] = (
        <span>
          {`${
            value[`v2_5_${i + 1}`]
              ? value[`v2_5_unit_${i + 1}`]
                ? " " +
                  value[`v2_5_${i + 1}`] +
                  " " +
                  value[`v2_5_unit_${i + 1}`]
                : ""
              : ""
          }${value[`v2_6_${i + 1}`] ? " " + value[`v2_6_${i + 1}`] : ""}${
            value[`v2_4_${i + 1}`] ? " " + value[`v2_4_${i + 1}`] : ""
          }${doseArray[i] ? ` (` + doseArray[i] + ` mg/kg)` : ""}${
            (value?.[`v2_8_unit_${i + 1}`] === "ml" ||
              value?.[`v2_8_unit_${i + 1}`] === "L" ||
              value?.[`v2_8_unit_${i + 1}`] === "tsp" ||
              value?.[`v2_8_unit_${i + 1}`] === "oz" ||
              value?.[`v2_8_unit_${i + 1}`] === "Sip(s)" ||
              value?.[`v2_8_unit_${i + 1}`] === "Mouthful(s)" ||
              value?.[`v2_8_unit_${i + 1}`] === "taste/lick/drop" ||
              value?.[`v2_8_unit_${i + 1}`] === "tab/pill/capsule") &&
            value?.[`v2_6_1_${i + 1}`]
              ? value?.[`v2_4_1_${i + 1}`]
                ? " containing " +
                  value?.[`v2_4_1_${i + 1}`] +
                  " " +
                  value?.[`v2_6_1_${i + 1}`] +
                  " as the active ingredient"
                : ""
              : ""
          }${
            value?.[`v2_7_${i + 1}`]
              ? " in the form of " + value?.[`v2_7_${i + 1}`]
              : ""
          }${
            (value?.chronicity === "chronic" ||
              value?.chronicity === "acute on chronic") &&
            value?.[`v2_50_${i + 1}`]
              ? value?.[`v2_50_unit_${i + 1}`]
                ? " (" +
                  value?.chronicity +
                  " daily dose of " +
                  value?.[`v2_50_${i + 1}`] +
                  " " +
                  value?.[`v2_50_unit_${i + 1}`] +
                  ")"
                : ""
              : ""
          }${i < length - 2 ? "," : i === length - 2 ? " and" : "."}`}
        </span>
      );
    }
    return myArray;
  };

  const amount = () => {
    let length = value?.agents;
    var myArray = [];
    for (let i = 0; i < length; i++) {
      myArray[i] = (
        <span>
          {`${
            value?.[`v2_8_${i + 1}`]
              ? " The total amount of " +
                value?.[`v2_4_${i + 1}`] +
                " was " +
                value?.[`v2_8_${i + 1}`] +
                " " +
                value?.[`v2_8_unit_${i + 1}`] +
                (value?.[`v2_8_unit_${i + 1}`] === "tab/pill/capsule"
                  ? " (" +
                    Math.floor(
                      (value?.[`v2_5_${i + 1}`] / value?.[`v2_8_${i + 1}`]) *
                        100
                    ) /
                      100.0 +
                    " " +
                    value?.[`v2_5_unit_${i + 1}`] +
                    " each)"
                  : "") +
                ((value?.[`v2_8_unit_${i + 1}`] === "ml" ||
                  value?.[`v2_8_unit_${i + 1}`] === "L" ||
                  value?.[`v2_8_unit_${i + 1}`] === "tsp" ||
                  value?.[`v2_8_unit_${i + 1}`] === "oz" ||
                  value?.[`v2_8_unit_${i + 1}`] === "Sip(s)" ||
                  value?.[`v2_8_unit_${i + 1}`] === "Mouthful(s)" ||
                  value?.[`v2_8_unit_${i + 1}`] === "taste/lick/drop") &&
                value?.[`v2_8_1_${i + 1}`]
                  ? " and it had a" +
                    (value?.[`v2_6_1_${i + 1}`]
                      ? " " + value?.[`v2_6_1_${i + 1}`]
                      : "") +
                    " concentration of " +
                    value?.[`v2_8_1_${i + 1}`] +
                    " %"
                  : "") +
                "."
              : ""
          }`}
        </span>
      );
    }
    return myArray;
  };

  const substances_available = () => {
    var myArray = [];

    if (!value?.serumetoh) myArray.push("ETOH");
    if (!value?.methanollevel) myArray.push("methanol");
    if (!value?.ethyleneglycol) myArray.push("ethylene glycol");
    if (!value?.vpa) myArray.push("valproic acid");
    if (!value?.lithium) myArray.push("lithium");
    if (!value?.iron) myArray.push("iron");
    if (!value?.cbz) myArray.push("carbamazepine");
    if (!value?.phenobarbital) myArray.push("phenobarbital");
    if (!value?.phenytoinT) myArray.push("phenytoin(T)");
    if (!value?.phenytoinF) myArray.push("phenytoin(F)");
    if (!value?.digoxin) myArray.push("digoxin");
    if (!value?.lead) myArray.push("lead");

    var length = myArray.length;

    var prefix = "";
    prefix +=
      length === 0
        ? ""
        : length === 1
        ? " Serum level for "
        : " Serum levels for ";

    for (let i = 0; i < length; i++) {
      prefix += myArray[i];
      prefix += i < length - 2 ? ", " : i === length - 2 ? " and " : "";
    }

    prefix +=
      length === 0
        ? ""
        : length === 1
        ? " is not available currently."
        : " are not available currently.";

    return prefix;
  };

  const elapsed_time = () => {
    if (value?.toi) {
      const differenceMs = Math.abs(value?.vital_sign_time - value?.toi);
      const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));
      const differenceMins =
        Math.ceil(differenceMs / (1000 * 60)) - differenceHours * 60;
      var elapsedtime =
        differenceHours.toString() +
        " hours " +
        differenceMins.toString() +
        " mins after exposure";
    } else {
      var elapsedtime = "";
    }

    return elapsedtime;
  };

  const substance_time = (drawing, exposure) => {
    var differMs = Math.abs(drawing - exposure);
    var differHours = Math.floor(differMs / (1000 * 60 * 60));
    var differMins = Math.ceil(differMs / (1000 * 60)) - differHours * 60;
    var postingestiontime =
      differHours.toString() +
      " hours " +
      differMins.toString() +
      " mins post-ingestion";

    var substancetime;

    substancetime = drawing
      ? " at " +
        (drawing.$H >= 10 ? drawing.$H : "0" + drawing.$H) +
        ":" +
        (drawing.$m >= 10 ? drawing.$m : "0" + drawing.$m) +
        (exposure
          ? " (" + postingestiontime + ")"
          : " (unknown time of exposure)")
      : "";

    return substancetime;
  };

  return (
    <Box>
      <label> Patient's First and Last name </label> <br />
      <TextField
        id="2-1"
        label="Write here..."
        variant="outlined"
        value={value?.ptname}
        onChange={(e) => setValue({ ...value, ptname: e.target.value })}
      />
      <br />
      <label> Patient's DOB </label> <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Birthday"
            value={value?.dob}
            onChange={(newValue) => setValue({ ...value, dob: newValue })}
          />
        </DemoContainer>
      </LocalizationProvider>
      <label> Patient's Gender </label> <br />
      <FormControl style={{ width: "322px" }}>
        <InputLabel id="demo-simple-select-label">Select here...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value?.gender}
          label="Select here..."
          onChange={(e) => setValue({ ...value, gender: e.target.value })}
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"pregnant"}>Pregnant</MenuItem>
          <MenuItem value={"unknown"}>Unknown</MenuItem>
        </Select>
      </FormControl>
      <br />
      <label> Patient's weight </label> <br />
      <TextField
        id="2-2"
        label="Write here..."
        variant="outlined"
        value={value?.weight}
        onChange={(e) => setValue({ ...value, weight: e.target.value })}
      />
      <FormControl style={{ width: "100px" }}>
        <InputLabel id="demo-simple-select-label">Select a unit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value?.weightunit}
          label="Select a unit"
          onChange={(e) => setValue({ ...value, weightunit: e.target.value })}
        >
          <MenuItem value={"kg"}>kg</MenuItem>
          <MenuItem value={"lb"}>lb</MenuItem>
        </Select>
      </FormControl>
      <br />
      <label> Intent of exposure </label> <br />
      <FormControl style={{ width: "322px" }}>
        <InputLabel id="demo-simple-select-label">Select here...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value?.intent_exposure}
          label="Select here..."
          onChange={(e) =>
            setValue({ ...value, intent_exposure: e.target.value })
          }
        >
          <MenuItem value={"unintentional"}>Unintentional</MenuItem>
          <MenuItem value={"unintentional general"} sx={{ pl: "60px" }}>
            General
          </MenuItem>
          <MenuItem value={"unintentional environmental"} sx={{ pl: "60px" }}>
            Environmental
          </MenuItem>
          <MenuItem value={"unintentional occupational"} sx={{ pl: "60px" }}>
            Occupational
          </MenuItem>
          <MenuItem
            value={"unintentional therapeutic error"}
            sx={{ pl: "60px" }}
          >
            Therapeutic error
          </MenuItem>
          <MenuItem value={"unintentional misuse"} sx={{ pl: "60px" }}>
            Misuse
          </MenuItem>
          <MenuItem value={"unintentional bite/sting"} sx={{ pl: "60px" }}>
            Bite/sting
          </MenuItem>
          <MenuItem value={"unintentional food poisoning"} sx={{ pl: "60px" }}>
            Food poisoning
          </MenuItem>
          <MenuItem value={"unintentional unknown"} sx={{ pl: "60px" }}>
            Unknown
          </MenuItem>
          <MenuItem value={"intentional"}>Intentional</MenuItem>
          <MenuItem value={"intentional suspected suicide"} sx={{ pl: "60px" }}>
            Suspected Suicide
          </MenuItem>
          <MenuItem value={"intentional misuse"} sx={{ pl: "60px" }}>
            Misuse
          </MenuItem>
          <MenuItem value={"intentional abuse"} sx={{ pl: "60px" }}>
            Abuse
          </MenuItem>
          <MenuItem value={"intentional unknown"} sx={{ pl: "60px" }}>
            Unknown
          </MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
          <MenuItem value={"other contaminant/tampering"} sx={{ pl: "60px" }}>
            Contaminant/Tampering
          </MenuItem>
          <MenuItem value={"other malicious"} sx={{ pl: "60px" }}>
            Malicious
          </MenuItem>
          <MenuItem value={"adverse reaction"}>Adverse reaction</MenuItem>
          <MenuItem value={"adverse reaction drug"} sx={{ pl: "60px" }}>
            Drug
          </MenuItem>
          <MenuItem value={"adverse reaction food"} sx={{ pl: "60px" }}>
            Food
          </MenuItem>
          <MenuItem value={"adverse reaction other"} sx={{ pl: "60px" }}>
            Other
          </MenuItem>
          <MenuItem value={"unknown reason"}>Unknown reason</MenuItem>
          <MenuItem value={"withdrawal"}>Withdrawal</MenuItem>
        </Select>
      </FormControl>
      <br />
      <label> Route of exposure </label> <br />
      <FormControl style={{ width: "322px" }}>
        <InputLabel id="demo-simple-select-label">Select here...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value?.route_exposure}
          label="Select here..."
          onChange={(e) =>
            setValue({ ...value, route_exposure: e.target.value })
          }
        >
          <MenuItem value={"ingestion"}>Ingestion</MenuItem>
          <MenuItem value={"inhalation/nasal"}>Inhalation/nasal</MenuItem>
          <MenuItem value={"aspiration (with ingestion)"}>
            Aspiration (with ingestion)
          </MenuItem>
          <MenuItem value={"ocular"}>Ocular</MenuItem>
          <MenuItem value={"dermal"}>Dermal</MenuItem>
          <MenuItem value={"bite/sting"}>Bite/sting</MenuItem>
          <MenuItem value={"parenteral"}>Parenteral</MenuItem>
          <MenuItem value={"the other route of exposure"}>Other</MenuItem>
          <MenuItem value={"the unknown route of exposure"}>Unknown</MenuItem>
          <MenuItem value={"otic"}>Otic</MenuItem>
          <MenuItem value={"rectal"}>Rectal</MenuItem>
          <MenuItem value={"vaginal"}>Vaginal</MenuItem>
        </Select>
      </FormControl>
      <br />
      <label> Substances involved </label>
      <br />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.substance}
          onChange={(e) => setValue({ ...value, substance: e.target.value })}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Known" />
          <FormControlLabel value="no" control={<Radio />} label="Unknown" />
        </RadioGroup>
      </FormControl>
      <br />
      {value?.substance === "yes" && (
        <>
          <label> How many agents has the patient consumed? </label> <br />
          <TextField
            id="2-4"
            label="Write here..."
            variant="outlined"
            value={value?.agents}
            onChange={(e) => setValue({ ...value, agents: e.target.value })}
          />
          {agents_num()}
          <br />
        </>
      )}
      <label> Acuity </label> <br />
      <FormControl style={{ width: "322px" }}>
        <InputLabel id="demo-simple-select-label">Select here...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value?.chronicity}
          label="Select here..."
          onChange={(e) => setValue({ ...value, chronicity: e.target.value })}
        >
          <MenuItem value={"acute"}>Acute</MenuItem>
          <MenuItem value={"acute on chronic"}>Acute on chronic</MenuItem>
          <MenuItem value={"chronic"}>Chronic</MenuItem>
          <MenuItem value={"Unknown"}>Unknown</MenuItem>
        </Select>
      </FormControl>
      {value?.substance === "yes" &&
        (value?.chronicity === "chronic" ||
          value?.chronicity === "acute on chronic") &&
        daily_dose()}
      <br />
      <label> Narrative of event/exposure </label> <br />
      <TextField
        id="2-7"
        label="Write here..."
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        value={value?.narrative}
        onChange={(e) => setValue({ ...value, narrative: e.target.value })}
      />
      <br />
      <label> Time of Ingestion/exposure (TOI) </label> <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label="Date time"
            value={value?.toi}
            onChange={(newValue) => setValue({ ...value, toi: newValue })}
            format="L HH:mm"
            sx={{ flexDirection: "initial" }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <label> Time of arrival to HCF </label> <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label="Date time"
            value={value?.hcf_time}
            onChange={(newValue) => setValue({ ...value, hcf_time: newValue })}
            format="L HH:mm"
            sx={{ flexDirection: "initial" }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <label> Patient's Vital signs </label> <br />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]} sx={{ mt: "-8px" }}>
              <DateTimePicker
                label="Date Time"
                value={value?.vital_sign_time}
                onChange={(newValue) =>
                  setValue({ ...value, vital_sign_time: newValue })
                }
                format="L HH:mm"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box>
          <TextField
            id="2-8-1"
            label="HR / minute"
            variant="outlined"
            value={value?.hr}
            onChange={(e) => setValue({ ...value, hr: e.target.value })}
          />
        </Box>
        <Box>
          <TextField
            id="2-8-2"
            label="BP / mmHg"
            variant="outlined"
            value={value?.bp}
            onChange={(e) => setValue({ ...value, bp: e.target.value })}
            sx={{ width: "250px" }}
          />
        </Box>
        <Box>
          <TextField
            id="2-8-3"
            label="RR / minute"
            variant="outlined"
            value={value?.rr}
            onChange={(e) => setValue({ ...value, rr: e.target.value })}
          />
        </Box>
        <Box>
          <TextField
            id="2-8-4"
            label="Temp / °C"
            variant="outlined"
            value={value?.temp}
            onChange={(e) => setValue({ ...value, temp: e.target.value })}
          />
        </Box>
        <Box>
          <TextField
            id="2-8-5"
            label="PulseOx / %"
            variant="outlined"
            value={value?.pulseox}
            onChange={(e) => setValue({ ...value, pulseox: e.target.value })}
          />
        </Box>
      </Box>
      <label> ECG </label> <br />
      <FormControl style={{ width: "322px" }}>
        <InputLabel id="demo-simple-select-label">Select here...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={value?.ecg}
          label="Select here..."
          onChange={(e) => setValue({ ...value, ecg: e.target.value })}
        >
          <MenuItem value={"performed"}>Done</MenuItem>
          <MenuItem value={"not performed"}>Not done</MenuItem>
          <MenuItem value={"pending"}>Pending</MenuItem>
        </Select>
      </FormControl>
      <br />
      {value?.ecg === "performed" && (
        <>
          <Box sx={{ display: "flex", pt: "10px", gap: "20px" }}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.ecg_time}
                    onChange={(newValue) =>
                      setValue({ ...value, ecg_time: newValue })
                    }
                    format="L HH:mm"
                    sx={{ width: "222px" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <TextField
                id="2-9-0"
                label="HR / minute"
                variant="outlined"
                sx={{ mt: "8px" }}
                value={value?.ecg_hr}
                onChange={(e) => setValue({ ...value, ecg_hr: e.target.value })}
              />
            </Box>
            <Box>
              <TextField
                id="2-9-1"
                label="QRS / ms"
                variant="outlined"
                sx={{ mt: "8px" }}
                value={value?.ecg_qrs}
                onChange={(e) =>
                  setValue({ ...value, ecg_qrs: e.target.value })
                }
              />
            </Box>
            <Box>
              <TextField
                id="2-9-2"
                label="QTc / ms"
                variant="outlined"
                sx={{ mt: "8px" }}
                value={value?.ecg_qtc}
                onChange={(e) =>
                  setValue({ ...value, ecg_qtc: e.target.value })
                }
              />
            </Box>
            <Box>
              <TextField
                id="2-9-3"
                label="Rhythm"
                variant="outlined"
                sx={{ mt: "8px" }}
                value={value?.ecg_rhythm}
                onChange={(e) =>
                  setValue({ ...value, ecg_rhythm: e.target.value })
                }
              />
            </Box>
            <Box>
              <TextField
                id="2-9-4"
                label="Other"
                variant="outlined"
                sx={{ mt: "8px" }}
                value={value?.ecg_other}
                onChange={(e) =>
                  setValue({ ...value, ecg_other: e.target.value })
                }
              />
            </Box>
          </Box>
        </>
      )}
      <label> PE:Sx/S </label> <br />
      <TextField
        id="2-10"
        label="Write here..."
        variant="outlined"
        value={value?.pe_sx_s}
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        onChange={(e) => setValue({ ...value, pe_sx_s: e.target.value })}
      />
      <br />
      <label> Has neurological exam been done? </label>
      <br />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.neurological_exam}
          onChange={(e) =>
            setValue({ ...value, neurological_exam: e.target.value })
          }
        >
          <FormControlLabel value="yes" control={<Radio />} label="Done" />
          <FormControlLabel value="no" control={<Radio />} label="Not done" />
        </RadioGroup>
      </FormControl>
      <br />
      {value?.neurological_exam === "yes" && (
        <>
          <label> Details </label> <br />
          <TextField
            id="2-11"
            label="Write here..."
            variant="outlined"
            multiline
            maxRows={4}
            sx={{ width: "644px" }}
            value={value?.neurological_exam_text}
            onChange={(e) =>
              setValue({ ...value, neurological_exam_text: e.target.value })
            }
          />
          <br />
        </>
      )}
      <label> Patient's past medical history </label>
      <br />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.medical_history}
          onChange={(e) =>
            setValue({ ...value, medical_history: e.target.value })
          }
        >
          <FormControlLabel value="known" control={<Radio />} label="Known" />
          <FormControlLabel
            value="unknown"
            control={<Radio />}
            label="Unknown"
          />
        </RadioGroup>
      </FormControl>
      <br />
      {value?.medical_history === "known" && (
        <>
          <label> Details </label> <br />
          <TextField
            id="2-13"
            label="Write here..."
            variant="outlined"
            multiline
            maxRows={4}
            sx={{ width: "644px" }}
            value={value?.medical_history_text}
            onChange={(e) =>
              setValue({ ...value, medical_history_text: e.target.value })
            }
          />
          <br />
        </>
      )}
      <label> Patient's home medications </label> <br />
      <TextField
        id="2-14"
        label="Write here..."
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        value={value?.home_medications}
        onChange={(e) =>
          setValue({ ...value, home_medications: e.target.value })
        }
      />
      <br />
      <label> Are substance levels available? </label> <br />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.substance_level}
          onChange={(e) =>
            setValue({ ...value, substance_level: e.target.value })
          }
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <br />
      {value?.substance_level === "yes" && (
        <>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> ASA(Aspirin) </label> <br />
              <TextField
                id="2-15"
                label="Write here..."
                variant="outlined"
                value={value?.asa}
                onChange={(e) => setValue({ ...value, asa: e.target.value })}
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.asaunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, asaunit: e.target.value })
                  }
                >
                  <MenuItem value={"mg/dL"}>mg/dL</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.asa_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, asa_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.asa_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, asa_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Acetaminophen(APAP) </label> <br />
              <TextField
                id="2-17"
                label="Write here..."
                variant="outlined"
                value={value?.apap}
                onChange={(e) => setValue({ ...value, apap: e.target.value })}
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.apapunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, apapunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.apap_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, apap_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.apap_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, apap_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Serum ETOH </label> <br />
              <TextField
                id="2-19"
                label="Write here..."
                variant="outlined"
                value={value?.serumetoh}
                onChange={(e) =>
                  setValue({ ...value, serumetoh: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.serumetohunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, serumetohunit: e.target.value })
                  }
                >
                  <MenuItem value={"mg/dL"}>mg/dL</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.serumetoh_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, serumetoh_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.serumetoh_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, serumetoh_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Methanol level </label> <br />
              <TextField
                id="2-21"
                label="Write here..."
                variant="outlined"
                value={value?.methanollevel}
                onChange={(e) =>
                  setValue({ ...value, methanollevel: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.methanolunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, methanolunit: e.target.value })
                  }
                >
                  <MenuItem value={"mg/dL"}>mg/dL</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.methanollevel_exposuretime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        methanollevel_exposuretime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.methanollevel_drawingtime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        methanollevel_drawingtime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Ethylene glycol (EG) </label> <br />
              <TextField
                id="2-23"
                label="Write here..."
                variant="outlined"
                value={value?.ethyleneglycol}
                onChange={(e) =>
                  setValue({ ...value, ethyleneglycol: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.egunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, egunit: e.target.value })
                  }
                >
                  <MenuItem value={"mg/dL"}>mg/dL</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.ethyleneglycol_exposuretime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        ethyleneglycol_exposuretime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.ethyleneglycol_drawingtime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        ethyleneglycol_drawingtime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Valproic acid (VPA) </label> <br />
              <TextField
                id="2-25"
                label="Write here..."
                variant="outlined"
                value={value?.vpa}
                onChange={(e) => setValue({ ...value, vpa: e.target.value })}
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.vapunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, vpaunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.vpa_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, vpa_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.vpa_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, vpa_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Lithium </label> <br />
              <TextField
                id="2-27"
                label="Write here..."
                variant="outlined"
                value={value?.lithium}
                onChange={(e) =>
                  setValue({ ...value, lithium: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.lithiumunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, lithiumunit: e.target.value })
                  }
                >
                  <MenuItem value={"mEq/L"}>mEq/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.lithium_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, lithium_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.lithium_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, lithium_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Iron </label> <br />
              <TextField
                id="2-29"
                label="Write here..."
                variant="outlined"
                value={value?.iron}
                onChange={(e) => setValue({ ...value, iron: e.target.value })}
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.ironunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, ironunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/dL"}>mcg/dL</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.iron_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, iron_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.iron_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, iron_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Carbamazepine (CBZ) </label> <br />
              <TextField
                id="2-31"
                label="Write here..."
                variant="outlined"
                value={value?.cbz}
                onChange={(e) => setValue({ ...value, cbz: e.target.value })}
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.cbzunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, cbzunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.cbz_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, cbz_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.cbz_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, cbz_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Phenobarbital </label> <br />
              <TextField
                id="2-33"
                label="Write here..."
                variant="outlined"
                value={value?.phenobarbital}
                onChange={(e) =>
                  setValue({ ...value, phenobarbital: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.phenobarbitalunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, phenobarbitalunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.phenobarbital_exposuretime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        phenobarbital_exposuretime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.phenobarbital_drawingtime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        phenobarbital_drawingtime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Phenytoin(T) </label> <br />
              <TextField
                id="2-35"
                label="Write here..."
                variant="outlined"
                value={value?.phenytoinT}
                onChange={(e) =>
                  setValue({ ...value, phenytoinT: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.phenytoinTunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, phenytoinTunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.phenytoinT_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, phenytoinT_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.phenytoinT_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, phenytoinT_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Phenytoin(F) </label> <br />
              <TextField
                id="2-37"
                label="Write here..."
                variant="outlined"
                value={value?.phenytoinF}
                onChange={(e) =>
                  setValue({ ...value, phenytoinF: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.phenytoinFunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, phenytoinFunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.phenytoinF_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, phenytoinF_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.phenytoinF_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, phenytoinF_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Digoxin </label> <br />
              <TextField
                id="2-39"
                label="Write here..."
                variant="outlined"
                value={value?.digoxin}
                onChange={(e) =>
                  setValue({ ...value, digoxin: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.digoxinunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, digoxinunit: e.target.value })
                  }
                >
                  <MenuItem value={"ng/mL"}>ng/mL</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.digoxin_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, digoxin_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.digoxin_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, digoxin_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Lead </label> <br />
              <TextField
                id="2-41"
                label="Write here..."
                variant="outlined"
                value={value?.lead}
                onChange={(e) => setValue({ ...value, lead: e.target.value })}
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.leadunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, leadunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/dL"}>mcg/dL</MenuItem>
                  <MenuItem value={"mmol/L"}>mmol/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.lead_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, lead_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.lead_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, lead_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Theophylline level </label> <br />
              <TextField
                id="2-17-1"
                label="Write here..."
                variant="outlined"
                value={value?.theophylline}
                onChange={(e) =>
                  setValue({ ...value, theophylline: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.theophyllineunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, theophyllineunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/ml"}>mcg/ml</MenuItem>
                  <MenuItem value={"mg/L"}>mg/L</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.theophylline_exposuretime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        theophylline_exposuretime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.theophylline_drawingtime}
                    onChange={(newValue) =>
                      setValue({
                        ...value,
                        theophylline_drawingtime: newValue,
                      })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box>
              <label> Urine arsenic level </label> <br />
              <TextField
                id="2-17-3"
                label="Write here..."
                variant="outlined"
                value={value?.arsenic}
                onChange={(e) =>
                  setValue({ ...value, arsenic: e.target.value })
                }
                sx={{ mt: "8px" }}
              />
              <FormControl sx={{ width: "100px", mt: "8px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select a unit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={value?.arsenicunit}
                  label="Select a unit"
                  onChange={(e) =>
                    setValue({ ...value, arsenicunit: e.target.value })
                  }
                >
                  <MenuItem value={"mcg/L"}>mcg/L</MenuItem>
                  <MenuItem value={"mcg/24 hour collection"}>
                    mcg/24 hour collection
                  </MenuItem>
                  <MenuItem value={"mmol/L"}>mmol/L</MenuItem>
                  <MenuItem value={"mcg/g creatinine"}>
                    mcg/g creatinine
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <label> Time of exposure </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.arsenic_exposuretime}
                    onChange={(newValue) =>
                      setValue({ ...value, arsenic_exposuretime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <label> Time of measurement </label> <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Date time"
                    value={value?.arsenic_drawingtime}
                    onChange={(newValue) =>
                      setValue({ ...value, arsenic_drawingtime: newValue })
                    }
                    format="L HH:mm"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
        </>
      )}
      <br />
      <br />
      <div
        style={{
          backgroundColor: "lightgray",
          width: "805px",
          borderRadius: "5px",
          padding: "10px 20px",
        }}
      >
        <label>
          {value?.ptname ? "Pt’s name is " + value?.ptname : ""}
          {value?.dob
            ? ", a " +
              (curyear - value?.dob.$y) +
              "-year-" +
              (curmonth - value?.dob.$M) +
              "-month-old"
            : ""}
          {value?.gender
            ? " " +
              value?.gender +
              (value?.weight
                ? value?.weightunit === "kg"
                  ? " weighing " + value?.weight + " kg"
                  : value?.weightunit === "lb"
                  ? " weighing " +
                    Math.floor(value?.weight * 0.45 * 100) / 100.0 +
                    " kg"
                  : ""
                : "") +
              ", arrived at the healthcare facility "
            : ""}
          {value?.hcf_time
            ? "at " +
              (value?.hcf_time.$H >= 10
                ? value?.hcf_time.$H
                : "0" + value?.hcf_time.$H) +
              ":" +
              (value?.hcf_time.$m >= 10
                ? value?.hcf_time.$m
                : "0" + value?.hcf_time.$m) +
              " on " +
              getMonthName(value?.hcf_time.$M + 1) +
              " " +
              (value?.hcf_time.$D >= 10
                ? value?.hcf_time.$D
                : "0" + value?.hcf_time.$D) +
              ", " +
              value?.hcf_time.$y +
              ","
            : ""}
          {value?.intent_exposure
            ? " following an " +
              value?.intent_exposure +
              (value?.route_exposure ? " via " + value?.route_exposure : "") +
              " of"
            : ""}
          {value?.substance === "yes" && value?.intent_exposure
            ? substances_dose()
            : value?.substance === "no" && value?.intent_exposure
            ? " an unknown substance(s)."
            : ""}
          {amount()}
          {value?.chronicity
            ? " The acuity of exposure: " + value?.chronicity + ". "
            : ""}
          {value?.narrative
            ? " Narrative of event/exposure: " + value?.narrative + "."
            : " Narrative of event/exposure: Unknown story"}
          <br />
          <br />
          {!value?.toi ? "Time of Ingestion/exposure (TOI) is unknown. " : ""}
          {value?.vital_sign_time
            ? "Upon arrival, Pt's vital signs were recorded at " +
              (value?.vital_sign_time.$H >= 10
                ? value?.vital_sign_time.$H
                : "0" + value?.vital_sign_time.$H) +
              ":" +
              (value?.vital_sign_time.$m >= 10
                ? value?.vital_sign_time.$m
                : "0" + value?.vital_sign_time.$m) +
              (value?.toi ? " (" + elapsed_time() + ")" : "")
            : ""}
          {value?.hr
            ? " and indicated a HR of " + value?.hr + " beats per minute"
            : ""}
          {value?.bp ? ", blood pressure of " + value?.bp + " mmHg" : ""}
          {value?.rr ? ", RR of " + value?.rr + " breaths per minute" : ""}
          {value?.temp ? ", temperature of " + value?.temp + "°C" : ""}
          {value?.pulseox
            ? " and pulse oximetry of " + value?.pulseox + "%."
            : ""}
          {value?.ecg
            ? value?.ecg === "performed"
              ? " ECG: HR: " +
                value?.ecg_hr +
                ", Rhythm: " +
                value?.ecg_rhythm +
                ", QRS = " +
                value?.ecg_qrs +
                " msec" +
                ", QTc = " +
                value?.ecg_qtc +
                " msec" +
                (value?.ecg_other ? ", " + value?.ecg_other : "") +
                (value?.ecg_time
                  ? " at " +
                    (value?.ecg_time.$H >= 10
                      ? value?.ecg_time.$H
                      : "0" + value?.ecg_time.$H) +
                    ":" +
                    (value?.ecg_time.$m >= 10
                      ? value?.ecg_time.$m
                      : "0" + value?.ecg_time.$m) +
                    " on " +
                    getMonthName(value?.ecg_time.$M + 1) +
                    " " +
                    (value?.ecg_time.$D >= 10
                      ? value?.ecg_time.$D
                      : "0" + value?.ecg_time.$D) +
                    ", " +
                    value?.ecg_time.$y +
                    "."
                  : "")
              : " An ECG was " + value?.ecg + "."
            : ""}
          <br />
          <br />
          {value?.pe_sx_s
            ? "Pt's physical examination: signs and symptoms included " +
              value?.pe_sx_s +
              "."
            : value?.neurological_exam
            ? "Pt's physical examination was intact."
            : ""}
          {value?.neurological_exam === "yes"
            ? value?.neurological_exam_text
              ? " The neurological examination revealed " +
                value?.neurological_exam_text +
                "."
              : " Pt's neurological examination was intact."
            : ""}
          <br />
          <br />
          {value?.medical_history === "known"
            ? value?.medical_history_text
              ? "Pt’s past medical history: " +
                value?.medical_history_text +
                "."
              : ""
            : value?.medical_history === "unknown"
            ? "Pt’s past medical history is unknown."
            : ""}
          {value?.home_medications
            ? (value?.gender === "male"
                ? " His"
                : value?.gender === "female" || value?.gender === "pregnant"
                ? " Her"
                : " Pt's") +
              " home medications: " +
              value?.home_medications +
              "."
            : ""}
          <br />
          <br />
          {"Labs:"}
          <br />
          {value?.substance_level === "yes"
            ? value?.asa
              ? value?.apap
                ? "ASA level measuring " +
                  value?.asa +
                  (value?.asaunit ? " " + value?.asaunit : "") +
                  substance_time(
                    value?.asa_drawingtime,
                    value?.asa_exposuretime
                  ) +
                  " and acetaminophen level measuring " +
                  value?.apap +
                  (value?.apapunit ? " " + value?.apapunit : "") +
                  substance_time(
                    value?.apap_drawingtime,
                    value?.apap_exposuretime
                  ) +
                  "."
                : "ASA level measuring " +
                  value?.asa +
                  (value?.asaunit ? " " + value?.asaunit : "") +
                  substance_time(
                    value?.asa_drawingtime,
                    value?.asa_exposuretime
                  ) +
                  " and acetaminophen level is not available currently."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? !value?.asa
              ? value?.apap
                ? "ASA level is not available currently and acetaminophen level measuring " +
                  value?.apap +
                  (value?.apapunit ? " " + value?.apapunit : "") +
                  substance_time(
                    value?.apap_drawingtime,
                    value?.apap_exposuretime
                  ) +
                  "."
                : "ASA level and acetaminophen level are not available currently."
              : ""
            : ""}
          <br />
          <br />
          {value?.substance_level === "yes"
            ? value?.serumetoh
              ? "Serum ETOH level measuring " +
                value?.serumetoh +
                (value?.serumetohunit ? " " + value?.serumetohunit : "") +
                substance_time(
                  value?.serumetoh_drawingtime,
                  value?.serumetoh_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.methanollevel
              ? " Methanol level measuring " +
                value?.methanollevel +
                (value?.methanolunit ? " " + value?.methanolunit : "") +
                substance_time(
                  value?.methanollevel_drawingtime,
                  value?.methanollevel_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.ethyleneglycol
              ? " Ethylene glycol level measuring " +
                value?.ethyleneglycol +
                (value?.egunit ? " " + value?.egunit : "") +
                substance_time(
                  value?.ethyleneglycol_drawingtime,
                  value?.ethyleneglycol_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.vpa
              ? " Valproic acid level measuring " +
                value?.vpa +
                (value?.vpaunit ? " " + value?.vpaunit : "") +
                substance_time(
                  value?.vpa_drawingtime,
                  value?.vpa_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.lithium
              ? " Lithium level measuring " +
                value?.lithium +
                (value?.lithiumunit ? " " + value?.lithiumunit : "") +
                substance_time(
                  value?.lithium_drawingtime,
                  value?.lithium_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.iron
              ? " Iron level measuring " +
                value?.iron +
                (value?.ironunit ? " " + value?.ironunit : "") +
                substance_time(
                  value?.iron_drawingtime,
                  value?.iron_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.cbz
              ? " Carbamazepine level measuring " +
                value?.cbz +
                (value?.cbzunit ? " " + value?.cbzunit : "") +
                substance_time(
                  value?.cbz_drawingtime,
                  value?.cbz_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.phenobarbital
              ? " Phenobarbital level measuring " +
                value?.phenobarbital +
                (value?.phenobarbitalunit
                  ? " " + value?.phenobarbitalunit
                  : "") +
                substance_time(
                  value?.phenobarbital_drawingtime,
                  value?.phenobarbital_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.phenytoinT
              ? " Phenytoin(T) level measuring " +
                value?.phenytoinT +
                (value?.phenytoinTunit ? " " + value?.phenytoinTunit : "") +
                substance_time(
                  value?.phenytoinT_drawingtime,
                  value?.phenytoinT_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.phenytoinF
              ? " Phenytoin(F) level measuring " +
                value?.phenytoinF +
                (value?.phenytoinFunit ? " " + value?.phenytoinFunit : "") +
                substance_time(
                  value?.phenytoinF_drawingtime,
                  value?.phenytoinF_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.digoxin
              ? " Digoxin level measuring " +
                value?.digoxin +
                (value?.digoxinunit ? " " + value?.digoxinunit : "") +
                substance_time(
                  value?.digoxin_drawingtime,
                  value?.digoxin_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.lead
              ? " Lead level measuring " +
                value?.lead +
                (value?.leadunit ? " " + value?.leadunit : "") +
                substance_time(
                  value?.lead_drawingtime,
                  value?.lead_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.theophylline
              ? " Theophylline level measuring " +
                value?.theophylline +
                (value?.theophyllineunit ? " " + value?.theophyllineunit : "") +
                substance_time(
                  value?.theophylline_drawingtime,
                  value?.theophylline_exposuretime
                ) +
                "."
              : ""
            : ""}
          {value?.substance_level === "yes"
            ? value?.arsenic
              ? " Urine arsenic level measuring " +
                value?.arsenic +
                (value?.arsenicunit ? " " + value?.arsenicunit : "") +
                substance_time(
                  value?.arsenic_drawingtime,
                  value?.arsenic_exposuretime
                ) +
                "."
              : ""
            : ""}
          {/* {value?.substance_level === "yes" ? substances_available() : ""} */}
        </label>
        <br />
      </div>
    </Box>
  );
}
