import React, { useEffect, useState, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import SubTabs from "./SubTabs/SubTabs";
import { MyContext } from "../context/MyContext";

const DedicatedReport = () => {
  //context Api
  const { data } = useContext(MyContext);

  //comprehensive
  const [comprehensiveData, setComprehensiveData] = useState(null);
  const [comprehensiveLoader, setComprehensiveLoader] = useState(false);

  const useEffectOnce = (effect) => {
    const destroyFunc = useRef();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);

    if (effectCalled.current) {
      renderAfterCalled.current = true;
    }

    useEffect(() => {
      // only execute the effect first time around
      if (!effectCalled.current) {
        destroyFunc.current = effect();
        effectCalled.current = true;
      }

      return () => {
        // if the comp didn't render since the useEffect was called,
        // we know it's the dummy React cycle
        if (!renderAfterCalled.current) {
          return;
        }
        if (destroyFunc.current) {
          destroyFunc.current();
        }
      };
    }, []);
  };

  useEffectOnce(() => {
    const fetchComprehensive = async () => {
      setComprehensiveLoader(true);
      try {
        const response = await axios.post("/api/comprehensive_note/", {
          input: data,
        });
        setComprehensiveLoader(false);
        setComprehensiveData(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComprehensive();
  }, []);

  return (
    <Box>
      <SubTabs
        comprehensiveData={comprehensiveData}
        comprehensiveLoader={comprehensiveLoader}
      />
    </Box>
  );
};

export default DedicatedReport;
