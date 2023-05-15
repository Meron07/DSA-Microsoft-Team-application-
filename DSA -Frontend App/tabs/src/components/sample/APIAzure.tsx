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
import { Tooltip } from '@fluentui/react-northstar';





export function APIAzure(){
    const [message, setMessage] = React.useState<Mydata[]>([]);
    const [loadingSession,setloadingSession] = React.useState(false)
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const { loading, data, error } = useData(async () => {
        if (teamsUserCredential) {
          const userInfo = await teamsUserCredential.getUserInfo();
          return userInfo;
        }
      });
const userName = (loading || error) ? "": data!.preferredUserName;
const sessionData = window.sessionStorage.getItem("UserData");
useEffect(() => {
    setloadingSession(true)
    if(sessionData){
        setMessage(JSON.parse(sessionData))
        setloadingSession(false);
    }else{
    if(userName.includes('@')){ 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        email: userName      })
    };
    fetch('https://oslometazurefunctions.azurewebsites.net/api/GetUserData?code=8lwqP0eqHyXidGW2YHXdHuDhusrAUYS_Wgjfo-IGBGpvAzFuEk8ayA==', requestOptions)
      .then(response => response.json())
      .then(data =>{setMessage(data) 
        window.sessionStorage.setItem("UserData", JSON.stringify(data))
        setloadingSession(false) 
        console.log(data)}) 
      .catch(error => console.error(error));
    }
}
  }, [userName]);

 

  if (loadingSession===true) {
    return (
        <div>
        <Spinner label="Loading..." size={SpinnerSize.large}/>
      </div>
    )
  }
    

   
    return (
       <div className="Maindiv">
        <div className="Cards">
        <h2>Welcome to your Digital Sustainability Agent!</h2>
        <p>This page shows the Microsoft 365 report from last week for user: <strong>{userName}</strong></p>
        <h3>Your Report:</h3>

       
        <Flex gap='gap.small'>
         <div>
         <Tooltip content="Did you know that 1 TB of data stored in OneDrive produces 178 KG of CO2 per year? This is equivalent to driving a car for about 1600km(1000 miles)!" position="below">
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by OneDrive" weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {message.map(item =>(
                        <p style={{ fontSize: "20px", color: item.CO2OneDrive > 50 ? "red" : item.CO2OneDrive <= 50 ? "green" : "" }}>
                        {(item.CO2OneDrive).toFixed(2)} grams of CO2 from {item.OneDriveFiles} stored files that take up {(item.TotalDriveSize).toFixed(2)} MB.

                        </p>
                    ))}
                </CardBody>
                <CardFooter fitted={true}>
                <form action="https://www.cibotechnologies.com/blog/calculating-the-carbon-footprint-of-zoom-meetings/#:~:text=The%20audio%2Donly%20calls%20would,emit%202.8%20kg%20of%20CO2/" method="get" target="_blank">
         <button type="submit">Learn more</button>
      </form>
                </CardFooter>
            </Card>
            </Tooltip>

        </div>
        <div>
        <Tooltip content="The majority of digital carbon emissions come from the energy needed to power and cool data centers, which house and process the vast amounts of data used by businesses and individuals around the world!" position="below">
            <Card aria-roledescription='card avatar'
           
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Consider removing..." weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {message.map(item =>(
                        <p style={{ fontSize:"20px"}}>
                        You have {item.OneDriveFiles-item.OneDriveActiveFiles} old and inactive files in your OneDrive storage.
                        </p>
                    ))}
                </CardBody>
             <br></br>
                <CardFooter fitted={true}>
                <form action="https://www.cibotechnologies.com/blog/calculating-the-carbon-footprint-of-zoom-meetings/#:~:text=The%20audio%2Donly%20calls%20would,emit%202.8%20kg%20of%20CO2/" method="get" target="_blank">
         <button type="submit">Learn more</button>
      </form>
                </CardFooter>
            </Card>
            </Tooltip>

        </div>
        <div>
        {/* <Tooltip content="Did you know that one email sent produces and average of 8,7 grams of CO2" position="below"> */}
        <Tooltip content="Did you know? 25 e-mails sent produces the same amount of CO2 as driving Mohammad's car ,'BMW M8', for 10 KM" position="below">
            <Card aria-roledescription='card avatar'
            
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by Outlook" weight='bold' size='large'/>
                </CardHeader>            

                <CardBody>
                    {message.map(item =>(
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
        </Tooltip>

        </div>
        <div>
        <Tooltip content="Did you know an hour long voicecall between two people on Teams produces abut 202 grams of CO2? This is equivalent to boiling one full kettle of water! " position="below">
            <Card aria-roledescription='card avatar'
            
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by Teams audio calls" weight='bold' size='large'/>
                </CardHeader>
                 <CardBody>
                    {message.map(item =>(
                        <p style={{ fontSize: "20px", color: item.TeamsAudioCO2 > 50 ? "red" : item.TeamsAudioCO2 <= 50 ? "green" : "" }}>
                            {item.TeamsAudioCO2} grams of CO2 in {item.TeamsAudioDuration} seconds in voice calls this week.                            
                        </p>
                    ))}
                </CardBody> 

                <CardFooter fitted={true}>
                <form action="https://www.cibotechnologies.com/blog/calculating-the-carbon-footprint-of-zoom-meetings/#:~:text=The%20audio%2Donly%20calls%20would,emit%202.8%20kg%20of%20CO2/" method="get" target="_blank">
         <button type="submit">Learn more</button>
      </form>
                </CardFooter>
            </Card>
         </Tooltip>
        </div>
        </Flex>
        <Flex gap='gap.small'>
        <div>
        <Tooltip content="Did you know that an hour long Teams video call produces about 1300 grams of CO2? This is equivalent to taking a hot shower for about 30 minutes!" position="below">
            <Card aria-roledescription='card avatar'
           
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Co2 produced by Teams Video Calls" weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {message.map(item =>(
                        <p style={{ fontSize: "20px", color: item.TeamsVideoCO2 > 50 ? "red" : item.TeamsVideoCO2 <= 50 ? "green" : "" }}>
                        {item.TeamsVideoCO2} grams of CO2 in {item.TeamsVideoDuration} seconds in video calls this week.
                        </p>
                    ))}
                </CardBody>
                <CardFooter fitted={true}>
                <form action="https://www.cibotechnologies.com/blog/calculating-the-carbon-footprint-of-zoom-meetings/#:~:text=The%20audio%2Donly%20calls%20would,emit%202.8%20kg%20of%20CO2/" method="get" target="_blank">
         <button type="submit">Learn more</button>
      </form>
                </CardFooter>
            </Card>
            </Tooltip>
        </div>
     
        <div>
        <Tooltip content="Did you know that one hour of online video streaming generates around 55 grams of carbon dioxide emission, which is equivalent to driving a car for about 350 meters?" position="below">
        <Card aria-roledescription='card avatar'
            
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Co2 produced by Teams Screen share Calls" weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {message.map(item =>(
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
        </Tooltip>
        </div>
        <div>
        <Tooltip content="Did you know that the first prototype of Microsoft Teams was called 'Skype Teams' and was initially planned to be an extension of Skype for Business? It was later rebranded and launched as Microsoft Teams in 2016, offering a more comprehensive collaboration platform to boost productivity and communication in the workplace Now, let's dive into our Teams activity and make the most out of this amazing platform!!" position="below">            
            <Card aria-roledescription='card avatar'
            
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Teams activity" weight='bold' size="large"/>
                </CardHeader>
                <CardBody>
                    {message.map(item =>(
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
            </Tooltip>

        </div>
        <div>
        <Tooltip content=" Did you know that in just one week, humans worldwide produce approximately 6.4 billion kilograms (14.1 billion pounds) of CO2? This staggering amount is a result of various activities such as transportation, electricity production, and industrial processes. To put this into perspective, the weight of CO2 produced in a week is equivalent to about 1.6 million African elephants! Let's work together to reduce our carbon footprint and protect our planet for future generations." position="below">
            <Card aria-roledescription='card avatar'
        
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="Total Co2 produced this week" weight='bold' size='large'/>
                </CardHeader>
              

                <CardBody>
                {message.map(item => (
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
            </Tooltip>
            </div>
            </Flex>
        </div>
        <div className='Charts-user'> 
      {loadingSession == false && message.length>0 && <BarChart arr={message} />}
      {/* {loadingSession == false && message.length>0 && <Child arr={message}/>} */}
       </div>
    </div>
    );  
};
