import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import {format} from 'date-fns';
import { Festivali } from '../../../app/models/festivali';
import axios from 'axios';

interface Props {
 festivali:Festivali
}

export default function FestivaliListItem({festivali}: Props) {
    const [v, setv] =  useState(false);
    return (
        <Segment.Group style={{
            display: v ? "none" : "auto"
        }}>
        
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                     <Item.Content>
                         <Item.Header as={Link} to={`/festivali/${festivali.id}`}>
                             {festivali.vendi}
                         </Item.Header>
                         <Item.Description>{festivali.vendi_Marrjes_Se_Biletes}</Item.Description>
                         <Item.Description>{festivali.kengetari}</Item.Description>
                     </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {format(festivali.date!,  'dd MMM yyyy h:mm aa')}
                    {/* <Icon name='marker'/> {festivali.vendi_Marrjes_se_Biletes} */}
                </span>
            </Segment>
            <Segment secondary>
                Cmimi : {festivali.cmimi}$
            </Segment>
            <Segment clearing>
                 {/* <span>{format(festivali.date!,  'dd MMM yyyy h:mm aa')} </span> */}
                <Button
                as={Link}
                to={`/festivali/${festivali.id}`}
                color='green'
                floated='right'
                content='View'
                />
                 <Button
                onClick={(e)=>{
                    e.preventDefault();
                    axios.delete('http://localhost:5000/api/festivali/'+festivali.id).then(()=>{
                        setv(true);
                    })
                }}
                color='red'
                floated='left'
                content='Delete'
                />
            </Segment>
      </Segment.Group>
        
    )
}