import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import { MyContext } from "../context/MyContext";
import "./final.css";

import { createReport } from "../helpers";

const FinalReportPage = (props) => {
  const { value, recommendgender, recommendgeneral } = props;
  const { data, updateData } = useContext(MyContext);

  const [loading, setLoading] = useState(false);

  const curyear = new Date().getFullYear();
  const curmonth = new Date().getMonth();
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

  const substances_dose = () => {
    let length = value?.agents;
    var myArray = [];
    var doseArray = [];
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
    let myArray_string = "";
    for (let i = 0; i < myArray.length; i++) {
      myArray_string += myArray[i].props.children;
    }
    return myArray_string;
    // return myArray;
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
    let myArray_string = "";
    for (let i = 0; i < myArray.length; i++) {
      myArray_string += myArray[i].props.children;
    }
    return myArray_string;

    // return myArray;
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
        ? "Serum level for "
        : "Serum levels for ";

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

  const elapsed_time = () => {
    const differenceMs = Math.abs(value?.vital_sign_time - value?.toi);
    const differenceHours = Math.floor(differenceMs / (1000 * 60 * 60));
    const differenceMins =
      Math.ceil(differenceMs / (1000 * 60)) - differenceHours * 60;
    var elapsedtime =
      differenceHours.toString() +
      " hours " +
      differenceMins.toString() +
      " mins after exposure";
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

  const assessment = () => {
    let length = value?.agents;
    var myArray = [];
    var myArray1 = [];
    var doseArray = [];
    let myArray_string = "";

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
        </span>
      );
      myArray1[i] = substance_list.includes(value?.[`v2_4_${i + 1}`]) && (
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
                  (value[`v3_${i + 1}_8`] ? " " + value[`v3_${i + 1}_8`] : "") +
                  "."
                : "However, the toxic serum level of the " +
                  getOrdinal(1 + i) +
                  " substance(" +
                  value?.[`v2_4_${i + 1}`] +
                  ") is yet to be determined. The serum level will provide valuable information to assess the severity of exposure accurately. It is essential to monitor the patient's clinical condition closely until the serum level is obtained."
              : ""
          }           
        `}
        </>
      );
    }

    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]) {
        myArray_string += myArray[i].props.children + "\n" + "\n";
      }
      if (myArray1[i]) {
        myArray_string += myArray1[i].props.children + "\n";
      }
    }
    return myArray_string;

    // return myArray;
  };

  const assessment_ = () => {
    let length = value?.agents;
    var myArray = [];
    let myArray_string = "";

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
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i]) {
        myArray_string += myArray[i].props.children;
      }
    }

    return myArray_string;
  };

  const assessment__ = () => {
    let length = value?.agents;
    let a = 0;
    for (let i = 0; i < length; i++) {
      a = value?.[`v3_${i + 1}_1`] ? (value?.[`v3_${i + 1}_7`] ? i + 1 : a) : a;
    }
    return a > 0 ? "Based on the severity of exposure, " : "";
  };

  const text = `
${"S: Subjective - Information about the caller and healthcare facility:"}
${value?.name ? value?.name : ""}${value?.title ? ", " + value?.title : ""}${
    value?.facility ? " from " + value?.facility : ""
  }${
    value?.callbacknumber
      ? " (contact number: " +
        value?.callbacknumber +
        ") dialed the poison center"
      : ""
  }${
    value?.unit
      ? ", seeking assistance for a patient located in the " + value?.unit + "."
      : ""
  }

${"O: Objective - Patient's information, substance details, vital signs and examinations:"}
${value?.ptname ? "Pt’s name is " + value?.ptname : ""}${
    value?.dob
      ? ", a " +
        (curyear - value?.dob.$y) +
        "-year-" +
        (curmonth - value?.dob.$M) +
        "-month-old"
      : ""
  }${
    value?.gender
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
      : ""
  }${
    value?.hcf_time
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
      : ""
  }${
    value?.intent_exposure
      ? "following an " +
        value?.intent_exposure +
        (value?.route_exposure ? " via " + value?.route_exposure : "") +
        " of"
      : ""
  }${
    value?.substance === "yes" && value?.intent_exposure
      ? substances_dose()
      : value?.substance === "no" && value?.intent_exposure
      ? " an unknown substance(s)."
      : ""
  }${amount()}${
    value?.chronicity
      ? " The acuity of exposure: " + value?.chronicity + "."
      : ""
  }${
    value?.narrative
      ? " Narrative of event/exposure: " + value?.narrative + "."
      : " Narrative of event/exposure: Unknown story."
  }

${!value?.toi ? "Time of Ingestion/exposure (TOI) is unknown. " : ""}${
    value?.vital_sign_time
      ? "Upon arrival, Pt's vital signs were recorded at " +
        (value?.vital_sign_time.$H >= 10
          ? value?.vital_sign_time.$H
          : "0" + value?.vital_sign_time.$H) +
        ":" +
        (value?.vital_sign_time.$m >= 10
          ? value?.vital_sign_time.$m
          : "0" + value?.vital_sign_time.$m) +
        (value?.toi ? " (" + elapsed_time() + ")" : "")
      : ""
  }${
    value?.hr ? " and indicated a HR of " + value?.hr + " beats per minute" : ""
  }${value?.bp ? ", blood pressure of " + value?.bp + " mmHg" : ""}${
    value?.rr ? ", RR of " + value?.rr + " breaths per minute" : ""
  }${value?.temp ? ", temperature of " + value?.temp + "°C" : ""}${
    value?.pulseox ? " and pulse oximetry of " + value?.pulseox + "%." : ""
  }${
    value?.ecg
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
      : ""
  }

${
  value?.pe_sx_s
    ? "Pt's physical examination: signs and symptoms included " +
      value?.pe_sx_s +
      "."
    : value?.neurological_exam
    ? "Pt's physical examination was intact."
    : ""
}${
    value?.neurological_exam === "yes"
      ? value?.neurological_exam_text
        ? " The neurological examination revealed " +
          value?.neurological_exam_text +
          "."
        : " Pt's neurological examination was intact."
      : ""
  }

${
  value?.medical_history === "known"
    ? value?.medical_history_text
      ? "Pt’s past medical history: " + value?.medical_history_text + "."
      : ""
    : value?.medical_history === "unknown"
    ? "Pt’s past medical history is unknown."
    : ""
}${
    value?.home_medications
      ? (value?.gender === "male"
          ? " His"
          : value?.gender === "female" || value?.gender === "pregnant"
          ? " Her"
          : " Pt's") +
        " home medications: " +
        value?.home_medications +
        "."
      : ""
  }

${"Labs:"}
${
  value?.substance_level === "yes"
    ? value?.asa
      ? value?.apap
        ? "ASA level measuring " +
          value?.asa +
          (value?.asaunit ? " " + value?.asaunit : "") +
          substance_time(value?.asa_drawingtime, value?.asa_exposuretime) +
          " and acetaminophen level measuring " +
          value?.apap +
          (value?.apapunit ? " " + value?.apapunit : "") +
          substance_time(value?.apap_drawingtime, value?.apap_exposuretime) +
          "."
        : "ASA level measuring " +
          value?.asa +
          (value?.asaunit ? " " + value?.asaunit : "") +
          substance_time(value?.asa_drawingtime, value?.asa_exposuretime) +
          " and acetaminophen level is not available currently."
      : ""
    : ""
}${
    value?.substance_level === "yes"
      ? !value?.asa
        ? value?.apap
          ? "ASA level is not available currently and acetaminophen level measuring " +
            value?.apap +
            (value?.apapunit ? " " + value?.apapunit : "") +
            substance_time(value?.apap_drawingtime, value?.apap_exposuretime) +
            "."
          : "ASA level and acetaminophen level are not available currently."
        : ""
      : ""
  }

${
  value?.substance_level === "yes"
    ? value?.serumetoh
      ? "Serum ETOH level measuring " +
        value?.serumetoh +
        (value?.serumetohunit ? " " + value?.serumetohunit : "") +
        substance_time(
          value?.serumetoh_drawingtime,
          value?.serumetoh_exposuretime
        ) +
        ". "
      : ""
    : ""
}${
    value?.substance_level === "yes"
      ? value?.methanollevel
        ? "Methanol level measuring " +
          value?.methanollevel +
          (value?.methanolunit ? " " + value?.methanolunit : "") +
          substance_time(
            value?.methanollevel_drawingtime,
            value?.methanollevel_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.ethyleneglycol
        ? "Ethylene glycol level measuring " +
          value?.ethyleneglycol +
          (value?.egunit ? " " + value?.egunit : "") +
          substance_time(
            value?.ethyleneglycol_drawingtime,
            value?.ethyleneglycol_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.vpa
        ? "Valproic acid level measuring " +
          value?.vpa +
          (value?.vpaunit ? " " + value?.vpaunit : "") +
          substance_time(value?.vpa_drawingtime, value?.vpa_exposuretime) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.lithium
        ? "Lithium level measuring " +
          value?.lithium +
          (value?.lithiumunit ? " " + value?.lithiumunit : "") +
          substance_time(
            value?.lithium_drawingtime,
            value?.lithium_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.iron
        ? "Iron level measuring " +
          value?.iron +
          (value?.ironunit ? " " + value?.ironunit : "") +
          substance_time(value?.iron_drawingtime, value?.iron_exposuretime) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.cbz
        ? "Carbamazepine level measuring " +
          value?.cbz +
          (value?.cbzunit ? " " + value?.cbzunit : "") +
          substance_time(value?.cbz_drawingtime, value?.cbz_exposuretime) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.phenobarbital
        ? "Phenobarbital level measuring " +
          value?.phenobarbital +
          (value?.phenobarbitalunit ? " " + value?.phenobarbitalunit : "") +
          substance_time(
            value?.phenobarbital_drawingtime,
            value?.phenobarbital_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.phenytoinT
        ? "Phenytoin(T) level measuring " +
          value?.phenytoinT +
          (value?.phenytoinTunit ? " " + value?.phenytoinTunit : "") +
          substance_time(
            value?.phenytoinT_drawingtime,
            value?.phenytoinT_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.phenytoinF
        ? "Phenytoin(F) level measuring " +
          value?.phenytoinF +
          (value?.phenytoinFunit ? " " + value?.phenytoinFunit : "") +
          substance_time(
            value?.phenytoinF_drawingtime,
            value?.phenytoinF_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.digoxin
        ? "Digoxin level measuring " +
          value?.digoxin +
          (value?.digoxinunit ? " " + value?.digoxinunit : "") +
          substance_time(
            value?.digoxin_drawingtime,
            value?.digoxin_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.lead
        ? "Lead level measuring " +
          value?.lead +
          (value?.leadunit ? " " + value?.leadunit : "") +
          substance_time(value?.lead_drawingtime, value?.lead_exposuretime) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.theophylline
        ? "Theophylline level measuring " +
          value?.theophylline +
          (value?.theophyllineunit ? " " + value?.theophyllineunit : "") +
          substance_time(
            value?.theophylline_drawingtime,
            value?.theophylline_exposuretime
          ) +
          ". "
        : ""
      : ""
  }${
    value?.substance_level === "yes"
      ? value?.arsenic
        ? "Urine arsenic level measuring " +
          value?.arsenic +
          (value?.arsenicunit ? " " + value?.arsenicunit : "") +
          substance_time(
            value?.arsenic_drawingtime,
            value?.arsenic_exposuretime
          ) +
          ". "
        : ""
      : ""
  }
    
${"A: Assessment - Toxicology assessment based on the exposure:"}
${
  value?.substance === "yes"
    ? assessment() + assessment__() + assessment_()
    : (value?.v3_1
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
}

${"P: Plan - Recommendations for treatment, observation and consultation:"}
${
  recommendgeneral.length > 0 &&
  (value?.intent_exposure.includes("unintentional") ||
    value?.intent_exposure.includes("other") ||
    value?.intent_exposure.includes("adverse reaction") ||
    value?.intent_exposure.includes("unknown reason") ||
    value?.intent_exposure.includes("withdrawal"))
    ? "The following lab works and assessments have been recommended: " +
      recommendgeneral.join(", ") +
      (value?.specific_recommend ? ", " + value?.specific_recommend : "") +
      "."
    : ""
}${
    recommendgender.length > 0 &&
    !(
      value?.intent_exposure.includes("unintentional") ||
      value?.intent_exposure.includes("other") ||
      value?.intent_exposure.includes("adverse reaction") ||
      value?.intent_exposure.includes("unknown reason") ||
      value?.intent_exposure.includes("withdrawal")
    )
      ? "The following lab works and assessments have been recommended: " +
        recommendgender.join(", ") +
        (value?.specific_recommend ? ", " + value?.specific_recommend : "") +
        "."
      : ""
  }

${
  value?.frequency_labs_recommend
    ? "Recommended to " + value?.frequency_labs_recommend + ". "
    : ""
}${
    value?.treatment_recommend
      ? "Recomended treatment(s) is " + value?.treatment_recommend + "."
      : ""
  }

${
  value?.observation_time_recommend
    ? "Recommended observation time: At least " +
      value?.observation_time_recommend +
      "-hour observation period has been suggested to closely monitor the patient's condition. "
    : ""
}${
    value?.speciality_consultation === "yes"
      ? value?.speciality_consultation_detail
        ? "Recommended consultations with other specialties: " +
          value?.speciality_consultation_detail +
          "."
        : "No specific consultations with other specialties have been mentioned."
      : ""
  }${
    value?.speciality_consultation === "no"
      ? "No specific consultations with other specialties have been mentioned."
      : ""
  }

${
  value?.tox_consultation === "accepted"
    ? "A toxicology consultation has been accepted" +
      (value?.tox_consultation_question
        ? ", The reason for this consultation is " +
          value?.tox_consultation_question
        : "") +
      "."
    : ""
}${
    value?.tox_consultation === "refused"
      ? "A toxicology consultation has been refused."
      : ""
  }
`;

  const exportTextAsFile = (text) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getHours() +
      "-" +
      today.getMinutes() +
      "-" +
      today.getSeconds();
    link.download = `final-report-${date}.txt`;
    link.href = url;

    link.click();
  };

  updateData(text);

  return (
    <box>
      <div className="report" style={{ minWidth: "644px" }}>
        <pre className="report-txt" value={text}>
          {text}
        </pre>
      </div>
      <Button variant="contained" onClick={() => exportTextAsFile(text)}>
        Save
      </Button>
    </box>
  );
};

export default FinalReportPage;
