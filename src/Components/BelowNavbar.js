import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants.js";
import "../App.css";
import ItineraryOptionsButton from "./ItineraryOptionsButton";
import ExplorePage from "./ExplorePage.js";
import UpcomingPage from "./UpcomingPage.js";
import PastPage from "./PastPage.js";

export default function BelowNavbar({ type }) {
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [itineraryActivities, setItineraryActivities] = useState([]);

  // Caleb: introduced a type prop to tweak the itineraries shown based on the selected tab.
  // e.g., if type="explore", to only show itineraries which user is not a part of

  const userId = 2; // to remove

  useEffect(() => {
    let apiEndpoint;

    switch (type) {
      case "explore":
        apiEndpoint = userId
          ? `${BACKEND_URL}/itinerary/explore/${userId}`
          : `${BACKEND_URL}/itinerary/explore`;

        axios.get(apiEndpoint).then((response) => {
          setItineraryActivities(response.data);
        });
        break;

      case "upcoming":
      case "past":
        apiEndpoint = `${BACKEND_URL}/itinerary/${userId}`;
        axios.get(apiEndpoint).then((response) => {
          // setItineraryActivities(response.data);
          console.log(response.data[0].prompts.startDate);
          const today = new Date();
          const filteredData = response.data.filter((activity) => {
            const endDate = new Date(activity.prompts.endDate);
            return type === "upcoming" ? endDate >= today : endDate < today;
          });
          console.log("today", today);
          console.log("filteredData", filteredData);
          setItineraryActivities(filteredData);
        });
        break;

      default:
        apiEndpoint = `${BACKEND_URL}/itinerary/${userId}`;
        axios.get(apiEndpoint).then((response) => {
          setItineraryActivities(response.data);
        });
        break;
    }
  }, [type]);

  // useEffect(() => {
  //   axios.get(`${BACKEND_URL}/itinerary/${userId}`).then((response) => {
  //     setItineraryActivities(response.data); //JSON.stringify
  //   });
  // }, []);
  // console.log("itineraryActivities_origin", itineraryActivities[0].photoUrl);

  return (
    <div>
      {/* if there are itineraries, render 2 components: left container to display picture, right container to display list of itineraries */}
      {/* if no itinerary, render button for user to add itinerary  */}
      {type === "explore" ? (
        <ExplorePage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
        />
      ) : type === "upcoming" ? (
        <UpcomingPage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
        />
      ) : (
        <PastPage
          selectedItinerary={selectedItinerary}
          setSelectedItinerary={setSelectedItinerary}
          itineraryActivities={itineraryActivities}
        />
      )}

      {selectedItinerary ? null : (
        <ItineraryOptionsButton
          option="add"
          itineraryActivities={itineraryActivities}
          setItineraryActivities={setItineraryActivities}
        />
      )}
    </div>
  );
}
