import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const RecommGender = [
  "APAP",
  "ASA",
  "ETOH",
  "CMP",
  "UDS",
  "ECG",
  "Pregnancy test",
  "Telemetry monitoring",
];

const RecommGeneral = [
  "Imaging",
  "Neurological exams",
  "Urine assay",
  "ABG",
  "CMP",
  "UDS",
  "Telemetry monitoring",
  "ECG",
];

export default function Page4(props) {
  const {
    value,
    setValue,
    recommendgender,
    setRecommendGender,
    recommendgeneral,
    setRecommendGeneral,
  } = props;

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setRecommendGender(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(".") : value
    );
  };

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setRecommendGeneral(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(".") : value
    );
  };

  return (
    <Box>
      {value?.intent_exposure &&
        !(
          value?.intent_exposure.includes("unintentional") ||
          value?.intent_exposure.includes("other") ||
          value?.intent_exposure.includes("adverse reaction") ||
          value?.intent_exposure.includes("unknown reason") ||
          value?.intent_exposure.includes("withdrawal")
        ) && (
          <>
            <label> Recommendation on Gender </label> <br />
            <FormControl sx={{ m: 1, width: 644, marginLeft: 0 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select here...
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={recommendgender}
                onChange={handleChange1}
                input={<OutlinedInput label="symptoms" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {RecommGender.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={recommendgender.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      {value?.intent_exposure &&
        (value?.intent_exposure.includes("unintentional") ||
          value?.intent_exposure.includes("other") ||
          value?.intent_exposure.includes("adverse reaction") ||
          value?.intent_exposure.includes("unknown reason") ||
          value?.intent_exposure.includes("withdrawal")) && (
          <>
            <label> General Recommendation </label> <br />
            <FormControl sx={{ m: 1, width: 644, marginLeft: 0 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select here...
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={recommendgeneral}
                onChange={handleChange2}
                input={<OutlinedInput label="symptoms" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {RecommGeneral.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={recommendgeneral.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      <br />
      <label> Specific Recomendation </label> <br />
      <TextField
        id="4-0"
        label="Write here..."
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        value={value?.specific_recommend}
        onChange={(e) =>
          setValue({ ...value, specific_recommend: e.target.value })
        }
      />
      <br />
      <label> Recommendations for Frequency of labs </label> <br />
      <TextField
        id="4-1"
        label="Write here..."
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        value={value?.frequency_labs_recommend}
        onChange={(e) =>
          setValue({ ...value, frequency_labs_recommend: e.target.value })
        }
      />
      <br />
      <label> Recommended treatment </label> <br />
      <TextField
        id="4-2"
        label="Write here..."
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        value={value?.treatment_recommend}
        onChange={(e) =>
          setValue({ ...value, treatment_recommend: e.target.value })
        }
      />
      <br />
      <label> Recommended observation time </label> <br />
      <TextField
        id="4-3"
        label="Write here... / hours"
        variant="outlined"
        multiline
        maxRows={4}
        sx={{ width: "644px" }}
        value={value?.observation_time_recommend}
        onChange={(e) =>
          setValue({ ...value, observation_time_recommend: e.target.value })
        }
      />
      <br />
      <label> Recommended consultations with other specialties </label>
      <br />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.speciality_consultation}
          onChange={(e) =>
            setValue({ ...value, speciality_consultation: e.target.value })
          }
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <br />
      {value?.speciality_consultation === "yes" && (
        <>
          <label> Details </label> <br />
          <TextField
            id="4-4"
            label="Write here..."
            variant="outlined"
            multiline
            maxRows={4}
            sx={{ width: "644px" }}
            value={value?.speciality_consultation_detail}
            onChange={(e) =>
              setValue({
                ...value,
                speciality_consultation_detail: e.target.value,
              })
            }
          />
          <br />
        </>
      )}
      <label> Offer a tox consultation </label>
      <br />
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value?.tox_consultation}
          onChange={(e) =>
            setValue({ ...value, tox_consultation: e.target.value })
          }
        >
          <FormControlLabel
            value="accepted"
            control={<Radio />}
            label="Accepted"
          />
          <FormControlLabel
            value="refused"
            control={<Radio />}
            label="Refused"
          />
        </RadioGroup>
      </FormControl>
      <br />
      {value?.tox_consultation === "accepted" && (
        <>
          <label> Ask for the reason/question for toxicologist </label> <br />
          <TextField
            id="4-5"
            label="Write here..."
            variant="outlined"
            multiline
            maxRows={4}
            sx={{ width: "644px" }}
            value={value?.tox_consultation_question}
            onChange={(e) =>
              setValue({
                ...value,
                tox_consultation_question: e.target.value,
              })
            }
          />
        </>
      )}
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
          {recommendgeneral.length > 0 &&
          (value?.intent_exposure.includes("unintentional") ||
            value?.intent_exposure.includes("other") ||
            value?.intent_exposure.includes("adverse reaction") ||
            value?.intent_exposure.includes("unknown reason") ||
            value?.intent_exposure.includes("withdrawal"))
            ? "The following lab works and assessments have been recommended: " +
              recommendgeneral.join(", ") +
              (value?.specific_recommend
                ? ", " + value?.specific_recommend
                : "") +
              "."
            : ""}
          {recommendgender.length > 0 &&
          !(
            value?.intent_exposure.includes("unintentional") ||
            value?.intent_exposure.includes("other") ||
            value?.intent_exposure.includes("adverse reaction") ||
            value?.intent_exposure.includes("unknown reason") ||
            value?.intent_exposure.includes("withdrawal")
          )
            ? "The following lab works and assessments have been recommended: " +
              recommendgender.join(", ") +
              (value?.specific_recommend
                ? ", " + value?.specific_recommend
                : "") +
              "."
            : ""}
          <br />
          <br />
          {value?.frequency_labs_recommend
            ? "Recommended to " + value?.frequency_labs_recommend + ". "
            : ""}
          {value?.treatment_recommend
            ? "Recomended treatment(s) is " + value?.treatment_recommend + "."
            : ""}
          <br />
          <br />
          {value?.observation_time_recommend
            ? "Recommended observation time: At least " +
              value?.observation_time_recommend +
              "-hour observation period has been suggested to closely monitor the patient's condition. "
            : ""}
          {value?.speciality_consultation === "yes"
            ? value?.speciality_consultation_detail
              ? "Recommended consultations with other specialties: " +
                value?.speciality_consultation_detail +
                "."
              : "No specific consultations with other specialties have been mentioned."
            : ""}
          {value?.speciality_consultation === "no"
            ? "No specific consultations with other specialties have been mentioned."
            : ""}
          <br />
          <br />
          {value?.tox_consultation === "accepted"
            ? "A toxicology consultation has been accepted" +
              (value?.tox_consultation_question
                ? ", The reason for this consultation is " +
                  value?.tox_consultation_question
                : "") +
              "."
            : ""}
          {value?.tox_consultation === "refused"
            ? "A toxicology consultation has been refused."
            : ""}
        </label>
        <br />
      </div>
    </Box>
  );
}
