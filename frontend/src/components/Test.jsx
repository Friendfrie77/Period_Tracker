import Datestrip from './Datestrip';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from './Spinner';

const Test = () => {    
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
    const calendar = (
      <Spinner />
    )
    return calendar
}

export default Test
