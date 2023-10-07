import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false); //set to false so it doesnt show when out of focus
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]); 

  const handleInputChanged = (event) => {
    const value = event.target.value; //obtain value to in input field
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
  
    setQuery(value);
    setSuggestions(filteredLocations);

    //if there is no city matching in search
    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city."
    } else { //if there are locations that match, don't have the alert
      infoText = ""
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); //to hide list
    setCurrentCity(value);
    setInfoAlert("")//make sure no alert when clicking "see all cities"
  };

  return (
    <div id="city-search">
      Search cities for events: <br></br>
      <input
        type="text"
        className="city"
        placeholder="Search..."
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
    </div>
 );
};

export default CitySearch;
