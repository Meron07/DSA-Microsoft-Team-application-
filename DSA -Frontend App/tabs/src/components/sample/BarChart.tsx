import * as React from 'react';
import { VerticalBarChart,
         IVerticalBarChartDataPoint,
         PieChart,
         IChartDataPoint,
         DonutChart,
         IChartProps,
         IDonutChartProps,
         StackedBarChart} from '@fluentui/react-charting';
import { Card, CardBody, CardHeader, Flex, Text} from '@fluentui/react-northstar';
import "./BarChart.css"
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Mydata } from './dataInterfaces';


export function BarChart(props: { arr: Mydata[]}){

    //Verticalbarchart only accept const meaning that we cant
    //use map but have to manually get each of the values from
    //JSON object
    const pointsBarChart: IVerticalBarChartDataPoint[]  = [{
        x: "OneDrive CO2",
        y:props.arr[0].CO2OneDrive,
        color:'#627CEF'
    },
    {
        x: "Outlook CO2",
        y:props.arr[0].CO2Outlook,
        color:'#627CEF'
    },
    { 
        x: "Teams Video Call CO2",
        y:props.arr[0].TeamsVideoCO2,
        color:'#627CEF'
    },
    {
        x: "Teams Audio Call CO2",
        y:props.arr[0].TeamsAudioCO2,
        color:'#627CEF'
    },
    {
        x: 'Teams ScreenShare Calls CO2',
        y: props.arr[0].TeamsScreenShareCO2,
        color: '#627CEF'
    }
];
// Initializes data variables so that JSON Array can be mapped
    let pointsPieChart: any[] = [];
    let StacketPoints: IChartDataPoint[] = [];
    let pointsTeamsChart: IChartDataPoint[] = [];   
    let pointsDonutChart: IChartDataPoint[] = [];
    let pointsDonutDriveSize: IChartDataPoint[] = [];
    
    //Maps each respective Value from JSON Array to wanted Charts
   props.arr.map((arr)=>{
         pointsDonutDriveSize = [
            {legend: 'Total OneDrive Size', data: arr.TotalDriveSize, color:'#0078D4', xAxisCalloutData:'Total Size of your OneDrive (in MB)'}
         ]
         pointsDonutChart = [
            {legend: 'OneDrive Files', data:arr.OneDriveFiles, color: '#DADADA', xAxisCalloutData: 'Your total OneDrive files' },
            {legend: 'Active OneDrive Files', data:arr.OneDriveActiveFiles, color: '#0078D4', xAxisCalloutData: 'Files you actively use' },
         ];
         StacketPoints = [
            {legend:'Amount of teams calls', data:arr.TeamsCallCount, color:DefaultPalette.blueDark},
            {legend:'Amount of teams chat messages',data:arr.TeamsChatMessageCount, color:DefaultPalette.orange},
            {legend:'Amount of teams Meetings', data:arr.TeamsMeetingCount, color:DefaultPalette.magenta},
            {legend:'Private message count',data:arr.TeamsPrivateMessageCount ,color:DefaultPalette.blueMid}
         ];
         pointsPieChart = [
            {
                x: 'Sent Mail',
                y: arr.totalEmailsSent
            },
            {
                x:'Received Mail',
                y: arr.totalInboxmail
            }
         ];
         pointsTeamsChart = [
            {legend: 'Audio calltime', data:arr.TeamsAudioDuration, color: '#ADD8E6', xAxisCalloutData: 'Your duration of audio calls on Teams (in seconds)'},
            {legend: 'Video calltime', data:arr.TeamsVideoDuration, color: '#0078D4', xAxisCalloutData: 'Your duration of video calls on Teams (in seconds)'},
            {legend: 'Screensharing', data: arr.TeamsScreenshareDuration, color: '#DADADA', xAxisCalloutData: 'Your duration of screensharing on Teams (in seconds)'},
         ]

    })

 

const donutData: IChartProps = {
    chartTitle: 'Donut chart showing Active files and total files',
    chartData: pointsDonutChart,
};

const StacketData: IChartProps= {
    chartTitle: "Stacket bar showing teams Activity",
    chartData: StacketPoints,
};
const teamsData: IChartProps = {
    chartTitle: 'Donut chart showing teams calltime report',
    chartData: pointsTeamsChart,
};
const donutDriveSize: IChartProps = {
    chartTitle: 'Donut chart showing total size of your OneDrive (in MB)',
    chartData: pointsDonutDriveSize,
}
 const colors = [DefaultPalette.red, DefaultPalette.blue];

 
 return(
      <div className='Charts-fluentUI'>
        <h2>Data visualized in Charts:</h2>
        <><Flex gap="gap.small">
        <Card  styles={{height:"400px", width: "400px", marginTop:"15px"}}>
        <CardHeader>
        <Text content="CO2 produced by each of your 365 services(in grams)" weight='bold' size='large' />
        </CardHeader>
        <CardBody className='cardbody'>
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
                <Text content="Recieved and sent Mail" weight='bold' size='large' />
            </CardHeader>
            <CardBody className='cardbody'>
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
                <Text content="Total OneDrive Size" weight='bold' size='large' />
            </CardHeader>
            <CardBody>
                <DonutChart
                culture={window.navigator.language}
                data={donutDriveSize}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                hideLegend={false}
                height={275}
                width={275}
                valueInsideDonut={props.arr[0].TotalDriveSize.toString()+"MB"}
                />
            </CardBody>
        </Card>
        </Flex>
        <Flex gap='gap.small'>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Active and total Files in OneDrive" weight='bold' size='large' />
                </CardHeader>
                <CardBody className='cardbody'>
                <DonutChart
                culture={window.navigator.language}
                data={donutData}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                legendProps={{
                    allowFocusOnLegends:true,
                }}
                hideLegend={false}
                height={275}
                width={275}
                valueInsideDonut={"files"}
                />
                </CardBody>
            </Card>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Teams usage report" weight='bold' size='large' />
                    
                </CardHeader>
                <CardBody>
                <DonutChart
                culture={window.navigator.language}
                data={teamsData}
                innerRadius={75}
                //legendsOverflowText={'overflow Items'}
                legendProps={{
                    allowFocusOnLegends:true,
                }}
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
                <CardBody className='cardbody'>
                    <StackedBarChart
                    data={StacketData}
                    barBackgroundColor={DefaultPalette.neutralTertiary} 
                    enabledLegendsWrapLines={true}
                    />
                </CardBody>
            </Card>
        </Flex></>

    </div>
)
 
 }
// }

// }