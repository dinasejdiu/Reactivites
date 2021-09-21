import React, { useEffect } from 'react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';

import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import {Container} from '@material-ui/core'
import FestivaliForm from '../../features/festivales/form/FestivaliForm';
import FestivaliDetails from '../../features/festivales/details/FestivaliDetails';
import FestivaliDashboard from '../../features/festivales/dashboard/FestivaliDashboard';
import MainForm from '../../features/kengetaries/components/MainForm';

function App() {
  const location = useLocation();
  const { commonStore , userStore } = useStore();

  useEffect(() => {

   if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());

   } else {
      commonStore.setAppLoaded();

   }
}, [commonStore , userStore])   

if (!commonStore.appLoaded) return<LoadingComponent content='Loading app...' />


  return (
   <> 
   <ToastContainer position='bottom-right' hideProgressBar/> 
   <ModalContainer/>
  <Route exact path='/' component={HomePage} />
   <Route
      path={'/(.+)'}
       render={() => (
          <>
       <NavBar /> 
          <Container style={{marginTop:'7em'}}>
           <Switch>
           <Route  exact path='/activities' component={ActivityDashboard} />
           <Route path='/activities/:id' component={ActivityDetails} />
           <Route key ={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm} />

           <Route  exact path='/festivali' component={FestivaliDashboard} />
           <Route path='/festivali/:id' component={FestivaliDetails} />
           <Route key ={location.key} path={['/createFestivali','/manage/:id']} component={FestivaliForm} />
        
          
             
           <Route path='/errors' component={TestErrors}/>
           <Route path='/server-error' component={ServerError}/>
           <Route path='/login' component={LoginForm}/>
           <Route path='/kengetari' component={MainForm}/>
           
              </Switch>
    </Container>
          </>
       )}
       />
       </>
  );
       }

  


export default observer(App);



