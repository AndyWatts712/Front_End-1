import React, { useEffect, useState } from 'react';
import { Switch, Link, Route, useHistory } from 'react-router-dom'
import SignInSide from './material-ui/SignInSide';

import {axiosWithAuth} from './utils/axiosWithAuth'

//context
import {UserContext} from './context/UserContext';
import {PlantContext} from './context/PlantContext';

//components
import {
  PrivateRoute, AddPlant, EditPlant, EditUser, Register, Plantlanding, Header
} from './components'
import UserProfile from './components/UserProfile';

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [plantList, setPlants] = useState([]);
  const [plantId, setId] = useState('');
  const history = useHistory();

    useEffect(() => {
        axiosWithAuth()
            .get('https://watermyplantsdatabase.herokuapp.com/myinfo') 
            .then(res => {
                setUserInfo(res.data);
                setPlants(res.data.plants);
            })
            .catch(err => {
                console.log(err)
            })
    }, []); 


    const logoutUser = () => {
      localStorage.clear();
      history.push('/signin');
    }

  return (
    <div className="App">
      <div className='nav-links'>
        {/* <a href="https://cranky-hypatia-e034a5.netlify.app/">Home</a> */}
        {/* <Link to='/register'>Register</Link>
        <Link to='/private/user'>User Profile</Link>
        <Link to="/">Plant Dashboard</Link> */}
        <Header logout={logoutUser}/>
        {/* <button onClick={() => logoutUser()}>Logout</button> */}
      </div>

      {/* Switch for endpoints */}
      <Switch>
        <Route exact path='/register' component={Register}/>
          {/* <Register inputChange={inputChange}/> */}
        {/* <Route exact path='/userprofile' component={UserProfile}/> */}

        <UserContext.Provider value={{userInfo, setUserInfo, plantList, setPlants}}>
          <Route exact path='/signin'  component={SignInSide}/>
          <PrivateRoute exact path = "/private/user" component={UserProfile} />
          <PrivateRoute exact path ="/private/edituser" component={EditUser} />
          <PrivateRoute exact path = "/private/addplant" component={AddPlant} />
          <PlantContext.Provider value={{plantId, setId}}>
          <PrivateRoute exact path ="/" component={Plantlanding} />
          <PrivateRoute exact path ="/private/editplant" component={EditPlant} />
          </PlantContext.Provider>
        </UserContext.Provider>

      </Switch>
    </div>
  );
}

export default App;
