import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Footer from "../../atoms/footer";
import Datetime from "../../organisms/datetime";
import Locationpicker from "../../organisms/locationpicker";
import Modal from "../../molecules/modal";

import { getDateString, getTimeString } from "../../../util/dateToString";
import { lookupCache, updateCache } from "../../../util/cacheGeo";

import {
  processTrafficData,
  processWeatherData,
  joinData,
  processReverseGeoCode,
  gmapGeoCode
} from "./processResData";

// Process after date and time are selected
// - traffic and weather endpoints are called concurrently
// - both data returned is processed, mapped and joined
// - reverse geocode applied to each item in data concurrently
// - display each item the moment they are reverse geocoded

// in order of main function calls
// getData
// processTrafficData & processWeatherData
// joinData
// getNearestWeatherInfo
// processReverseGeoCode
// onemapGeoCode | gmapGeoCode

const Main = props => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const [errorMsg, setErrorMsg] = useState("Please try again later");

  const getData = dt => {
    axios
      .all([
        axios.get(`${process.env.REACT_APP_TRAFFIC_ENDPOINT}?date_time=${dt}`),
        axios.get(`${process.env.REACT_APP_WEATHER_ENDPOINT}?date_time=${dt}`)
      ])
      .then(
        axios.spread((traffic, weather) => {
          const tData = processTrafficData(traffic.data);
          const wData = processWeatherData(weather.data);
          if (tData) {
            const newData = joinData(tData, wData);
            processReverseGeoCode(
              newData,
              gmapGeoCode,
              "gmap",
              lookupCache,
              updateCache,
              updateData
            );

            // wait .8sec
            setTimeout(() => {
              setLoading(false);
            }, 800);
          } else {
            setLoading(false);
            setErrorMsg("Please select a past date and time");
          }
        })
      )
      .catch(e => {
        console.log(e);
        setData(null);
        setErrorMsg("Sorry! Please try again later!");
        setLoading(false);
      });
  };

  const updateData = newItem => {
    setData(olddata => {
      const name = newItem.name;
      if (olddata) {
        const newData = JSON.parse(JSON.stringify(olddata));
        if (newData[name]) {
          newData[name].push(newItem);

          newData[name].sort((a, b) => {
            if (a["area"] < b["area"]) {
              return -1;
            }
            if (a["area"] > b["area"]) {
              return 1;
            }
            return 0;
          });
        } else {
          newData[name] = [newItem];
        }
        return newData;
      } else {
        return { [name]: [newItem] };
      }
    });
  };

  const reqData = useCallback(getData, []);

  useEffect(() => {
    if (date && time) {
      setLoading(true);
      setData(null);
      const dt = `${getDateString(date)}T${getTimeString(time)}`;
      reqData(dt);
    }
  }, [date, time, reqData]);

  return (
    <>
      <div className="container">
        {/* Clearing cache section, only in development */}
        {/* {process.env.NODE_ENV === "development" ? (
          <div className="row">
            <div className="col text-center">
              <button
                className="btn btn-danger m-3"
                onClick={() => {
                  clearCache();
                }}
              >
                Clear local storage cache
              </button>
            </div>
          </div>
        ) : null} */}

        {/* title section */}
        <div className="row">
          <div className="col">
            <h2 className="text-center my-4">
              <i className="fas fa-cloud"></i> Weather Forecast and{" "}
              <i className="fas fa-camera"></i> Traffic Cam
            </h2>
          </div>
        </div>

        {/* Date and time picker and loading screen section */}
        <div className="row justify-content-center">
          <Datetime
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            loading={loading}
            invalid={Boolean(date && time && !data && !loading)}
          />
        </div>

        {/* Locationpicker and error msg section */}
        <div className="row">
          <div className="col">
            {date && time ? (
              data && !loading ? (
                <Locationpicker
                  data={data}
                  onClick={data => setSelected(data)}
                />
              ) : !data && !loading ? (
                <h6 className="text-center mt-2 text-danger">{errorMsg}</h6>
              ) : null
            ) : null}
          </div>
        </div>

        {/* Pop up modal section */}
        <Modal
          setShow={setSelected}
          show={Boolean(selected)}
          title={selected}
          data={data && selected ? data[selected] : null}
        />
      </div>
      <Footer />
    </>
  );
};

export default Main;
