import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/storee";

import FestivaliFilters from "./FestivaliFilters";
import FestivaliList from "./FestivaliList";


export default observer (function FestivaliDashboard() {
    const{festivaliStore} = useStore();
    const {loadFestivales,festivaliRegistry} = festivaliStore;



       useEffect(() => {
        if ( festivaliRegistry.size <= 1) loadFestivales();
        }, [festivaliRegistry.size, loadFestivales ])

if(festivaliStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>


    return( 
        <Grid>
            <Grid.Column width ='10'>
             <FestivaliList />
       </Grid.Column>
       <Grid.Column width='6'>
          <FestivaliFilters/>
       </Grid.Column>
    </Grid>

    )
})