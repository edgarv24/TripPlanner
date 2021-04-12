import ulog from "ulog";

import countryNameID from "../static/countryNameID.json";
import {hasFlag} from 'country-flag-icons';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import Coordinates from "coordinate-parser";

function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if(!urlParams.has("log")) {
        ulog.level = ulog.INFO
    }
}

setLogLevelIfDefault();

export const LOG = ulog("App");

export const PROTOCOL_VERSION = 4;
export const CLIENT_TEAM_NAME = "T14 The Fourteeners";

export const EARTH_RADIUS_UNITS_DEFAULT = {"nautical miles": "3440.0", "miles": "3959.0", "kilometers": "6371.0",
    "yards": "6967420.0", "feet": "20902260.0", "inches": "250827116.0"};

export const UNITS_SINGULAR = {"nautical miles": "nautical mile", "miles": "mile", "kilometers": "kilometer",
    "yards": "yard", "feet": "foot", "inches": "inch"};

export const correctUnits = (unit, value) => {
    if (value === 1 && Object.keys(UNITS_SINGULAR).includes(unit))
        return UNITS_SINGULAR[unit];
    return unit;
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const getCountryID = (countryName) => {
    const lookingFor = countryName.toLowerCase();
    for (let i = 0; i < Object.keys(countryNameID).length; i++) {
        if (countryNameID[i].name.toLowerCase() === lookingFor)
            return countryNameID[i].id;
    }
    return "";
}

export const getFlagIcon = (countryID) => {
    return hasFlag(countryID) ? getUnicodeFlagIcon(countryID) : null;
}

export const getCoordinateOrNull = (coordinateString) => {
    try {
        return new Coordinates(coordinateString);
    } catch (error) {
        return null;
    }
}

export const HTTP_OK = 200;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_INTERNAL_SERVER_ERROR = 500;
