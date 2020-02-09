import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";

jest.mock("axios");

import trafficData from "./data/traffic_mock.json";
import trafficEmptyData from "./data/traffic_empty_mock.json";
import weatherData from "./data/weather_mock.json";
import weatherEmptyData from "./data/weather_empty_mock.json";
import joinedData from "./data/joined_mock.json";
import joinedNoWeatherData from "./data/joined_noweather_mock.json";
import onemapData from "./data/onemap_mock.json";
import onemapEmptyData from "./data/onemap_empty_mock.json";
import gmapData from "./data/gmap_mock.json";
import gmapOverLimitData from "./data/gmap_over_limit.json";

import {
  processTrafficData,
  processWeatherData,
  joinData,
  processReverseGeoCode,
  gmapGeoCode,
  onemapGeoCode
} from "../../components/pages/main/processResData";

it("Process traffic data", () => {
  let data = processTrafficData(trafficData);
  expect(data.length).toEqual(2);
  expect(data[0]["camera_id"]).toEqual("1701");
});

it("Process empty traffic data", () => {
  let data = processTrafficData(trafficEmptyData);
  expect(data).toEqual(null);
});

it("Process weather data", () => {
  let data = processWeatherData(weatherData);
  expect(data.length).toEqual(3);
  expect({ ...data[1] }).toEqual({
    name: "Bedok",
    long: 103.924,
    lat: 1.321,
    forecast: "Fair (Day)"
  });
  data = processWeatherData(weatherEmptyData);
  expect(data).toEqual(null);
});

it("Process empty weather data", () => {
  let data = processWeatherData(weatherEmptyData);
  expect(data).toEqual(null);
});

it("Process joining data", () => {
  let tData = processTrafficData(trafficData);
  let wData = processWeatherData(weatherData);
  let data = joinData(tData, wData);
  expect(data.length).toEqual(2);
  expect(data[0]["area"]).toEqual("Bishan");
});

it("Process joining empty weather data", () => {
  let tData = processTrafficData(trafficData);
  let wData = processWeatherData(weatherEmptyData);
  let data = joinData(tData, wData);
  expect(data.length).toEqual(2);
  expect(data[1]["area"]).toEqual(joinedNoWeatherData[1]["area"]);
});

it("Process joining empty traffic data", () => {
  let tData = processTrafficData(trafficEmptyData);
  let wData = processWeatherData(weatherData);
  let data = joinData(tData, wData);
  expect(data).toEqual(null);
});

it("Process reverse geocoding calls api", async () => {
  axios.get.mockResolvedValue({ data: "testing" });

  processReverseGeoCode(joinedData, data => {
    expect(data).toEqual("testing");
  });
  expect.assertions(2);
});

it("Process onemap calls", () => {
  expect.assertions(1);

  onemapGeoCode(
    onemapData,
    {
      location: {
        latitude: 1.323604823,
        longitude: 103.8587802
      }
    },
    () => null,
    data => {
      expect(data).toEqual({
        location: {
          latitude: 1.323604823,
          longitude: 103.8587802
        },
        name: "Jalan Tenteram"
      });
    }
  );
});

it("Process empty onemap calls", () => {
  expect.assertions(1);

  onemapGeoCode(
    onemapEmptyData,
    {
      location: {
        latitude: 1.323604823,
        longitude: 103.8587802
      }
    },
    () => null,
    data => {
      expect(data).toEqual({
        location: {
          latitude: 1.323604823,
          longitude: 103.8587802
        },
        name: "UNKNOWN"
      });
    }
  );
});

it("Process gmap calls", () => {
  expect.assertions(1);

  gmapGeoCode(
    gmapData,
    {
      location: {
        latitude: 1.323604823,
        longitude: 103.8587802
      }
    },
    "",
    0,
    () => null,
    data => {
      expect(data).toEqual({
        location: {
          latitude: 1.323604823,
          longitude: 103.8587802
        },
        name: "Airport Boulevard"
      });
    }
  );
});

it("Process over limit gmap calls", () => {
  const test = jest.fn();
  axios.get.mockImplementation(() => Promise.resolve(test));

  gmapGeoCode(
    gmapOverLimitData,
    {
      location: {
        latitude: 1.323604823,
        longitude: 103.8587802
      }
    },
    "",
    0
  );
  expect(axios.get).toHaveBeenCalledTimes(2);
});
