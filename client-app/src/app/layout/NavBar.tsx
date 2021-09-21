import { observer } from 'mobx-react-lite';
import  React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu ,Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
 const {userStore: {user, logout}} = useStore();
 useEffect(() => {
    console.log(user);
 })
    return(
       <Menu inverted fixed='top'> 
          <Container>
             <Menu.Item as={NavLink} to='/' exact header>
           <img src="/assets/1.jpeg" alt="logo" style={{marginRight:'10px'}}/>
        Aktivitetet 
          </Menu.Item> 
          <Menu.Item  as={NavLink} to='/activities' name ='Aktivitetet'/>
          <Menu.Item  as={NavLink} to='/errors' name ='Errors'/>
          <Menu.Item  as={NavLink} to='/festivali' name ='Festivali'/>
          <Menu.Item  as={NavLink} to='/kengetari' name ='Kengetari'/>
          
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Krijo nje Aktivitet' />
                     </Menu.Item>
                     <Menu.Item position='right'>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={user?.displayName}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/${user?.username}`} 
                            text='Profili' icon='user' />
                        <Dropdown.Item onClick={logout} text='Dilni' icon='power' />
                     </Dropdown.Menu>
                    </Dropdown>
               </Menu.Item>
           </Container>
        </Menu>
    )
})