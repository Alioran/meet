import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe("<NumberOfEvents /> component", () => {
    let NumberofEventsComponent;
    beforeEach(() => {
        NumberofEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => { }}/>);
      })

      test('render textbox for number input', () => {
        expect(NumberofEventsComponent.queryByRole("textbox")).toBeInTheDocument();
      });

      test('render 32 for the default number in textbox', () => {
        const numberTextBox = NumberofEventsComponent.queryByRole('textbox');
        expect(numberTextBox).toHaveValue("32");
      });

      test('check that value changes to 10 after user input', async () => {
        const user = userEvent.setup();
        const numberTextBox = NumberofEventsComponent.queryByRole('textbox');
        
        await user.type(numberTextBox, '{backspace}{backspace}10');
        expect(numberTextBox).toHaveValue("10");
      });
})