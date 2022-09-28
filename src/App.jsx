import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import "./App.css";
import WeatherCard from "./Components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    const success = (position) => {
      const localor = {
        lat: position?.coords.latitude,
        lon: position?.coords.longitude,
      };
      setCoords(localor);
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      if (err.PERMISSION_DENIED || err.TIMEOUT) {
        alert("Active or allow your Geolocation to show your weather data");
        const localor = {
          lat: "-80.1628",
          lon: "-0.8471",
        };
        setCoords(localor);
      }
    };
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "b36dd03a446675766c50a905753a4a30";
      const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
      axios
        .get(WeatherUrl)
        .then((res) => {
          setWeather(res.data);
          setDegree({TEMP:res.data.main.temp,isCelsius:true})
          console.log(degree)
          const videoUrl = `https://youtube.googleapis.com/youtube/v3/search?q=${res.data.weather[0].description}%20sounds%20images%20only&key=AIzaSyDL2_5c8YZyM1Fe-v61yH5lQQZwGZ9xv28`;
          fetch(videoUrl)
            .then((res) => res.json())
            .then((resJson) => {
              console.log(videoUrl)
              const YTVideoID = resJson.items[Math.random() * 5 | 0].id.videoId;
              setVideoID(YTVideoID);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
  }, [coords]);


  // YouTube IFrame Player API.
  const [videoID, setVideoID] = useState("");
  const opts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      modestbranding: 1
    },
  };
  // Youtube custom functions 
  const onStart = e => {
    e.target.playVideo()
    e.target.setVolume(70)
  }
  const onPaused = e => {
    e.target.playVideo()
    if(e.target.isMuted()){
      e.target.unMute()
      }else{
        e.target.mute()
      }
  }
  // const checkElapsedTime = (e) => {
  //   console.log(e.target.playerInfo.playerState);
  //   const duration = e.target.getDuration();
  //   const currentTime = e.target.getCurrentTime();
  //   if (currentTime / duration > 0.95) {
  //     setModalIsOpen(true);
  //   }
  // };

  // transform weather temperature degree value
  let [degree, setDegree] = useState();
  function degreeTransform() {
    if(degree.isCelsius){
      // (26,27 °C × 9/5) + 32 = 79,286 °F
      const toFarenheit = ((degree.TEMP * 9 / 5) + 32).toFixed(2);
      setDegree({TEMP:toFarenheit,isCelsius:false});
    }else{
      // (26,27 °F − 32) × 5/9 = -3,183 °C
      const toCelsius = ((degree.TEMP - 32) * 5/9).toFixed(2);
      setDegree({TEMP:toCelsius,isCelsius:true});
    }
  }

  return (
    <div className="App">
      <WeatherCard weather={weather} degreechange={{degreeTransform, degree}} />
      <div className="YTvideo">
        <YouTube
          videoId={videoID}
          iframeClassName={"iframeYTvideo"}
          // containerClassName="embed embed-youtube"
          opts={opts}
          loading={"loading"}
          onPlay={(event)=>{}}
          onPause={(event) => {onPaused(event)}}
          onEnd={(event)=>{event.target.playVideo()}}
          onError={(event)=>{}}
          onReady={(event)=>{onStart(event)}}
          // onStateChange={(e)=>{e.target.playVideo()}}
        />
      </div>
    </div>
  );
}

export default App;
