import { render } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import {getEvents} from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;

  //get all the events from mock-data.api
  beforeAll(async () => {
    allEvents = await getEvents();
  });

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
