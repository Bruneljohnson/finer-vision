import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SectionTwo } from '../../components/Sections/';
import { store } from '../../store/store';

describe('<SectionTwo/>', () => {
  describe('Initial state', () => {
    test('Section Two should display black form', async () => {
      render(
        <Provider store={store}>
          <SectionTwo
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );
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
    });

    test('if Button is clicked it should show error message', async () => {
      render(
        <Provider store={store}>
          <SectionTwo
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const sectionTwoButton = screen.getByRole('button', { name: /next/i });

      expect(sectionTwoButton).toBeInTheDocument();

      fireEvent.click(sectionTwoButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });

    test('if Button is clicked, and all fields are not valid expect error message', async () => {
      render(
        <Provider store={store}>
          <SectionTwo
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const sectionTwoButton = screen.getByRole('button', { name: /next/i });
      const dayInput = await screen.findByTestId('day');

      expect(sectionTwoButton).toBeInTheDocument();

      fireEvent.change(dayInput, { target: { value: '01' } });
      expect(dayInput).toHaveValue(1);

      fireEvent.click(sectionTwoButton);

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
          <SectionTwo
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const telephoneInput = await screen.findByTestId('telephone-number');
      const genderInput = await screen.findByTestId('gender');
      const dayInput = await screen.findByTestId('day');
      const monthInput = await screen.findByTestId('month');
      const yearInput = await screen.findByTestId('year');
      const sectionTwoButton = screen.getByRole('button', { name: /next/i });

      expect(sectionTwoButton).toBeInTheDocument();

      fireEvent.change(telephoneInput, { target: { value: '01234567889' } });
      fireEvent.change(genderInput, { target: { value: 'male' } });
      fireEvent.change(dayInput, { target: { value: '01' } });
      fireEvent.change(monthInput, { target: { value: '01' } });
      fireEvent.change(yearInput, { target: { value: '1992' } });

      expect(telephoneInput).toHaveValue('01234567889');
      expect(genderInput).toHaveValue('male');
      expect(dayInput).toHaveValue(1);
      expect(monthInput).toHaveValue(1);
      expect(yearInput).toHaveValue(1992);

      fireEvent.click(sectionTwoButton);

      const errormessage = screen.queryByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).not.toBeInTheDocument();

      rerender(
        <Provider store={store}>
          <SectionTwo
            formStep={2}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      expect(telephoneInput).not.toBeInTheDocument();
      expect(genderInput).not.toBeInTheDocument();
      expect(dayInput).not.toBeInTheDocument();
      expect(monthInput).not.toBeInTheDocument();
      expect(yearInput).not.toBeInTheDocument();
    });
  });
  describe('FormStep Change', () => {
    test('Section Two should only show header', async () => {
      render(
        <Provider store={store}>
          <SectionTwo
            formStep={2}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );
      const sectionTwoDiv = screen.getByRole('button', {
        name: /step 2: more comments/i,
      });
      const telephone = screen.queryByLabelText(/telephone number/i);
      const gender = screen.queryByLabelText(/gender/i);
      const dob = screen.queryByLabelText(/date of birth/i);

      const sectionTwoButton = screen.queryByRole('button', { name: /next/i });

      expect(sectionTwoDiv).toBeInTheDocument();
      expect(sectionTwoButton).not.toBeInTheDocument();

      expect(telephone).not.toBeInTheDocument();

      expect(gender).not.toBeInTheDocument();

      expect(dob).not.toBeInTheDocument();
    });
  });
});
