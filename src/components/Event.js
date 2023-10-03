import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleHideDetails = () => {
    setShowDetails(false);
  };

  return (
    <li className="event">
      <h1>{event.summary}</h1>
      <p className="date-created">{event.created}</p>
      <p className="location">{event.location}</p>
      {showDetails ? (
        <div className="details">
          <h3>Creator: {event.creator.email}</h3>
          <p>Organizer: {event.organizer.email}</p>
          <p>Start Time: {event.start.dateTime}</p>
          <p>End Time: {event.end.dateTime}</p>
          <button className="details-btn" onClick={handleHideDetails}>Hide Details</button>
        </div>
      ) : (
        <button className="details-btn" onClick={handleShowDetails}>Show Details</button>
      )}
    </li>
  );
};

export default Event;
