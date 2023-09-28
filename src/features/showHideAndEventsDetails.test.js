import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAndEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppComponent;
    given("events are displayed on the main page", () => {});

    when("the user opens the app", () => {
      AppComponent = render(<App />);
    });
    let eventDOM;
    then("the events should not be displaying details", async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        eventDOM = AppDOM.querySelector(".event");
        const eventDetails = AppDOM.querySelector(".details");
        expect(eventDOM).toBeInTheDocument();
        expect(eventDetails).toBeNull();
      });
    });
  });

  test("User can expand an event to see details.", ({ given, when, then }) => {
    let AppComponent;
    given("an event is displayed on the page", () => {
      AppComponent = render(<App />);
    });
    let eventDOM;
    let showDetailsButton;
    when("user taps on the open details button", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const user = userEvent.setup();
      await waitFor(() => {
        eventDOM = AppDOM.querySelector(".event");
        showDetailsButton = eventDOM.querySelector(".details-btn");
      });
      await user.click(showDetailsButton);
    });

    then("the event details open up", () => {
      expect(eventDOM.querySelector('.details')).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let eventDOM;
    let showDetailsButton;
    given("an event is displaying details", async () => {
        AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const user = userEvent.setup();
        await waitFor(() => {
          eventDOM = AppDOM.querySelector(".event");
          showDetailsButton = eventDOM.querySelector(".details-btn");
        });
        await user.click(showDetailsButton);
    });
    let hideDetailsButton;
    when("the user taps on the close details button", async () => {
        const user = userEvent.setup();
        hideDetailsButton = eventDOM.querySelector(".details-btn");
        await user.click(hideDetailsButton);
    });

    then("the details are hidden", () => {
        const eventDetails = eventDOM.querySelector(".details");
        expect(eventDOM).toBeInTheDocument();
        expect(eventDetails).toBeNull();
    });
  });
});
