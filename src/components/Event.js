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
    <li>
      <h1>{event.summary}</h1>
      <p className="date-created">{event.created}</p>
      <p className="location">{event.location}</p>
      {showDetails ? (
        <div className="details">
          <p>details here</p>
          <button onClick={handleHideDetails}>Hide Details</button>
        </div>
      ) : (
        <button onClick={handleShowDetails}>Show Details</button>
      )}
    </li>
  );
};

export default Event;
