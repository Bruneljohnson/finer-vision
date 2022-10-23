import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SectionOne } from '../../components/Sections/';
import { store } from '../../store/store';

describe('<SectionOne/>', () => {
  describe('Initial state', () => {
    test('Section One should display black form', async () => {
      render(
        <Provider store={store}>
          <SectionOne
            formStep={0}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );
      const firstName = screen.getByLabelText(/first name/i);
      const firstNameInput = await screen.findByTestId('first-name');

      const surname = screen.getByLabelText(/surname/i);
      const surnameInput = await screen.findByTestId('surname');

      const email = screen.getByLabelText(/email address/i);
      const emailInput = await screen.findByTestId('email');

      const sectionOneButton = screen.getByRole('button', { name: /next/i });

      expect(sectionOneButton).toBeInTheDocument();

      expect(firstName).toBeInTheDocument();
      expect(firstNameInput).toHaveValue('');
      expect(surname).toBeInTheDocument();
      expect(surnameInput).toHaveValue('');
      expect(email).toBeInTheDocument();
      expect(emailInput).toHaveValue('');
    });

    test('if Button is clicked it should show error message', async () => {
      render(
        <Provider store={store}>
          <SectionOne
            formStep={0}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const sectionOneButton = screen.getByRole('button', { name: /next/i });

      expect(sectionOneButton).toBeInTheDocument();

      fireEvent.click(sectionOneButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });

    test('if Button is clicked, and all fields are not valid expect error message', async () => {
      render(
        <Provider store={store}>
          <SectionOne
            formStep={0}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const sectionOneButton = screen.getByRole('button', { name: /next/i });
      const emailInput = await screen.findByTestId('email');

      expect(sectionOneButton).toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'bru@gee.com' } });
      expect(emailInput).toHaveValue('bru@gee.com');

      fireEvent.click(sectionOneButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });
  });

  describe('All Inputs are Valid', () => {
    test('Click button to progress to next stage', async () => {
      const { rerender } = render(
        <Provider store={store}>
          <SectionOne
            formStep={0}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const firstNameInput = await screen.findByTestId('first-name');
      const surnameInput = await screen.findByTestId('surname');
      const emailInput = await screen.findByTestId('email');
      const sectionOneButton = screen.getByRole('button', { name: /next/i });

      expect(sectionOneButton).toBeInTheDocument();

      fireEvent.change(firstNameInput, { target: { value: 'bru' } });
      fireEvent.change(surnameInput, { target: { value: 'john' } });
      fireEvent.change(emailInput, { target: { value: 'bru@gee.com' } });

      expect(firstNameInput).toHaveValue('bru');
      expect(surnameInput).toHaveValue('john');
      expect(emailInput).toHaveValue('bru@gee.com');

      fireEvent.click(sectionOneButton);

      const errormessage = screen.queryByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).not.toBeInTheDocument();

      rerender(
        <Provider store={store}>
          <SectionOne
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      expect(firstNameInput).not.toBeInTheDocument();
      expect(surnameInput).not.toBeInTheDocument();
      expect(emailInput).not.toBeInTheDocument();
    });
  });
  describe('FormStep Change', () => {
    test('Section One should only show header', async () => {
      render(
        <Provider store={store}>
          <SectionOne
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );
      const sectionOneDiv = screen.getByRole('button', {
        name: /step 1: your details/i,
      });
      const firstName = screen.queryByLabelText(/first name/i);
      const surname = screen.queryByLabelText(/surname/i);
      const email = screen.queryByLabelText(/email address/i);

      const sectionOneButton = screen.queryByRole('button', { name: /next/i });

      expect(sectionOneDiv).toBeInTheDocument();
      expect(sectionOneButton).not.toBeInTheDocument();

      expect(firstName).not.toBeInTheDocument();

      expect(surname).not.toBeInTheDocument();

      expect(email).not.toBeInTheDocument();
    });
  });
});
