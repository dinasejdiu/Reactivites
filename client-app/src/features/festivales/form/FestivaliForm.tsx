import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link , useHistory, useParams } from "react-router-dom";
import { Button ,Header,Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/storee";
import {v4 as uuid} from 'uuid';
import { Formik,Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Festivali } from "../../../app/models/festivali";
 

export default observer (function FestivaliForm(){
    const history = useHistory();
    const {festivaliStore} = useStore();
    const{createFestivali,updateFestivali,
    loading,loadFestivali,loadingInitial} = festivaliStore;
    const {id} = useParams <{id:string}>();

    const [festivali,setFestivali] = useState<Festivali>({
       id:'',
       vendi:'',
       vendi_Marrjes_Se_Biletes:'',
       date :null ,
       cmimi:'',
       kengetari:'',

    });

    const validationSchema = Yup.object({
     Vendi : Yup.string().required('The festival title is required'),
      Vendi_Marrjes_Se_Biletes : Yup.string().required('The festival description is required'),
      cmimi: Yup.string().required(),
      date : Yup.string().required('Date is required').nullable(),
      kengetari : Yup.string().required(),
      city : Yup.string().required(),
     
   
   
   })
    useEffect(() => {
        if (id) loadFestivali(id).then(festivali => setFestivali(festivali!))
    }, [id,  loadFestivali]);
    
 function handleFormSubmit(festivali: Festivali){
  if  (festivali.id.length === 0) {
    let newFestivali = {
        ...festivali,
        id: uuid()
      };
      createFestivali(newFestivali).then(() => history.push(`/festivales/ ${newFestivali.id}`))
  } else{
     updateFestivali(festivali).then(() => history.push(`/festivales/${festivali.id}`)) 
 }
   
}



if(loadingInitial) return <LoadingComponent content='Loading ...'/>

    return(
        <Segment clearing>
          <Header content='Me shume informata per festivalin' sub color='pink'/>
         <Formik
         validationSchema={validationSchema}
          enableReinitialize
          initialValues={festivali} 
          onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit,isValid,isSubmitting,dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput name='title' placeholder='Title'/>
                <MyTextArea rows={3} placeholder='Description' name='description' />
                <MySelectInput options={categoryOptions} placeholder='Cateogry' name='category' />
                <MyDateInput
                 placeholderText='Date' 
                 name='date' 
                 showTimeSelect
                 timeCaption='time'
                 dateFormat='MMM d, yyyy h:mm aa'
                 
                 />
              <Header content='Detajet rreth lokacionit' sub color='blue'/>
                <MyTextInput placeholder='City' name='city' />
                <MyTextInput placeholder='Venue' name='venue'/>
                <Button 
                disabled={isSubmitting ||  !dirty || !isValid}
                loading={loading} floated='right'
                 positive type ='submit' content='Shto' />
                <Button as={Link} to='/festivali' floated='right'  type ='button' content='Anulo'/>
            </Form>
            )}
            </Formik> 
        </Segment>
    )
}) 