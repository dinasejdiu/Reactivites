import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function FestivaliFilters() {

    return (
        <>
        {/* <Menu vertical size ='large' style={{width:'100%',marginTop: 25 }}>

            <Header icon='filter' attached color ='green' content='Filters'/>
        <Menu.Item content='All Activities'/>
        <Menu.Item content="I'm going"/>
        <Menu.Item content="I'm hosting"/>
        </Menu> */}
        <Header/>
        <Calendar className="calendar-pak-ma-ndryshe-heheh"/>
        </>

    )
}