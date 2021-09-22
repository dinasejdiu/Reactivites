import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import {  Grid} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/storee";
import FestivaliDetailedInfo from "./FestivaliDetailedInfo";


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
        <FestivaliDetailedInfo festivali={festivali} />
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    )
    
    } 
    )
  