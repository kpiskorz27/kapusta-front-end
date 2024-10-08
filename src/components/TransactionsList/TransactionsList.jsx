import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../images/deleteIcon.svg";
import { selectAllTransactions } from "../../redux/slices/selectorsM";
import { deleteTransaction } from "../../redux/auth/operations";
import { categoryArray } from "../../hooks/useCategory";
import {
  ItemName,
  ItemNameCont,
  ItemDate,
  ItemDateCont,
  ItemStyled,
  ItemCategory,
  Sum,
  SumCont,
  StyledList,
} from "./TransactionsList.styled";

export const TransactionsList = () => {
  const allTransactions = useSelector(selectAllTransactions);

  const dispatch = useDispatch();
  const sortedTransactions = allTransactions.slice().sort((a, b) => {
    const first = new Date(a.date).getTime();
    const second = new Date(b.date).getTime();
    if (first - second === 0) {
      return first;
    }
    return second - first;
  });
  const handleDelete = (event) => {
    dispatch(deleteTransaction(event.currentTarget.id));
  };

  return (
    <StyledList className="container">
      {sortedTransactions.slice(0, 15).map((item) => {
        const { _id, description, amount, date, category } = item;
        let color;
        let minus = false;
        if (category === "n/d" || category === "Additional income") {
          color = "green";
        } else {
          color = "red";
          minus = "-";
        }

        return (
          <ItemStyled key={_id}>
            <ItemNameCont>
              <ItemName>{description}</ItemName>
              <ItemDateCont>
                <ItemDate>{date.split("-").reverse().join(".")}</ItemDate>
                <ItemCategory>{categoryArray(category)}</ItemCategory>
              </ItemDateCont>
            </ItemNameCont>
            <SumCont>
              <Sum style={{ color }} className="sum">
                {minus} {amount}.00 PLM.
              </Sum>
              <span
                id={_id}
                onClick={handleDelete}
                style={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </span>
            </SumCont>
          </ItemStyled>
        );
      })}
    </StyledList>
  );
};
