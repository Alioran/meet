Feature: Show and Hide Event Details
 Scenario: An event element is collapsed by default.
  Given events are displayed on the main page
  When the user opens the app
  Then the events should not be displaying details
 Scenario: User can expand an event to see details.
  Given an event is displayed on the page
  When user taps on the open details button
  Then the event details open up
 Scenario: User can collapse an event to hide details.
  Given an event is displaying details
  When the user taps on the close details button
  Then the details are hidden