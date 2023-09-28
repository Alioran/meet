Feature: Show and Hide Event Details
 Scenario: When user hasn’t specified a number, 32 events are shown by default.
  Given user hasn't changed the number for shown events
  When main view is open
  Then 32 events should be shown
 Scenario: User can change the number of events displayed.
  Given a user is on the main page
  When user changes the number in the number of events textbox
  Then the list will update with the entered number