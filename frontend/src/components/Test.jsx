import Datestrip from './Datestrip';
import { useDispatch,useSelector } from 'react-redux';

const Test = () => {    
  const periodEndDate = useSelector((state) => state.periodEndDate)
  const periodStartDate = useSelector((state) => state.periodStartDate)
    const calendar = (
      <div className='page-wrapper'>
            <Datestrip
                startValue = {periodStartDate}
                endValue = {periodEndDate}
            />
      </div>
    )
    return calendar
}

export default Test
