import { Rings } from 'react-loader-spinner';
import s from '../assets/styles/Loader.module.css';

const Loader = () => {
  return (
    <div className={s.container}>
      <Rings
        height="250"
        width="250"
        visible={true}
        color="#ff751d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
