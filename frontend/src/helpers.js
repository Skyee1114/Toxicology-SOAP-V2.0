// const BASE_URL = "http://127.0.0.1:8000/api/v1";
const BASE_URL = "https://omid-backend-production.up.railway.app/api/v1";

export const createReport = async (text) => {
    try {
        const url = `${BASE_URL}/reports/`;
        const formData = new FormData();
        formData.append("summary", text);
        const result = await fetch(url, {
            method: "post",
            body: formData,
        });
        const { status } = result;
        const response = await result.json();
        return { status, response };
    } catch (e) {
        console.error(`Something went wrong. Unable to create report: ${e}`);
        return {
            status: 500,
            error: e,
        };
    }
};

export const getReports = async (params = {}) => {
    try {
        const url = `${BASE_URL}/reports/`;
        const result = await fetch(`${url}?${new URLSearchParams(params)}`);
        const { status } = result;
        const response = await result.json();
        return { status, response };
    } catch (e) {
        console.error(`Something went wrong. Unable to list reports: ${e}`);
        return {
            status: 500,
            error: e,
        };
    }
};

export const fetchReport = async (uuid) => {
    try {
        const url = `${BASE_URL}/reports/${uuid}`;
        const result = await fetch(url);
        const { status } = result;
        const response = await result.json();
        return { status, response };
    } catch (e) {
        console.error(`Something went wrong. Unable to fetch report: ${e}`);
        return {
            status: 500,
            error: e,
        };
    }
};

export const deleteReport = async (uuid) => {
    try {
        const url = `${BASE_URL}/reports/${uuid}`;
        const result = await fetch(url, { method: "delete" });
        const { status } = result;
        const response = await result.json();
        return { status, response };
    } catch (e) {
        console.error(`Something went wrong. Unable to delete report: ${e}`);
        return {
            status: 500,
            error: e,
        };
    }
};


export const calculatePSSScore = (values) => {
    const allValues = [...new Set(Object.values(values))];

    const SCORE_1_VALUES = ["mild", "milder"];
    const SCORE_2_VALUES = ["pro", "proer"];
    const SCORE_3_VALUES = ["severe", "severer"];

    const hasScore1 = allValues.some((val) => SCORE_1_VALUES.includes(val));
    const hasScore2 = allValues.some((val) => SCORE_2_VALUES.includes(val));
    const hasScore3 = allValues.some((val) => SCORE_3_VALUES.includes(val));

    const score = hasScore3 ? 3 : (hasScore2 ? 2 : (hasScore1 ? 1 : 0));

    return score;
};

export const prepareMedicalOutcome = (selectedEffects) => {
    const MINOR_EFFECTS = {
        cardiovascular: [
            "Tachycardia"
        ],
        dermal: [
            "Blister - vesicles",
            "Erythema / flushed",
            "Hives / welts",
            "Irritation / pain - Dermal",
            "Pallor",
            "Pruritis",
            "Rash",
            "Nail changes",
            "Other - Dermal",
            "Petechia",
            "Puncture wound / sting",
            "Desquamation",
            "Ecchymosis",
            "Burn(superficial)",
            "Cellulitis",
            "Edema",
        ],
        gastrointestinal: [
            "Anorexia",
            "Nausea",
            "Oral irritation",
            "Throat irritation",
            "Abdominal Pain",
            "Diarrhea",
            "Vomiting",
            "Constipation",
            "Other Gastrointestinal",
            "Ileus / no bowel sound",
            "Other Gastrointestinal"
        ],
        neurological: [
            "Headache",
            "Tinnitus",
            "CNS Depression(Mild)",
            "Agitation",
            "Other neurological",
            "Confusion",
            "Dizziness / vertig0",
        ],
        ocular: [
            "Lacrimation",
            "Red eye / conjunctivitis",
            "Irritation / pain - ocular",
            "Miosis",
            "Mydriasis",
            "Nystagmus",
            "Other - Ocular",
            "Photophobia",
            "Pupils(non - reactive)",
            "Blurred vision",
        ],
        renal: [
            "Urine color change",
            "Other - Renal / GU",
            "Oxalate crystals(urine)",
            "Urinary retention",
        ],
        respiratory: [
            "Cough / choke",
            "Other - Respiratory",
            "Pneumonitis",
            "X - ray finding(+)"
        ],
        misc: [
            "Diaphoresis",
            "Acidosis",
            "Alkalosis",
            "Fever / hyperthermia",
            "Hyperglycemia",
            "Hypoglycemia",
            "ADR to treatment",
            "Electrolyte abnormality",
            "Excessive secretion",
            "Increased anion gap",
            "Increased Osmolal gap",
            "Pain(not dermal, GI, ocular)",
            "Other - Miscellaneous",
        ]
    };

    const MODERATE_EFFECTS = {
        cardiovascular: [
            "Atrial fibrillation / Flutter",
            "Bradycardia",
            "ECG change - other / NOS",
            "Hypertension",
            "Hypotension",
            "Chest Pain",
            "ECG change ECG change - QRS widening",
            "ECG change - QTc prolongation",
            "ECG change - PR prolongation",
            "ECG change(other / NOS)",
            "CK - MB elevation",
            "Dysrhythmia(other)",
            "Troponin elevation",
        ],
        gastrointestinal: [
            "Dysphagia",
            "Blood per rectum(other)",
            "Dehydration",
            "Esophageal injury",
            "Gastric Burn",
            "Hematemesis",
            "Diarrhea - bloody",
            "Fecal incontinence",
            "Ileus / no bowel sound",
            "Melena",
            "Oral burns(including lips)",
            "Oropharyngeal edema",
            "Pancreatitis",
        ],
        hepatic: [
            "Increased Bilirubin",
            "Low absolute lymphocyte count",
            "Low hemoglobin / hematocrit",
            "PT / INR prolonged",
            "AST",
            "ALT > 1000",
            "Coagulopathy - other",
            "Methemoglobinemia",
            "100 < AST",
            "ALT <= 1,000",
            "Hemolysis",
            "LFT abnormality - other",
            "Low neutrophils",
            "Low white blood counts",
            "DIC",
            "Ammonia elevation",
            "Low platelets",
            "Other - Heme / Hepatic",
            "Low hemoglobin / hematocrit",
        ],
        neurological: [
            "Ataxia",
            "CNS Depression(Moderate)",
            "coma",
            "Muscle rigidity",
            "Muscle weakness",
            "Tremor",
            "Clonus",
            "Seizure(single)",
            "Diplopia",
            "EPS - akathisia",
            "EPS - dyskinesia",
            "EPS - dystonia",
            "EPS - other",
            "EPS - parkinsonism",
            "Fasciculation",
            "Hallucination / delusions",
            "Myoclonus",
            "Numbness",
            "Other neurological",
            "Paralysis",
            "Paranoia",
            "Peripheral neuropathy",
            "Seizure(multiple / discrete)",
            "Seizure(status)",
            "Slurred speech",
            "Syncope",
        ],
        ocular: [
            "Corneal abrasion",
            "Papilledema",
            "Visual",
            "defect",
            "Burn"
        ],
        dermal: [
            "Alopecia",
            "Blister - Bullae",
            "Necrosis",
            "Burns 2 - 3 degree",
        ],
        renal: [
            "Hematuria",
            "Increased creatinine",
            "Polyuria",
            "Hemo / myoglobinuria",
            "Oliguria / anuria",
            "Urinary incontinence",
        ],
        respiratory: [
            "Bronchospasm",
            "Dyspnea",
            "Respiratory depression",
            "Hyperventilation / tachypnea",
        ],
        misc: [
            "Anaphylactoid reaction",
            "Bleeding(other)",
            "Deafness",
            "Fetal death",
            "Hypothermia",
            "Rhabdomyolysis",
        ]
    };

    const MAJOR_EFFECTS = {
        cardiovascular: [
            "Asystole",
            "Heart block(2nd, 3rd degree)",
            "Pulseless electrical activity",
            "Torsades de pointes",
            "V.tachycardia / V.fibrillation",
        ],
        gastrointestinal: [
            "Esophageal stricture"
        ],
        hepatic: [
            "Jaundice"
        ],
        neurological: [
            "CNS Depression(Major)",
            "CVA",
            "Hypoxic brain injury",
            "Intracranial bleed",
            "Seizure(multiple / discrete)",
            "Seizure(status)",
        ],
        renal: [
            "Renal failure"
        ],
        respiratory: [
            "Cyanosis",
            "Pulmonary edema",
            "Pulmonary arrest",
        ],
    };

    const allOptions = Object.values(selectedEffects).flat(1);

    const minorEffects = Object.values(MINOR_EFFECTS).flat(1);
    const moderateEffects = Object.values(MODERATE_EFFECTS).flat(1);
    const majorEffects = Object.values(MAJOR_EFFECTS).flat(1);

    const hasMinorOutcome = allOptions.some((option) => minorEffects?.includes(option));
    const hasModerateOutcome = allOptions.some((option) => moderateEffects?.includes(option));
    const hasMajorOutcome = allOptions.some((option) => majorEffects?.includes(option));

    let finalOutcome = "N/A";

    if (hasMajorOutcome) {
        finalOutcome = "Major";
    } else if (hasModerateOutcome) {
        finalOutcome = "Moderate";
    } else if (hasMinorOutcome) {
        finalOutcome = "Minor";
    }

    return finalOutcome;
};