import React, { useContext, useEffect } from "react";
import { TeamsFxContext } from "../Context";
import { useData } from '@microsoft/teamsfx-react';
import { CardHeader, CardBody, CardFooter, Card, Flex, Text, itemLayoutClassName, commonPropTypes } from "@fluentui/react-northstar";
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import {  Stack } from '@fluentui/react/lib/Stack';
import { CompChart } from "./CompChart";
import "./CompAPI.css";
import { CompanyData } from "./dataInterfaces";



export function CompAPI(){


    const [compMessage, setMessage] = React.useState<CompanyData[]>([])
    // 
    // Every time that the application is rendered the API is called and returns
    // a JSON object that will will be displayed in cards and charts
    // the API is only called once and then Data is stored in Session storage
    useEffect(() => {
        const compSessionStorage = window.sessionStorage.getItem("CompValues");
        if(compSessionStorage){
            setMessage(JSON.parse(compSessionStorage))
        }else{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };
        fetch('https://oslometazurefunctions.azurewebsites.net/api/GetCompData?', requestOptions)
        .then(response => response.json())
        .then(data =>{setMessage(data)
             window.sessionStorage.setItem("CompValues", JSON.stringify(data))
             console.log(data)
             console.log(data.company, data.compCO2OneDrive) }) 
        .catch(error => console.error(error))
    }
    },[])

     if(compMessage.length <= 0){
          return (
         <div>
         <Spinner label="Loading..." size={SpinnerSize.large} />
       </div>
         )
     }

    return (
        <div className="compMaindiv">
        <div className="Cards">
        <h2>Welcome to your Digital Sustainability Agent!</h2>
        <p>This page shows the Microsoft 365 report from last week for tenant: <strong>{compMessage.map(item => item.company)}</strong></p>
        <h3>Your Report:</h3>
            <Flex gap ='gap.small'>
                <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by OneDrive" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                   {compMessage.map(item =>
                    <p  style={{ fontSize: "20px", color: item.compCO2OneDrive > 4000 ? "red" : item.compCO2OneDrive <= 4000 ? "green" : "" }}>
                        {(item.compCO2OneDrive).toFixed(2)} grams of CO2 from {item.compOneDriveFiles} stored files that take up {(item.compTotalDriveSize).toFixed(2)} GB.
                    </p>)}
                </CardBody>
                </Card>
                </div>
                <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="Consider removing..." weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                   {compMessage.map(item =>
                    <p style={{fontSize: "20px"}}>{item.company} has {item.compOneDriveFiles-item.compOneDriveActiveFiles} old and inactive files in its total OneDrive storage.  
                    </p>)}
                </CardBody>
                </Card>
                </div>
                <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by Outlook" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p  style={{ fontSize: "20px", color: item.compCO2Outlook > 4000 ? "red" : item.compCO2Outlook <= 4000 ? "green" : "" }}>
                            {(item.compCO2Outlook).toFixed(2)} grams of CO2 from {item.compTotalEmailsSent} mails sent and {item.compTotalInboxMail} mails received this week.
                        </p>
                    )) }
                </CardBody>
                </Card>
                </div>
                </Flex>
                <Flex gap="gap.small">
                <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by Teams Audio Calls" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p  style={{ fontSize: "20px", color: item.compTeamsAudioCO2 > 4000 ? "red" : item.compTeamsAudioCO2 <= 4000 ? "green" : "" }}>
                            {(item.compTeamsAudioCO2).toFixed(2)} grams of CO2 in {(Math.round(item.compTeamsAudioDuration) / 60)} minutes of voice calls this week.
                        </p>
                    )) }
                </CardBody>
                </Card>
                </div>
             <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by Teams Video Calls" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p  style={{ fontSize: "20px", color: item.compTeamsVideoCO2 > 4000 ? "red" : item.compTeamsVideoCO2 <= 4000 ? "green" : "" }}>
                            {(item.compTeamsVideoCO2).toFixed(2)} grams of CO2 in {Math.round((item.compTeamsVideoDuration) / 60)} minutes of video calls this week.
                        </p>
                    )) }
                </CardBody>
                </Card> 
                </div>
                <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by Teams Screenshare Calls" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p  style={{ fontSize: "20px", color: item.compTeamsScreenShareCO2 > 4000 ? "red" : item.compTeamsScreenShareCO2 <= 4000 ? "green" : "" }}>
                            {(item.compTeamsScreenShareCO2).toFixed(2)} grams of CO2 in {Math.round((item.compTeamsScreenshareDuration) / 60)} minutes screensharing this week.
                        </p>
                    )) }
                </CardBody>
                </Card>
                </div>
                </Flex>
                <Flex gap="gap.small">
                <div>
                <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by Teams Screenshare Calls" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p style={{ fontSize: "20px", color: item.compTeamsScreenShareCO2 > 4000 ? "red" : item.compTeamsScreenShareCO2 <= 4000 ? "green" : "" }}>
                            {item.company}'s Total SharePoint size, {(item.SharePointTotalSizeMB / 1000).toFixed(2)} GB, produced a total of {item.compCO2SharePoint} grams of CO2 this week. 
                        </p>
                    ))}
                </CardBody>
                </Card>
                </div>
                 <div>
            <Card aria-roledescription='card avatar'
            
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Teams activity" weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p style={{ fontSize: "20px"}}>
                        {item.company} has had {item.compTeamsCallCount} calls, {item.compTeamsMeetingCount} meetings and sent {item.compTeamsChatMessageCount} public messages since last report.
                        </p>
                    ))}
                </CardBody>
                <CardFooter fitted={true}>
                <form action="https://www.cibotechnologies.com/blog/calculating-the-carbon-footprint-of-zoom-meetings/#:~:text=The%20audio%2Donly%20calls%20would,emit%202.8%20kg%20of%20CO2/" method="get" target="_blank">
         <button type="submit">Learn more</button>
      </form>
                </CardFooter>
            </Card>
            
        </div>
                 <div>
                 <Card aria-roledescription="card avatar"
                styles={{height:"280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="Total CO2 produced this week" weight="bold" size="large"/>
                    </CardHeader>
                <CardBody>
                    {compMessage.map(item =>(
                        <p style={{fontSize:"20px", color: (item.compTeamsVideoCO2 +
                        item.compCO2OneDrive +
                        item.compCO2Outlook +
                        item.compTeamsAudioCO2 +
                        item.compTeamsScreenShareCO2 +
                        item.compCO2SharePoint) / 1000 > 50 ? "red" :  (item.compTeamsVideoCO2 +
                        item.compCO2OneDrive +
                        item.compCO2Outlook +
                        item.compTeamsAudioCO2 +
                        item.compTeamsScreenShareCO2 +
                        item.compCO2SharePoint) / 1000 < 50 ? "green" : ""}}>
                           {item.company} has produced a total of {(Math.round(item.compTeamsVideoCO2 +
                            item.compCO2OneDrive +
                            item.compCO2Outlook +
                            item.compTeamsAudioCO2 +
                            item.compTeamsScreenShareCO2 +
                            item.compCO2SharePoint) / 1000 ).toFixed(2) } kg of CO2 since last report.
                        </p>
                    ))}
                </CardBody>
                </Card>
                 </div>
                </Flex> 
            </div>
        <div className='Charts-comp'>
        
            {compMessage.length>=0 && sessionStorage != null && <CompChart arr={compMessage}/>}
        </div>
    </div>
    );
};