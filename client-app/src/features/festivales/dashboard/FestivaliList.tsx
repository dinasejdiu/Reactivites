import { observer } from "mobx-react-lite";
import { Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/storee";
import React, { Fragment } from "react";
import FestivaliListItem from "./FestivaliListItem";

export default  observer(function  FestivalesList(){
    
    const{festivaliStore} = useStore();
    const {groupedFestivales} = festivaliStore;


    return(
        <>
        {groupedFestivales.map(([group,festivales]) => (
            <Fragment key ={group}>
                <Header sub color='pink'>
                    {group}
                </Header>
              {festivales.map (festivali => (
            <FestivaliListItem key ={festivali.id} festivali={festivali} />
            ))}
           </Fragment>
        ))}
      </>
    )}
)