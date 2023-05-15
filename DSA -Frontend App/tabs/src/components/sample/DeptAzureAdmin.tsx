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
import { DeptChart } from './DeptChart';
import "./DeptAzure.css";
import { Mydata, DeptData } from './dataInterfaces';


export function DeptAzureAdmin(){
    const [messageAdminDept, setMessageAdminDept] = React.useState<DeptData[]>([]);
    let [AdminDeptName, setAdminDeptName] = React.useState('');
    //userName = (document.getElementById("searchUserName") as HTMLInputElement).value;
    //const userName = (loading || error) ? "": <data!.preferredUserName;>

const getDeptFromAPI = async(e: any) =>{
    e.preventDefault();
    if(AdminDeptName){ 
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            deptName: AdminDeptName     })
        };
        await fetch('https://oslometazurefunctions.azurewebsites.net/api/GetDeptData?code=s69n0paO-wjlvN05GlSDGAytdljW0cLe_C-B-xtcwkd1AzFuqcXRxA==', requestOptions)
          .then(response => response.json())
          .then(data =>{setMessageAdminDept(data) 
            window.sessionStorage.setItem("AdminDeptValues", JSON.stringify(data)) 
            console.log(data)}) 
          .catch(error => console.error(error));
        }
      }
      
       useEffect(()=> {}, [AdminDeptName])
       if(messageAdminDept.length> 0 ){
        <div>
            <p>Loading</p>
        </div>
       }
        return (
           <div className="DepMaindiv">
            <div className="Cards">
            <h2>Admin Panel</h2>
            <p>This admin-exclusive panel for the Department page lets authorized administrators retrieve CO2 production of any retrieved departemnt of your tenant.</p>
            <form onSubmit={e => getDeptFromAPI(e)}>
                <label htmlFor="searchDeptName">Department: </label>
                <input type="text"
                id="searchDeptName"
                placeholder='Department Name'
                value={AdminDeptName}
                onChange={e=>setAdminDeptName(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            <h3>Results for Department: {AdminDeptName}</h3>
    
           
            {/* in this section we'll create a card that desplays the data */}
        <Flex gap='gap.small'>
        <div>
            <Card aria-roledescription='card avatar'
            styles={{height: "280px", width: "330px", marginTop:"15px"}}>
                <CardHeader>
                    <Text content="CO2 produced by OneDrive storage" weight='bold' size='large'/>
                </CardHeader>
                <CardBody>
                    {messageAdminDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptCO2OneDrive > 50 ? "red" : item.deptCO2OneDrive <= 50 ? "green" : "" }}>
                            {item.deptCO2OneDrive} grams of CO2 from {item.deptOneDriveFiles} stored files that take up {(item.deptTotalDriveSize).toFixed(2)} megabytes.
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
                    {messageAdminDept.map(item =>(
                        <p style={{fontSize:"20px"}}>
                        {item.deptName} has {item.deptOneDriveFiles-item.deptOneDriveActiveFiles} old and inactive files in its OneDrive storage.
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
                    {messageAdminDept.map(item =>(
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
                    {messageAdminDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptTeamsAudioCO2 > 50 ? "red" : item.deptTeamsAudioCO2 <= 50 ? "green" : "" }}>
                            {item.deptTeamsAudioCO2} grams of CO2 in {item.deptTeamsAudioDuration} seconds in voice calls this week.
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
                    {messageAdminDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptTeamsVideoCO2 > 50 ? "red" : item.deptTeamsVideoCO2 <= 50 ? "green" : "" }}>
                            {item.deptTeamsVideoCO2} grams of CO2 in {item.deptTeamsVideoDuration} seconds in video calls this week.                             
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
                    {messageAdminDept.map(item =>(
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
                    {messageAdminDept.map(item =>(
                        <p style={{ fontSize: "20px", color: item.deptTeamsScreenShareCO2 > 50 ? "red" : item.deptTeamsScreenShareCO2 <= 50 ? "green" : "" }}>
                        {item.deptName} has had {item.deptTeamsCallCount} calls, {item.deptTeamsMeetingCount} meetings and sent {item.deptTeamsChatMessageCount} public messages since last report.
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
                {messageAdminDept.map(item => (
                    <p style={{ fontSize: "20px", color: item.deptTeamsAudioCO2 + item.deptTeamsScreenShareCO2 + item.deptCO2OneDrive + item.deptCO2Outlook + item.deptTeamsVideoCO2 >= 300 ? "red" : item.deptTeamsAudioCO2 + item.deptTeamsScreenShareCO2 + item.deptCO2OneDrive + item.deptCO2Outlook + item.deptTeamsVideoCO2 <= 300 ? "green" : "" }}>

                    {(item.deptTeamsAudioCO2 + item.deptTeamsScreenShareCO2 + item.deptCO2OneDrive + item.deptCO2Outlook + item.deptTeamsVideoCO2).toFixed(2)} grams of CO2 produced across all {item.deptName}'s Office 365 applications.
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
        {messageAdminDept.length>0  && <DeptChart arr={messageAdminDept}/>}
        </div>
       </div>
        );
}
