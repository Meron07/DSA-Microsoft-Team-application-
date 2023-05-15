import React, { useContext, useEffect, useState } from 'react';
import App from '../App';
import { Button, CardFooter, CardHeader, CardBody, Card, Flex, Text } from "@fluentui/react-northstar";
import { BearerTokenAuthProvider, createApiClient, TeamsUserCredential } from "@microsoft/teamsfx";
import { TeamsFxContext } from '../Context';
import { useData } from '@microsoft/teamsfx-react';
import { log } from 'console';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { VerticalBarChart, IVerticalBarChartProps, IDataPoint } from '@fluentui/react-charting'
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { FontSizes} from '@fluentui/react';
import { BarChart } from './BarChart';
import "./APIAzure.css";
import { Mydata } from './dataInterfaces';


export function APIAzureAdmin(){
    
    const [messageAdmin, setMessageAdmin] = React.useState<Mydata[]>([]);
    let [AdminEmployee, setAdminEmployee] = React.useState('');
    //userName = (document.getElementById("searchUserName") as HTMLInputElement).value;
    //const userName = (loading || error) ? "": <data!.preferredUserName;>

const getEmployeeFromAPI = async(e: any) =>{
    e.preventDefault();
    if(AdminEmployee.includes('@')){ 
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: AdminEmployee      })
        };
        await fetch('https://oslometazurefunctions.azurewebsites.net/api/GetUserData?code=8lwqP0eqHyXidGW2YHXdHuDhusrAUYS_Wgjfo-IGBGpvAzFuEk8ayA==', requestOptions)
          .then(response => response.json())
          .then(data =>{setMessageAdmin(data) 
            window.sessionStorage.setItem("AdminUserData", JSON.stringify(data)) 
            console.log(data)}) 
          .catch(error => console.error(error));
        }
      }
      
       useEffect(()=> {}, [AdminEmployee])
       if(messageAdmin.length> 0 ){
        <div>
            <p>Loading</p>
        </div>
       }
        return (
           <div className="Maindiv">
            <div className="Cards">
            <h2>Admin Panel</h2>
            <p>This admin-exclusive panel for the User page lets authorized administrators retrieve CO2 production of any retrieved employee of your tenant.</p>
            <form onSubmit={e => getEmployeeFromAPI(e)}>
                <label htmlFor="userName">Employee Email: </label>
                <input type="text"
                id="searchUserName"
                placeholder='Email'
                value={AdminEmployee}
                onChange={e=>setAdminEmployee(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            <h3>Results for employee: {AdminEmployee}</h3>
    
           
            <Flex gap='gap.small'>
                
             <div>
                <Card aria-roledescription='card avatar'
                styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by OneDrive" weight='bold' size="large"/>
                    </CardHeader>
                    <CardBody>
                        {messageAdmin.map(item =>(
                            <p style={{ fontSize: "20px", color: item.CO2OneDrive > 50 ? "red" : item.CO2OneDrive <= 50 ? "green" : "" }}>
    
                            {(item.CO2OneDrive).toFixed(2)} grams of CO2 from {item.OneDriveFiles} stored files that take up {(item.TotalDriveSize).toFixed(2)} megabytes.
    
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
                        <Text content="Consider removing..." weight='bold' size="large"/>
                    </CardHeader>
                    <CardBody>
                        {messageAdmin.map(item =>(
                            <p style={{ fontSize:"20px"}}>
                            You have {item.OneDriveFiles-item.OneDriveActiveFiles} old and inactive files in your OneDrive storage.
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
                        <Text content="CO2 produced by Outlook" weight='bold' size='large'/>
                    </CardHeader>            
    
                    <CardBody>
                        {messageAdmin.map(item =>(
                            <p style={{ fontSize: "20px", color: item.CO2Outlook > 50 ? "red" : item.CO2Outlook <= 50 ? "green" : "" }}>
                                {item.CO2Outlook} grams of CO2 from {item.totalEmailsSent} mails sent and {item.totalInboxmail} mails received this week.
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
                        <Text content="Co2 produced by Teams Video Calls" weight='bold' size="large"/>
                    </CardHeader>
                    <CardBody>
                        {messageAdmin.map(item =>(
                            <p style={{ fontSize: "20px", color: item.TeamsAudioCO2 > 50 ? "red" : item.TeamsAudioCO2 <= 50 ? "green" : "" }}>
                            {item.TeamsVideoCO2} grams of CO2 in {item.TeamsAudioDuration} seconds in voice calls this week.
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
            <Flex gap='gap.small'>
            <div>
                <Card aria-roledescription='card avatar'
                
                styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                    <CardHeader>
                        <Text content="CO2 produced by Teams audio calls" weight='bold' size='large'/>
                    </CardHeader>
                     <CardBody>
                        {messageAdmin.map(item =>(
                            <p style={{ fontSize: "20px", color: item.TeamsVideoCO2 > 50 ? "red" : item.TeamsVideoCO2 <= 50 ? "green" : "" }}>
                                {item.TeamsAudioCO2} grams of CO2 in {item.TeamsVideoDuration} seconds in video calls this week.                            
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
                        <Text content="Co2 produced by Teams Screen share Calls" weight='bold' size="large"/>
                    </CardHeader>
                    <CardBody>
                        {messageAdmin.map(item =>(
                            <p style={{ fontSize: "20px", color: item.TeamsScreenShareCO2 > 50 ? "red" : item.TeamsScreenShareCO2 <= 50 ? "green" : "" }}>
                            {item.TeamsScreenShareCO2} grams of CO2 in {item.TeamsScreenshareDuration} seconds screensharing this week.
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
                    <Text content="Teams activity" weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {messageAdmin.map(item =>(
                        <p style={{ fontSize: "20px", color: item.TeamsScreenShareCO2 > 50 ? "red" : item.TeamsScreenShareCO2 <= 50 ? "green" : "" }}>
                        You have had {item.TeamsCallCount} calls, {item.TeamsMeetingCount} meetings and sent {item.TeamsChatMessageCount} public messages since last report.
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
                    {messageAdmin.map(item => (
                        <p style={{ fontSize: "20px", color: item.TeamsAudioCO2 + item.TeamsScreenShareCO2 + item.CO2OneDrive + item.CO2Outlook + item.TeamsVideoCO2 >= 300 ? "red" : item.TeamsAudioCO2 + item.TeamsScreenShareCO2 + item.CO2OneDrive + item.CO2Outlook + item.TeamsVideoCO2 <= 300 ? "green" : "" }}>
    
                        {(item.TeamsAudioCO2 + item.TeamsScreenShareCO2 + item.CO2OneDrive + item.CO2Outlook + item.TeamsVideoCO2).toFixed(2)} grams of CO2 produced across all your Office 365 applications.
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
            <div className='Charts-user'> 
            {messageAdmin.length>0 && <BarChart arr={messageAdmin} />}
           </div>
        </div>
        );
}
