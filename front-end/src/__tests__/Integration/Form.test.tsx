import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Form } from '../../components/Sections/';
import { store } from '../../store/store';

describe('<Form/>', () => {
  describe('Initial state', () => {
    test('Section One should be open', async () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );
      const firstName = screen.getByLabelText(/first name/i);
      const firstNameInput = await screen.findByTestId('first-name');

      const surname = screen.getByLabelText(/surname/i);
      const surnameInput = await screen.findByTestId('surname');

      const email = screen.getByLabelText(/email address/i);
      const emailInput = await screen.findByTestId('email');

      const sectionButton = screen.getByRole('button', { name: /next/i });

      expect(sectionButton).toBeInTheDocument();

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
          <Form />
        </Provider>
      );

      const sectionButton = screen.getByRole('button', { name: /next/i });

      expect(sectionButton).toBeInTheDocument();

      fireEvent.click(sectionButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });

    test('if Button is clicked, and all fields are not valid expect error message', async () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );

      const sectionButton = screen.getByRole('button', { name: /next/i });
      const emailInput = await screen.findByTestId('email');

      expect(sectionButton).toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'bru@gee.com' } });
      expect(emailInput).toHaveValue('bru@gee.com');

      fireEvent.click(sectionButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });
  });

  describe('Other Sections', () => {
    test('Sections 2 & 3 should be collapsed', async () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );
      const telephone = screen.queryByLabelText(/telephone number/i);
      const telephoneInput = screen.queryByTestId('telephone-number');
      const sectionTwoDiv = screen.getByRole('button', {
        name: /step 2: more comments/i,
      });

      const comments = screen.queryByLabelText(/comments/i);
      const commentsInput = screen.queryByTestId('comments');
      const sectionThreeDiv = screen.getByRole('button', {
        name: /step 3: final comments/i,
      });

      expect(sectionTwoDiv).toBeInTheDocument();
      expect(sectionThreeDiv).toBeInTheDocument();
      expect(commentsInput).not.toBeInTheDocument();
      expect(comments).not.toBeInTheDocument();
      expect(telephoneInput).not.toBeInTheDocument();
      expect(telephone).not.toBeInTheDocument();
    });

    test('Click on Section 2', async () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );
      const sectionTwoDiv = screen.getByRole('button', {
        name: /step 2: more comments/i,
      });

      fireEvent.click(sectionTwoDiv);

      const telephone = screen.getByLabelText(/telephone number/i);
      const telephoneInput = await screen.findByTestId('telephone-number');

      const gender = screen.getByLabelText(/gender/i);
      const genderInput = await screen.findByTestId('gender');

      const dob = screen.getByLabelText(/date of birth/i);
      const dayInput = await screen.findByTestId('day');
      const monthInput = await screen.findByTestId('month');
      const yearInput = await screen.findByTestId('year');

      const sectionTwoButton = screen.getByRole('button', { name: /next/i });

      expect(sectionTwoButton).toBeInTheDocument();

      expect(telephone).toBeInTheDocument();
      expect(telephoneInput).toHaveValue('');
      expect(gender).toBeInTheDocument();
      expect(genderInput).toHaveValue('Select Gender');
      expect(dob).toBeInTheDocument();
      expect(dayInput).toHaveValue(null);
      expect(monthInput).toHaveValue(null);
      expect(yearInput).toHaveValue(null);

      fireEvent.click(sectionTwoButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });

    test('Click on Section 3', async () => {
      render(
        <Provider store={store}>
          <Form />
        </Provider>
      );

      const sectionThreeDiv = screen.getByRole('button', {
        name: /step 3: final comments/i,
      });

      fireEvent.click(sectionThreeDiv);
      const comments = screen.getByLabelText(/comments/i);
      const commentsInput = await screen.findByTestId('comments');

      const sectionThreeButton = screen.getByRole('button', { name: /next/i });

      expect(sectionThreeButton).toBeInTheDocument();

      expect(comments).toBeInTheDocument();
      expect(commentsInput).toHaveValue('');

      fireEvent.click(sectionThreeButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });
  });
});
