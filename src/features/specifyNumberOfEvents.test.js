import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
    
    test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        given('user hasn\'t changed the number for shown events', () => {

        });
        let AppComponent;
        when('main view is open', () => {
            AppComponent = render(<App />);
        });

        then("32 events should be shown", async() => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
              });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        given('a user is on the main page', () => {
            AppComponent = render(<App />);
        });

        when('user changes the number in the number of events textbox', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            let NOEDOM = AppDOM.querySelector('#number-events');
            const NOEInput = within(NOEDOM).queryByRole('textbox'); 
            await user.type(NOEInput, '{backspace}{backspace}10');
        });

        then('the list will update with the entered number', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
              });
        });
    });
});
