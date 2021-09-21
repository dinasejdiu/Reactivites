import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Festivali} from "../../../app/models/festivali";
import {format} from 'date-fns';


interface Props {
    festivali: Festivali
}

export default observer(function FestivaliDetailedInfo({festivali}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='green' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{festivali.vendi}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='green'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
            <span>
              {format(festivali.date!, 'dd MMM yyyy h:mm aa')}
            </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='green'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{festivali.vendi_Marrjes_Se_Biletes}, {festivali.kengetari}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})