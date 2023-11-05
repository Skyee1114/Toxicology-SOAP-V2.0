import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page6 from "./Page6";
import Page7 from "./Page7";
import FinalReportPage from "./Final Report";
import { Padding } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState({});

  const [recommendgender, setRecommendGender] = React.useState([]);
  const [recommendgeneral, setRecommendGeneral] = React.useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
        style={{ minWidth: "250px" }}
      >
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="S: Subjective"
          {...a11yProps(0)}
        />
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="O: Objective"
          {...a11yProps(1)}
        />
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="A: Assessment"
          {...a11yProps(2)}
        />
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="P: Plan"
          {...a11yProps(3)}
        />
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="Final Report"
          {...a11yProps(4)}
        />
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="AI ASSISTANCE"
          {...a11yProps(5)}
        />
        <Tab
          sx={{ fontSize: "16px", p: 3 }}
          label="CHAT BOX"
          {...a11yProps(6)}
        />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Page1 value={value} setValue={setValue} />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Page2 value={value} setValue={setValue} />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Page3 value={value} setValue={setValue} />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Page4
            value={value}
            setValue={setValue}
            recommendgender={recommendgender}
            recommendgeneral={recommendgeneral}
            setRecommendGender={setRecommendGender}
            setRecommendGeneral={setRecommendGeneral}
          />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={4}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <FinalReportPage
            value={value}
            setValue={setValue}
            recommendgender={recommendgender}
            recommendgeneral={recommendgeneral}
            setRecommendGender={setRecommendGender}
            setRecommendGeneral={setRecommendGeneral}
          />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={5}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Page6 value={value} setValue={setValue} />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={6}>
        <div style={{ marginLeft: "30px", marginTop: "20px" }}>
          <Page7 value={value} setValue={setValue} />
        </div>
      </TabPanel>
    </Box>
  );
}
