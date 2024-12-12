import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import "./LandingPage.css";

export default function TimePage() {
  const [timezone, setTimezone] = useState(new Set());
  const [selectedTimezone, setSelectedTimezone] = useState(""); // Tracks selected timezone
  const [selectedLocation, setSelectedLocation] = useState(""); // Tracks selected location
  const [location, setLocation] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  const API_URL = `http://worldtimeapi.org/api/timezone`;
  const API_URL2 = `http://worldtimeapi.org/api/${selectedTimezone}`;
  const API_URL3 = `http://worldtimeapi.org/api/${selectedTimezone}/${selectedLocation}`;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const newSet = new Set();
        const response = await fetch(API_URL);
        const data = await response.json();

        const dataArray = Object.values(data);

        for (let i = 0; i < dataArray.length; i++) {
          const result = dataArray[i].split("/");
          newSet.add(result[0]);
        }
        setTimezone(newSet);
      } catch (error) {
        console.log("Error fetching timezones:", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (selectedTimezone) {
      const fetchLoc = async () => {
        try {
          const newSet = new Set();
          const response2 = await fetch(API_URL2);
          const data2 = await response2.json();

          const data2array = Object.values(data2);
          for (let i = 0; i < data2array.length; i++) {
            const result = data2array[i].split("/");
            if (result.length > 1) {
              newSet.add(result[1]);
            } else {
              newSet.add(result[0]);
            }
          }
          setLocation([...newSet]);
        } catch (error) {
          console.error("Could not fetch locations", error);
        }
      };
      fetchLoc();
    } else {
      setLocation([]); // Clear locations if no timezone is selected
    }
  }, [selectedTimezone]);

  // }, [selectedLocation, selectedTimezone])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedLocation && selectedTimezone) {
      //it is {time} at this {location} in the timezone: {timezone}.
      const fetchAll = async () => {
        if (selectedLocation == "No locations available") {
          setSelectedLocation("");
          // console.log("im here");
          const response3 = await fetch(API_URL2);
          const data3 = await response3.json();
          const datetime = data3.datetime;
          const first = datetime.split("T")[1];
          const second = first.split(".")[0];
          console.log(second);
          setCurrentTime(second);
        } else {
          console.log(API_URL3);
          const response3 = await fetch(API_URL3);
          const data3 = await response3.json();
          //parse datetime
          //get the time
          // const data3array = Object.values(data3);
          const datetime = data3.datetime;
          // 2024-12-12T06:25:24.969000+09:30

          const first = datetime.split("T")[1];
          const second = first.split(".")[0];
          // console.log(datetime.split('T')[1]);
          console.log(datetime);
          setCurrentTime(second);
        }
      };

      fetchAll();
    }
  };
  return (
    <>
      <div className="search-page">
        <div className="search-box">
          <h2>Get Current Time</h2>
          <form id="main-form" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div>
                <label
                  htmlFor="timezone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)} // Update selected timezone
                  className="select-dropdown"
                >
                  <option value="">Select Timezone</option>
                  {[...timezone].map((tz, index) => (
                    <option key={index} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
              <br></br>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)} // Update selected location
                  className="select-dropdown"
                  disabled={!selectedTimezone} // Disable Location until a timezone is selected
                >
                  <option value="">Select Location</option>
                  {location && location.length > 0 ? (
                    [...location].map((loc, index) => (
                      <option key={index} value={loc}>
                        {loc}
                      </option>
                    ))
                  ) : (
                    <option>No locations available</option>
                  )}
                </select>
              </div>
            </div>
          </form>
          <div>
            <p>Selected Timezone: {selectedTimezone || "None"}</p>
            <p>Selected Location: {selectedLocation || "None"}</p>
          </div>
          <div>
            <Button
              type="submit"
              color="blue"
              value="submit"
              form="main-form"
              disabled={!selectedTimezone && !selectedLocation}
            >
              Get Time!
            </Button>
          </div>

          {currentTime && (
            <div>
              <p>
                This is the current time at for the selected Timezone and
                Location: {currentTime}
              </p>
            </div>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
}
