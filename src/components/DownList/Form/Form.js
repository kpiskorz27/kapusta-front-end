import { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useMatchMedia } from '../../../hooks/use-match-media';
import DateSelection from '../../DateSelection/DateSelection';
import SelectCategory from '../SelectCategory/SelectCategory';
import CalculatorInput from '../CalculatorInput/CalculatorInput';
import { OrangeButton } from '../../Buttons/OrangeButton';
import {
  FormWrap,
  StyledForm,
  ButtonWrap,
  InputProduct,
  StyledAllInputsDiv,
  StyledWhiteButton,
} from './Form.styled';
import { addExpense, addIncome } from '../../../redux/auth/operations';
import { categoryEngToOrk } from '../../../hooks/useCategory';

export default function Form() {
  const [elementCategory, setElementCategory] = useState('Category');
  const [startDate, setStartDate] = useState(new Date());
  const location = useLocation();
  const form = useRef(null);
  const dispatch = useDispatch();
  const { isMobile } = useMatchMedia();

  let categoryArray;
  let functionToDispatch;
  if (location.pathname === '/home/income' || location.pathname === '/income') {
    categoryArray = ['Salary', 'Additional income'];
    functionToDispatch = addIncome;
  }
  if (location.pathname === '/home/expenses' || location.pathname === '/expenses') {
    categoryArray = [
      'Products',
      'Entertainment',
      'Health',
      'Transport',
      'Housing',
      'Technics',
      'Communal and communication',
      'Sport and hobby',
      'Education',
      'Other',
    ];
    functionToDispatch = addExpense;
  }
  const handleSubmit = event => {
    event.preventDefault();
    const { descr, sum } = event.target.elements;
    let transValue = sum.value;
    if (descr.value.trim() === '') {
      toast('Please enter a description');
      return;
    }
    if (elementCategory === 'Category') {
      toast('Please enter a category');
      return;
    }
    if (transValue.trim() === '') {
      toast('Please enter an amount');
      return;
    }
    if (transValue < 0) transValue = transValue * -1;

    const dataToDispatch = {
      description: descr.value,
      amount: Number(transValue),
      date: startDate.toISOString().split('T')[0],
      category: categoryEngToOrk(elementCategory),
    };
    dispatch(functionToDispatch(dataToDispatch));
    event.target.reset();
    setElementCategory('Category');
  };
  const handleReset = () => {
    form.current.reset();
  };

  return (
    <>
      <FormWrap>
        {!isMobile && (
          <div className="tabletDatepicker">
            <DateSelection startDate={startDate} setStartDate={setStartDate} />
          </div>
        )}
        <StyledForm onSubmit={handleSubmit} ref={form}>
          <StyledAllInputsDiv>
            <InputProduct placeholder="Product description" name="descr" />
            <SelectCategory
              categoryArray={categoryArray}
              elementCategory={elementCategory}
              setElementCategory={setElementCategory}
            />
            <CalculatorInput name="sum" />
          </StyledAllInputsDiv>
          <ButtonWrap>
            <OrangeButton type="submit">INPUT</OrangeButton>
            <StyledWhiteButton type="button" onClick={handleReset}>
              CLEAR
            </StyledWhiteButton>
          </ButtonWrap>
        </StyledForm>
      </FormWrap>
    </>
  );
}
