import axios from "axios";
import { capitalize } from "../../../util/textHelper";

export const processTrafficData = data => {
  return data && data["items"] && data["items"][0]["cameras"]
    ? data["items"][0]["cameras"]
    : null;
};

export const processWeatherData = data => {
  if (data["area_metadata"] && data["area_metadata"].length) {
    const newData = data["area_metadata"].map((item, index) => {
      const pairing = data["items"][0]["forecasts"][index];
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

export const getNearestWeatherInfo = (location, weatherData) => {
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

export const joinData = (traffic, weather) => {
  if (!traffic) {
    return null;
  }
  const newData = traffic.map(item => {
    const weatherInfo = getNearestWeatherInfo(item.location, weather);
    return weatherInfo
      ? {
          ...item,
          area: weatherInfo.name,
          forecast: weatherInfo.forecast
        }
      : { ...item, area: null, forecast: null };
  });
  return newData;
};

export const processReverseGeoCode = (
  data,
  cb,
  type = "gmap",
  lookupCache = () => null,
  updateCache = () => null,
  updateData = () => null
) => {
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
    const currUrl = `${url}${item["location"]["latitude"]},${item["location"]["longitude"]}`;
    const name = lookupCache(
      `${item["location"]["latitude"]}${item["location"]["longitude"]}`
    );
    if (name) {
      const newItem = { ...item, name };
      updateData(newItem);
    } else {
      axios
        .get(currUrl)
        .then(res =>
          type === "onemap"
            ? cb(res.data, item, updateCache, updateData)
            : cb(res.data, item, currUrl, 0, updateCache, updateData)
        );
    }
  }
};

export const onemapGeoCode = (
  data,
  item,
  updateCache = () => null,
  updateData = () => null
) => {
  let newItem = null;
  let name = "UNKNOWN";
  if (data["GeocodeInfo"].length) {
    name = capitalize(data["GeocodeInfo"][0]["ROAD"]);
    updateCache({
      [`${item["location"]["latitude"]}${item["location"]["longitude"]}`]: name
    });
  }
  newItem = { ...item, name };

  updateData(newItem);
};

export const gmapGeoCode = (
  data,
  item,
  url,
  times,
  updateCache = () => null,
  updateData = () => null
) => {
  let newItem = null;
  let name = "UNKNOWN";
  if (data.status !== "OK") {
    if (times < 3) {
      setTimeout(() => {
        axios
          .get(url)
          .then(res =>
            gmapGeoCode(res.data, item, url, times + 1, updateCache, updateData)
          );
      }, 2000);
    }
    return;
  }

  if (data["results"].length && data["results"][0]["address_components"]) {
    const temp =
      data["results"][0]["address_components"].find(item =>
        item["types"] ? item["types"].find(type => type === "route") : false
      ) || null;

    name = temp["long_name"];

    updateCache({
      [`${item["location"]["latitude"]}${item["location"]["longitude"]}`]: name
    });
  }

  newItem = { ...item, name };

  updateData(newItem);
};
