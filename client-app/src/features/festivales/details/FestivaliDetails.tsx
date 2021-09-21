import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import {  Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/storee";
import FestivaliDetailedChat from "./FestivaliDetailedChat";
import FestivaliDetailedHeader from "./FestivaliDetailedHeader";
import FestivaliDetailedInfo from "./FestivaliDetailedInfo";
import FestivaliDetailedSidebar from "./FestivaliDetailedSidebar";


export default observer(function FestivaliDetails() {
  const{festivaliStore} = useStore();
  const {selectedFestivali:festivali,loadFestivali,loadingInitial} = festivaliStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadFestivali(id);
  }, [id, loadFestivali]); 


if (loadingInitial || !festivali) return <LoadingComponent/>;

return (
      <Grid>
        <Grid.Column width={10}>
        <FestivaliDetailedHeader festivali={festivali} />
        <FestivaliDetailedInfo festivali={festivali} />
        <FestivaliDetailedChat/>
        </Grid.Column>
        <Grid.Column width={6}>
          <FestivaliDetailedSidebar/>
        </Grid.Column>
      </Grid>
    )
    
    } 
    )
  