import { render, waitFor } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import getEvents from "../api";

const mockEvent = [
  {
    kind: "calendar#event",
    etag: '"3181161784712000"',
    id: "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
    status: "confirmed",
    htmlLink:
      "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
    created: "2020-05-19T19:17:46.000Z",
    updated: "2020-05-27T12:01:32.356Z",
    summary: "Learn JavaScript",
    description:
      "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
    location: "London, UK",
    creator: {
      email: "fullstackwebdev@careerfoundry.com",
      self: true,
    },
    organizer: {
      email: "fullstackwebdev@careerfoundry.com",
      self: true,
    },
    start: {
      dateTime: "2020-05-19T16:00:00+02:00",
      timeZone: "Europe/Berlin",
    },
    end: {
      dateTime: "2020-05-19T17:00:00+02:00",
      timeZone: "Europe/Berlin",
    },
    recurringEventId: "4eahs9ghkhrvkld72hogu9ph3e",
    originalStartTime: {
      dateTime: "2020-05-19T16:00:00+02:00",
      timeZone: "Europe/Berlin",
    },
    iCalUID: "4eahs9ghkhrvkld72hogu9ph3e@google.com",
    sequence: 0,
    reminders: {
      useDefault: true,
    },
    eventType: "default",
  },
];

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents = mockEvent;

  //for when the data passes using mockData(mock-data.js) rather than mockEvent
  // test('check for mockData', async () => {
  //     allEvents = await getEvents();
  //   });

  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("render title", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("render event start time", () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("renders event location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  test("default - details are hidden", () => {
    expect(EventComponent.container.querySelector(".details")).toBeNull();
  });

  test('show details should open when "Show Details" button is clicked', async () => {
    const user = userEvent.setup();

    const detailsButton = EventComponent.getByRole("button");
    await user.click(detailsButton);

    expect(
      EventComponent.container.querySelector(".details")
    ).toBeInTheDocument();
    expect(EventComponent.queryByText("Hide Details")).toBeInTheDocument();
  });

  test('hidden details after the "Show Details" and "Hide Details" are clicked', async () => {
    const user = userEvent.setup();

    const showDetailsButton = EventComponent.getByRole("button");
    await user.click(showDetailsButton);

    const hideDetailsButton = EventComponent.getByRole("button");
    await user.click(hideDetailsButton);

    expect(
      EventComponent.container.querySelector(".details")
    ).toBeNull();
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });
});
