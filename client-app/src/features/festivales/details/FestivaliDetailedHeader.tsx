import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'

import {format} from 'date-fns';
import { Festivali } from '../../../app/models/festivali';


const festivaliImageStyle = {
    filter: 'brightness(30%)'
};

const festivaliImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
   festivali: Festivali
}

export default observer (function FestivaliDetailedHeader({festivali}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${festivali.vendi}.jpg`} fluid style={festivaliImageStyle}/>
                <Segment style={festivaliImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={festivali.vendi_Marrjes_Se_Biletes}
                                    style={{color: 'white'}}
                                />
                                <p>{format(festivali.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='green'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${festivali.id}`}color='red' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})

