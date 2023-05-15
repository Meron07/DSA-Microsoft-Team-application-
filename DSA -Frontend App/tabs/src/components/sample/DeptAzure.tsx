import React, {useContext, useEffect, useState } from 'react';
import App from '../App';
import { Card, CardBody, CardFooter, CardHeader, Flex, Text} from '@fluentui/react-northstar';
import { TeamsFxContext } from '../Context';
import { useData } from '@microsoft/teamsfx-react';
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { TeamsFxProvider } from '@microsoft/mgt-teamsfx-provider';
import { BearerTokenAuthProvider, createApiClient, TeamsUserCredential } from '@microsoft/teamsfx';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { DeptChart } from './DeptChart';
import "./DeptAzure.css";
import { Mydata, DeptData } from './dataInterfaces';

//This section defines the DeptAzure component, which is a functional component. 
// And also defines for serveral state variables using useState and Mydata and Deptdata. 


export function DeptAzure(){
    const [deptName, setDeptName] = React.useState('');
    const [message, setMessage] = React.useState<Mydata[]>([]);
    const [messageDept, setMessageDept] = React.useState<DeptData[]>([]);
    
//This section uses the userContext  to get the teamsUserCredential from the 
// TeamsFxContext. it also uses the userGraphwithCredential  to load the user's 
// profile.department infromation from the Microsoft Graph API, it sets the userName variable 
//based on whether the loading or error flags

    const { teamsUserCredential } = useContext(TeamsFxContext);
    const { loading, data, error, reload } = useGraphWithCredential(
        async (graph, teamsUserCredential, scope) => {
            const profile = await graph.api("/me").select('department').get();
            if(TeamsUserCredential){
                setDeptName(profile.department);
            }
            const provider = new TeamsFxProvider(teamsUserCredential, scope);
            Providers.globalProvider = provider;
            Providers.globalProvider.setState(ProviderState.SignedIn);
            return profile;
        },
        { scope: ["User.Read"], credential: teamsUserCredential }
    );
    

    // The useEffect that gets called after the components has been mounted or updated 
    // and then getting the DeptValues data from browser's session storage
    //'if(deptsessionStorage)' if DeptValues is found in the session storage, we will parse the data
    //and set the state of the compenents "messageDept" variables
    //if "DeptValues" is not found in the session storage, we'll check if "deptName" is available
    // then we'll create a request options object with the method, headers and body for the POST request. 
useEffect(() => {
    const deptSessionStorage = window.sessionStorage.getItem("DeptValues");
    if(deptSessionStorage){
        setMessageDept(JSON.parse(deptSessionStorage))
    }else{
    if(deptName){
        const requestOptions = {
            method: "POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({deptName: deptName})
        };
        fetch(`https://oslometazurefunctions.azurewebsites.net/api/GetDeptData?code=s69n0paO-wjlvN05GlSDGAytdljW0cLe_C-B-xtcwkd1AzFuqcXRxA==`, requestOptions)
        .then(response => response.json())
        .then(data=>{setMessageDept(data)
            window.sessionStorage.setItem("DeptValues", JSON.stringify(data))
        console.log(data)})

        .catch(error => console.error(error));
    }
}
}, [deptName]);

if (messageDept.length <= 0) {
    return (
        <div>
        <Label>Spinner with label positioned below</Label>
        <Spinner label="Loading..." size={SpinnerSize.large} />
      </div>
    )
  }
    return (
      
       <div className="DepMaindiv">
        {reload}
        <div className='Cards'>
        <h2>Welcome to your Digital Sustainability Agent!</h2>
        <p>This page shows the Microsoft 365 report from last week for department: <strong>{deptName}</strong></p>
        <h3>Your Report:</h3>
        
    {/* in this section we'll create a card that displays the data */}
        <Flex gap='gap.small'>
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by OneDrive storage" weight='bold' size='large'/>
                </CardHeader>
                <CardBody>
                    {messageDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptCO2OneDrive > 50 ? "red" : item.deptCO2OneDrive <= 50 ? "green" : "" }}>
                            {(item.deptCO2OneDrive).toFixed(2)} grams of CO2 from {item.deptOneDriveFiles} stored files that take up {(item.deptTotalDriveSize).toFixed(2)} megabytes.
                        </p>
                    ))}
                </CardBody>      
            </Card>
        </div>
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Consider removing..." weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {messageDept.map(item =>(
                        <p style={{fontSize:"20px"}}>
                        Your department has {item.deptOneDriveFiles-item.deptOneDriveActiveFiles} old and inactive files in its OneDrive storage.
                        </p>
                    ))}
                </CardBody>
            </Card>
        </div>
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by Outlook" weight='bold' size='large'/>
                </CardHeader>
                <CardBody>
                    {messageDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptCO2Outlook > 50 ? "red" : item.deptCO2Outlook <= 50 ? "green" : "" }}>
                            {item.deptCO2Outlook} grams of CO2 from {item.deptTotalEmailsSent} mails sent and {item.deptTotalInboxMail} mails received this week.
                        </p>
                    ))}
                </CardBody>      
            </Card>
        </div>
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by Teams audio calls" weight='bold' size='large'/>
                </CardHeader>
                <CardBody>
                    {messageDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptTeamsAudioCO2 > 50 ? "red" : item.deptTeamsAudioCO2 <= 50 ? "green" : "" }}>
                            {item.deptTeamsAudioCO2} grams of CO2 in {item.deptTeamsAudioDuration} seconds of voice calls this week.
                        </p>
                    ))}
                </CardBody>      
            </Card>
        </div>
        </Flex>
        <Flex gap='gap.small'>
       
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by Teams video calls" weight='bold' size='large'/>
                </CardHeader>
                <CardBody>
                    {messageDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptTeamsVideoCO2 > 50 ? "red" : item.deptTeamsVideoCO2 <= 50 ? "green" : "" }}>
                            {item.deptTeamsVideoCO2} grams of CO2 in {item.deptTeamsVideoDuration} seconds of video calls this week.                               
                        </p>
                    ))}
                </CardBody>      
            </Card>
        </div>
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by Teams screenshare" weight='bold' size='large'/>
                </CardHeader>
                <CardBody>
                    {messageDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptTeamsScreenShareCO2 > 50 ? "red" : item.deptTeamsScreenShareCO2 <= 50 ? "green" : "" }}>
                            {item.deptTeamsScreenShareCO2} grams of CO2 in {item.deptTeamsScreenshareDuration} seconds screensharing this week.                         
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
                    {messageDept.map(item =>(
                        <p style={{ fontSize: "20px"}}>
                        Your department has had {item.deptTeamsCallCount} calls, {item.deptTeamsMeetingCount} meetings and sent {item.deptTeamsChatMessageCount} public messages since last report.
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
            <Card aria-roledescription='card avatar'
        
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Total Co2 produced this week" weight='bold' size='large'/>
                </CardHeader>
              

                <CardBody>
                {messageDept.map(item => (
                    <p style={{ fontSize: "20px", color: item.deptTeamsAudioCO2 + item.deptTeamsScreenShareCO2 + item.deptCO2OneDrive + item.deptCO2Outlook + item.deptTeamsVideoCO2 >= 300 ? "red" : item.deptTeamsAudioCO2 + item.deptTeamsScreenShareCO2 + item.deptCO2OneDrive + item.deptCO2Outlook + item.deptTeamsVideoCO2 <= 300 ? "green" : "" }}>

                    {(item.deptTeamsAudioCO2 + item.deptTeamsScreenShareCO2 + item.deptCO2OneDrive + item.deptCO2Outlook + item.deptTeamsVideoCO2).toFixed(2)} grams of CO2 produced across all your department's Office 365 applications.
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
            </Flex>
        </div>
        <div className='Charts'>
        {messageDept.length>=0 && sessionStorage != null && <DeptChart arr={messageDept}/>}
        </div>
       </div>
    );
};