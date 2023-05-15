import * as React from 'react';
import { VerticalBarChart,
    IVerticalBarChartProps,
    IVerticalBarChartDataPoint,
    PieChart,
    IChartDataPoint,
    DonutChart,
    IChartProps,
    IDonutChartProps,
    StackedBarChart} from '@fluentui/react-charting';
import { Card, CardBody, CardHeader, Flex, Text } from '@fluentui/react-northstar';
import "./CompChart.css"
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { CompanyData } from './dataInterfaces';
import { arraysEqual } from '@fluentui/react';


export function CompChart(props: {arr: CompanyData[]}){
 const SessionData = window.sessionStorage.getItem("CompValues");

 if(props.arr.length<0){
    return(
        <div>
        <Spinner label="I am definitely loading..." size={SpinnerSize.large} />
    </div>
        
    )

 } else{
    // setMessage(JSON.parse(SessionData));
    //const array : CompanyData[] = JSON.parse(SessionData);
    console.log(props);
    console.log(props.arr[0].company)

    let pointsPieChart: any[] = [];   
    let pointsDonutChart: IChartDataPoint[] = [];
    let pointsDonutChartSP : IChartDataPoint[] = [];
    let StacketPoints: IChartDataPoint[] = [];
    let pointsTeamsChart: IChartDataPoint[] = [];


    
    const pointsBarChart: IVerticalBarChartDataPoint[] = [
        {
            x:'OneDrive CO2',
            y: props.arr[0].compCO2OneDrive,
            color: '#627CEF'
        },
        {
            x:'Outlook CO2',
            y: props.arr[0].compCO2Outlook,
            color:'#627CEF'
        },
        {
            x:'Teams Audio CO2',
            y: props.arr[0].compTeamsAudioCO2,
            color:'#627CEF'
        },
        {
            x:'Teams Video CO2',
            y:props.arr[0].compTeamsVideoCO2,
            color:'#627CEF'
        },
        {
            x:'Teams Screenshare CO2',
            y:props.arr[0].compTeamsScreenShareCO2,
            color:'#627CEF'
        },
        {
            x:'Sharepoint CO2',
            y: props.arr[0].compCO2SharePoint,
            color:'#627CEF'
        }
     ];

     props.arr.map((arr)=> {
        pointsPieChart = [
            {
            y: arr.compTotalInboxMail,
            x: 'Sent Mail'
            },
            {
                y: arr.compTotalEmailsSent,
                x: 'Received Mail'
            }

        ];
        pointsDonutChart = [
            {legend: 'OneDrive Files', data:arr.compOneDriveActiveFiles, color: '#DADADA', xAxisCalloutData: 'Active files in your companies OneDrive' },
            {legend: 'Active OneDrive Files', data:arr.compOneDriveFiles, color: '#0078D4', xAxisCalloutData: 'Total amount of files within your Company' },
         ];
        pointsTeamsChart = [
            {legend: 'Audio calltime', data:arr.compTeamsAudioDuration, color: '#ADD8E6', xAxisCalloutData: 'Your company total duration of audio calls on Teams (in minutes)'},
            {legend: 'Video calltime', data:arr.compTeamsVideoDuration, color: '#0078D4', xAxisCalloutData: 'Your company total duration of video calls on Teams (in minutes)'},
            {legend: 'Screensharing', data:arr.compTeamsScreenshareDuration, color: '#DADADA', xAxisCalloutData: 'Your company total duration of screensharing on Teams (in minutes)'},
        ];

         StacketPoints = [
            {legend:'Amount of teams calls', data:arr.compTeamsCallCount, color:DefaultPalette.blueDark},
            {legend:'Amount of teams chat messages',data:arr.compTeamsChatMessageCount, color:DefaultPalette.orange},
            {legend:'Amount of teams Meetings', data:arr.compTeamsMeetingCount, color:DefaultPalette.magenta},
            {legend:'Private message count',data:arr.compTeamsPrivateMessageCount ,color:DefaultPalette.blueMid}
        ];
        pointsDonutChartSP = [
            {legend: 'Total SharePoint size MB', data: arr.SharePointTotalSizeMB, color:'#ADD8E6', xAxisCalloutData:' Total size of SharePoint within inmetaDemo (in MB).'}
        ]
    }
    )
     


    const donutData: IChartProps = {
        chartTitle: 'Donut chart showing Active files and total files',
        chartData: pointsDonutChart,
    };
    const donutDataSP: IChartProps = {
        chartTitle: 'Donut chart showing Sharepoint Total Size',
        chartData: pointsDonutChartSP,
    }   
    
    const teamsData: IChartProps = {
        chartTitle: 'Donut chart showing teams calltime report',
        chartData: pointsTeamsChart,
    };
   
    const StacketData: IChartProps= {
        chartTitle: "Stacket bar showing teams Activity",
        chartData: StacketPoints,
    };
    
    const colors = [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green];
    return(
        <div className='Charts-fluentUIcomp'>
            <h2>Company data visualized:</h2>
        <Flex gap="gap.small">
        <Card  styles={{height:"400px", width: "400px", marginTop:"15px"}}>
        <CardHeader>
        <Text content="How much CO2 each of the services produced this week(in grams)" weight='bold' size='large' />     
        </CardHeader>
        <CardBody className='cardbodycomp'>
            <VerticalBarChart 
            chartTitle='Title'
            data={pointsBarChart}
            height={50}
            width={200}
            hideLegend={true}
            rotateXAxisLables={true} />
        </CardBody>
        </Card>
        <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
            <CardHeader>
            <Text content="Sent and Received mail" weight='bold' size='large' />

                
            </CardHeader>
            <CardBody className='cardbodycomp'>
                <PieChart
                data={pointsPieChart}
                height={300}
                width={300}
                colors={colors}
                />
            </CardBody>
        </Card>
        <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
            <CardHeader>
            <Text content="Total SharePoint Size" weight='bold' size='large' />
                
            </CardHeader>
            <CardBody className='cardbodycomp'>
                <DonutChart
                culture={window.navigator.language}
                data={donutDataSP}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                hideLegend={false}
                height={275}
                width={275}
                valueInsideDonut={props.arr[0].SharePointTotalSizeMB}
                />
            </CardBody>
        </Card>
        </Flex>
        <Flex gap='gap.small'>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Active Files VS Total Files" weight='bold' size='large'/>
                </CardHeader>
                <CardBody className='cardbodycomp'>
                <DonutChart
                culture={window.navigator.language}
                data={donutData}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                hideLegend={false}
                height={275}
                width={275}
                valueInsideDonut={'Files'}
                />
                </CardBody>
            </Card>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Teams usage report" weight='bold' size='large' />

                </CardHeader>
                <CardBody className='cardbodycomp'>
                <DonutChart
                culture={window.navigator.language}
                data={teamsData}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                hideLegend={false}
                height={275}
                width={275}
                valueInsideDonut={'Calltime'}
                />
                </CardBody>
                </Card>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Teams activities" weight='bold' size='large' />
                </CardHeader>
                <CardBody className='cardbodycomp'>
                    <StackedBarChart
                    data={StacketData}
                    barBackgroundColor={DefaultPalette.neutralTertiary}
                    enabledLegendsWrapLines={true}
                    />
                </CardBody>
            </Card>
        </Flex>
    </div>   
)

}

}