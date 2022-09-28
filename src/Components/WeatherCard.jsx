import { React } from "react";
import './styles/WeatherCard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faCloud,
  faTemperatureHigh,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
// import {faFacebook} from "@fortawesome/free-brands-svg-icons"

const WeatherCard = ({ weather, degreechange}) => {
  // console.log(weather);
  let srcIcon = `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`;
  return (
    <div className="cards">
      <div className="cardHeader">
        <h3 className="cardTitle">
          {"¿ What's the weather like in"}{" "}
          <b>
            {weather?.name}, {weather?.sys.country}
          </b>
          {" ?"}
        </h3>
        <div className="cardIcon">
          <img src={weather ? srcIcon : ""} alt={weather?.weather[0].description} />
        <p onClick={degreechange.degreeTransform}>
          <i>
            <FontAwesomeIcon icon={faTemperatureHigh} />
          </i>{" "}
          {degreechange.degree?.TEMP} 
          <span className={degreechange.degree?.isCelsius ? "" : "degreeStyle"}>{"°C |"}</span>
          <span className={degreechange.degree?.isCelsius ? "degreeStyle" : ""}>{" °F"}</span>
        </p>
        </div>
        <div>
          {weather?.weather[0].description}
        </div>
        <div className="geoLocation">
          <i><FontAwesomeIcon icon={faMapLocationDot} /></i>
          <p>
            <span>{"Lat"}</span> {weather?.coord.lat}
          </p>
          <p>
            <span>{"Long"}</span> {weather?.coord.lon}
          </p>
        </div>
      </div>
      
      <div className="cardBody">
        <p>
          <span>{"Pressure:"}</span> {weather?.main.pressure} {"hPa"}
        </p>
        <p>
          <span>{"Humidity:"}</span> {weather?.main.humidity} {"%"}
        </p>
        <p className="dataIcon">
          <i>
            <FontAwesomeIcon icon={faCloud} />
          </i>{" "}
          {weather?.clouds.all} {"%"}
        </p>
        <p className="dataIcon">
          <i>
            <FontAwesomeIcon icon={faWind} />
          </i>{" "}
          {weather?.wind.speed} {"m/s"}
        </p>
      </div>
      <div className="cardFooter"></div>
    </div>
  );
};

export default WeatherCard;
