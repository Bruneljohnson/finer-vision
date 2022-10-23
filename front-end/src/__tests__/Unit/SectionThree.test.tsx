import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SectionThree } from '../../components/Sections/';
import { store } from '../../store/store';

describe('<SectionThree/>', () => {
  describe('Initial state', () => {
    test('Section Three should display black form', async () => {
      render(
        <Provider store={store}>
          <SectionThree
            formStep={2}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );
      const comments = screen.getByLabelText(/comments/i);
      const commentsInput = await screen.findByTestId('comments');

      const sectionThreeButton = screen.getByRole('button', { name: /next/i });

      expect(sectionThreeButton).toBeInTheDocument();

      expect(comments).toBeInTheDocument();
      expect(commentsInput).toHaveValue('');
    });

    test('if Button is clicked it should show error message', async () => {
      render(
        <Provider store={store}>
          <SectionThree
            formStep={2}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const sectionThreeButton = screen.getByRole('button', { name: /next/i });

      expect(sectionThreeButton).toBeInTheDocument();

      fireEvent.click(sectionThreeButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });

    test('if Button is clicked, and all fields are not valid expect error message', async () => {
      render(
        <Provider store={store}>
          <SectionThree
            formStep={2}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const sectionThreeButton = screen.getByRole('button', { name: /next/i });
      const commentsInput = await screen.findByTestId('comments');

      expect(sectionThreeButton).toBeInTheDocument();

      fireEvent.change(commentsInput, {
        target: {
          value: 'co',
        },
      });
      expect(commentsInput).toHaveValue('co');

      fireEvent.click(sectionThreeButton);

      const errormessage = await screen.findByText(
        /Please fill out form correctly/i
      );

      expect(errormessage).toBeInTheDocument();
    });
  });

  describe('All Inputs are Valid', () => {
    test('Click button to shows error message if other sections are not complete', async () => {
      render(
        <Provider store={store}>
          <SectionThree
            formStep={2}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );

      const commentsInput = await screen.findByTestId('comments');
      const sectionThreeButton = screen.getByRole('button', { name: /next/i });

      expect(sectionThreeButton).toBeInTheDocument();

      fireEvent.change(commentsInput, { target: { value: 'bru' } });

      expect(commentsInput).toHaveValue('bru');

      fireEvent.click(sectionThreeButton);

      const errormessage = screen.queryByText(
        /Please fill out form correctly/i
      );

      const submitBtn = screen.queryByRole('button', { name: /sumbit/i });

      expect(errormessage).toBeInTheDocument();
      expect(sectionThreeButton).toBeInTheDocument();
      expect(submitBtn).not.toBeInTheDocument();
    });
  });
  describe('FormStep Change', () => {
    test('Section Three should only show header', async () => {
      render(
        <Provider store={store}>
          <SectionThree
            formStep={1}
            onClearEntries={() => {}}
            onFormSteps={() => {}}
            onSection={() => {}}
          />
        </Provider>
      );
      const sectionThreeDiv = screen.getByRole('button', {
        name: /step 3: final comments/i,
      });

      const comments = screen.queryByLabelText(/comments/i);

      const sectionThreeButton = screen.queryByRole('button', {
        name: /next/i,
      });

      expect(sectionThreeDiv).toBeInTheDocument();
      expect(sectionThreeButton).not.toBeInTheDocument();
      expect(comments).not.toBeInTheDocument();
    });
  });
});
