import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Footer from "../../atoms/footer";
import Datetime from "../../organisms/datetime";
import Locationpicker from "../../organisms/locationpicker";
import Modal from "../../molecules/modal";

import { getDateString, getTimeString } from "../../../util/dateToString";
import { lookupCache, updateCache, clearCache } from "../../../util/cacheGeo";

import mock from "../../../mock2";

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
            joinData(tData, wData);
          } else {
            setErrorMsg("Please select a past date and time");
          }
        })
      )
      .catch(e => {
        console.log(e);
        setData(null);
        setErrorMsg("Sorry! Please try again later!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const getData = () => {
  //   processReverseGeoCode(mock)
  //   setLoading(false)
  // }

  const processReverseGeoCode = (data, type = "gmap") => {
    let token = "";
    let url = null;
    if (type === "onemap") {
      token = process.env.REACT_APP_ONEMAP_TOKEN;
      url = `${process.env.REACT_APP_ONEMAP_ENDPOINT}?token=${token}&buffer=100&location=`;
    } else {
      token = process.env.REACT_APP_GMAP_TOKEN;
      url = `${process.env.REACT_APP_GMAP_ENDPOINT}?result_type=route&key=${token}&latlng=`;
    }

    for (const item of data) {
      const currUrl = `${url}${item.location.latitude},${item.location.longitude}`;
      const name = lookupCache(
        `${item.location.latitude}${item.location.longitude}`
      );
      if (name) {
        const newItem = { ...item, name };
        updateData(newItem);
      } else {
        axios
          .get(currUrl)
          .then(res =>
            type === "onemap"
              ? onemapGeoCode(res.data, item)
              : gmapGeoCode(res.data, item, currUrl, 0)
          );
      }
    }
  };

  const onemapGeoCode = (data, item) => {
    let newItem = null;
    let name = "UNKNOWN";
    if (data.GeocodeInfo.length) {
      name = data.GeocodeInfo[0].ROAD;
      updateCache({
        [`${item.location.latitude}${item.location.longitude}`]: name
      });
    }
    newItem = { ...item, name };

    updateData(newItem);
  };

  const gmapGeoCode = (data, item, url, times) => {
    let newItem = null;
    let name = "UNKNOWN";
    if (data.status !== "OK") {
      if (times < 3) {
        setTimeout(() => {
          axios
            .get(url)
            .then(res => gmapGeoCode(res.data, item, url, times + 1));
        }, 1000);
      }
      return;
    }

    if (data.results.length && data.results[0].address_components) {
      const temp =
        data.results[0].address_components.find(item =>
          item.types ? item.types.find(type => type === "route") : false
        ) || null;
      name = temp.long_name;
      updateCache({
        [`${item.location.latitude}${item.location.longitude}`]: name
      });
    }

    newItem = { ...item, name };

    updateData(newItem);
  };

  const updateData = newItem => {
    setData(olddata => {
      const name = newItem.name;
      if (olddata) {
        const newData = JSON.parse(JSON.stringify(olddata));
        if (newData[name]) {
          newData[name].push(newItem);
        } else {
          newData[name] = [newItem];
        }
        return newData;
      } else {
        return { [name]: [newItem] };
      }
    });
  };

  const processTrafficData = data => {
    return data.items && data.items[0].cameras ? data.items[0].cameras : null;
  };

  const processWeatherData = data => {
    if (data.area_metadata.length) {
      const newData = data.area_metadata.map((item, index) => {
        const pairing = data.items[0].forecasts[index];
        const name = item.name;
        const long = item.label_location.longitude;
        const lat = item.label_location.latitude;
        const forecast = pairing.forecast;
        return {
          name,
          long,
          lat,
          forecast
        };
      });
      return newData;
    }
    return null;
  };

  const joinData = (traffic, weather) => {
    const newData = traffic.map(item => {
      const weatherInfo = getNearestWeatherInfo(item.location, weather);
      return weatherInfo
        ? {
            image: item.image,
            location: { ...item.location },
            area: weatherInfo.name,
            forecast: weatherInfo.forecast
          }
        : { ...item, forecast: null };
    });
    processReverseGeoCode(newData);
  };

  const getNearestWeatherInfo = (location, weatherData) => {
    if (!weatherData) {
      return null;
    }
    let min = Infinity;
    let nearest = -1;
    for (let i = 0; i < weatherData.length; i++) {
      const data = weatherData[i];
      const curr =
        Math.abs(location.longitude - data.long) +
        Math.abs(location.latitude - data.lat);
      if (curr < min) {
        min = curr;
        nearest = i;
      }
    }
    return nearest > -1 ? weatherData[nearest] : null;
  };

  const reqData = useCallback(getData, []);

  useEffect(() => {
    if (data) {
      console.log("group", data);
    }
  }, [data]);

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
        {process.env.NODE_ENV === "development" ? (
          <div className="row">
            <div className="col text-center">
              <button className="btn btn-danger m-3">
                Clear local storage cache
              </button>
            </div>
          </div>
        ) : null}

        {/* title section */}
        <div className="row">
          <div className="col">
            <h2 className="text-center my-4">
              Weather Forecast and Traffic Cam
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
