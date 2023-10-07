# Meet App
This is a React app that will allow users to find events and details of those events in specified cities. This app was built using React and Javascript, with Unit, Integration, User Acceptance and End-to-End Testing included in the process. Google Calendar API and Authorization is used to verify the user before getting data with serverless toolkit provided by AWS Lambda. The app is also able to be used offline with stored data from the user's previous visit, and can be downloaded from the Chrome browser as an application for your desktop or mobile device. 

## Features
- Uses Google Calendars as it's database
- Authorizes using Google API and OAuth
- Search events by city
- Change the number of events that are displayed
- Display details of events
- Keep loaded data while offline so that users can interact with the app without connection to the internet
- Charts on the percentage of event types that are available and how many are in which cities

## Tools Used
- React: To build the app structure
- Jester/Cucumber: For testing
- Puppeteer: Also for testing
- Google Calendar API & OAuth: For data and authorization
- Amazon Webservice(AWS Lambda): For serverless toolkit
- Atatus: For performance monitoring
- Rechart: For data visualization