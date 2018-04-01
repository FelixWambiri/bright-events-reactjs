import React from "react";
import marker from "./../../assets/img/marker.png"
import {Tooltip} from "material-ui";

export const MarkerComponent = ({ text }) =>  <Tooltip color="primary" title={`${text}`}><img style={{height:40}} src={marker} alt=""/></Tooltip>;
