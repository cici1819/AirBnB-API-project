import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../../store/maps';
import SingleSpotMap from './SingleSpotMap';


const SingleSpotMapContainer = ({ spot }) => {
    const key = useSelector((state) => state.maps.key);
    // console.log('OneSpotMap component key-------------', key)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    return (
        <SingleSpotMap apiKey={key} spot={spot} />
    );
};

export default SingleSpotMapContainer;
