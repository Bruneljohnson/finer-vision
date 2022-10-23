import {
  formReducer,
  setComments,
  setDOB,
  setEmail,
  setFirstName,
  setGender,
  setSectionOneValid,
  setSectionThreeValid,
  setSectionTwoValid,
  setSurname,
  setTelPhone,
  clearSlice,
} from '../../store/FormSlice/FormSlice';
import { IFormContext } from '../../store/FormSlice/FormSlice.model';

describe('FormSlice reducer', () => {
  let initialState: IFormContext;
  beforeEach(() => {
    initialState = {
      sectionOneValid: false,
      sectionTwoValid: false,
      sectionThreeValid: false,
      firstName: '',
      surname: '',
      email: '',
      telPhone: '',
      gender: '',
      dob: '',
      comments: '',
    };
  });

  it('Test initial state', () => {
    expect(formReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Test setFirstName()', () => {
    const formSliceMock = formReducer(initialState, setFirstName('john'));
    expect(formSliceMock.firstName).toEqual('john');
  });

  it('Test setSurname()', () => {
    const formSliceMock = formReducer(initialState, setSurname('lee'));
    expect(formSliceMock.surname).toEqual('lee');
  });

  it('Test setEmail()', () => {
    const formSliceMock = formReducer(
      initialState,
      setEmail('john.lee@game.uk')
    );
    expect(formSliceMock.email).toEqual('john.lee@game.uk');
  });

  it('Test setDOB()', () => {
    const formSliceMock = formReducer(initialState, setDOB('2001-02-22'));
    expect(formSliceMock.dob).toEqual('2001-02-22');
  });

  it('Test setComments()', () => {
    const formSliceMock = formReducer(
      initialState,
      setComments('john lee is from chicago,usa.')
    );
    expect(formSliceMock.comments).toEqual('john lee is from chicago,usa.');
  });

  it('Test setGender()', () => {
    const formSliceMock = formReducer(initialState, setGender('male'));
    expect(formSliceMock.gender).toEqual('male');
  });
  it('Test setTelPhone()', () => {
    const formSliceMock = formReducer(initialState, setTelPhone('07930333300'));
    expect(formSliceMock.telPhone).toEqual('07930333300');
  });

  it('Test setSectionOneValid()', () => {
    const formSliceMock = formReducer(initialState, setSectionOneValid(true));
    expect(formSliceMock.sectionOneValid).toEqual(true);
  });

  it('Test setSectionTwoValid()', () => {
    const formSliceMock = formReducer(initialState, setSectionTwoValid(true));
    expect(formSliceMock.sectionTwoValid).toEqual(true);
  });

  it('Test setSectionThreeValid()', () => {
    const formSliceMock = formReducer(initialState, setSectionThreeValid(true));
    expect(formSliceMock.sectionThreeValid).toEqual(true);
  });

  it('Test clearSlice()', () => {
    const formSliceMock = formReducer(initialState, clearSlice());
    expect(formSliceMock.firstName).toEqual('');
    expect(formSliceMock.surname).toEqual('');
    expect(formSliceMock.email).toEqual('');
    expect(formSliceMock.gender).toEqual('');
    expect(formSliceMock.telPhone).toEqual('');
    expect(formSliceMock.dob).toEqual('');
    expect(formSliceMock.comments).toEqual('');
    expect(formSliceMock.sectionOneValid).toEqual(false);
    expect(formSliceMock.sectionTwoValid).toEqual(false);
    expect(formSliceMock.sectionThreeValid).toEqual(false);
  });
});
