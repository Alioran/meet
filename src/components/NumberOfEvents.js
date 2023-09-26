import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE}) => {
    const [query, setQuery] = useState("32");
    const handleInputChanged = (event) => {
        const value = event.target.value; //obtain value to in input field
      
        setQuery(value);
        setCurrentNOE(value);
      };
    
  return (
    <div id="number-events">
      <input
        type="text"
        className="number"
        value={query}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
