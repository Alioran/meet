import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE, setErrorAlert}) => {
    const [query, setQuery] = useState("12");
    const handleInputChanged = (event) => {
        const value = event.target.value; //obtain value to in input field
      
        setQuery(value);

        const valueInt = Number(value)

        //if value isnt a number or is <= 0, set error
        let errorText;
        if (isNaN(valueInt) || valueInt <= 0 || valueInt >= 33 ) {
          errorText = "Value entered must be a number and larger than 0 but less than 33"
        } 
        else { //if there are locations that match, don't have the alert
          errorText = ""
          setCurrentNOE(value);
        }
        setErrorAlert(errorText);
      };
    
  return (
    <div id="number-events">
      Displayed Events: <br></br>
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
