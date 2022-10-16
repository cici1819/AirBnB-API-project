
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as spotsActions from "../../store/spots";


function DeleteSpot() {
  const spot = useSelector(state => state.spots.spot);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async e => {
    e.preventDefault();

    const deleteSpot = await dispatch(spotsActions.removeSpot(spot.id));
    if(deleteSpot) {
      history.push('/spots/current');
    }
  }

  return (
    <button className='delete-button' onClick={handleDelete}>Delete Spot</button>
  )
}

export default DeleteSpot;