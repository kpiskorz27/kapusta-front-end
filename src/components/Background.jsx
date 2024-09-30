import s from '../assets/styles/Background.module.css';
import kapustaText from '../images/union.svg';
import Container from './Container';
import Header from './Header';

const Background = ({ children }) => {
  return (
    <Container>
      <Header />
      <div className={s.loginSectionWrapper}>
        <div className={s.mainTextWrapper}>
          <img src={kapustaText} alt="Kapusta" />
          <h2 className={s.loginSectionText}>Smart Finance</h2>
        </div>
        <div>{children}</div>
      </div>
    </Container>
  );
};

export default Background;
