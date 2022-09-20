// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import * as spotsActions from "./store/spots";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots";
import SingleSpot from "./components/SingleSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const spots = useSelector(state => state.spots.allSpots)
  // const spot = useSelector(state=>state.spots.spot)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(spotsActions.getAllSpots());
    // dispatch(spotsActions.getOneSpot("1"));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
          <Spots />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route  path="/spots/:spotId">
            <SingleSpot />
            </Route>
          <Route  path="/spots">
          <Spots />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
