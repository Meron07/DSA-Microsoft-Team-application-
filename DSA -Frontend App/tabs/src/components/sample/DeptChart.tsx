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
import './DeptChart.css'
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { DeptData } from './dataInterfaces';
import { arraysEqual } from '@fluentui/react';


// The 'DeptChart' function takes an array of DeptData objects as its prop and renders 
// the different charts and data based on the values in the props.arr array. If the length
// of the array is less than 0, a spinner is shown while the data is being loaded.

export function DeptChart(props: {arr: DeptData[]}){
    const SessionData = window.sessionStorage.getItem("DeptValues");
    if(props.arr.length<0){
        return(
            <div>
            <Spinner label="I am definitely loading..." size={SpinnerSize.large} />
        </div>
            
        )
    
    }else{
   
        console.log(props);
        console.log(props.arr[0].deptName)

        let pointsPieChart: any[] = [];
        let pointsDonutChart: IChartDataPoint[] = [];
        let StacketPoints: IChartDataPoint[] = [];
        let pointsTeamsChart: IChartDataPoint[] = []
        let pointsDonutDriveSize: IChartDataPoint[] = [];

        //The pointsBarChart array contains the data points for 
        //a vertical bar chart that shows how much CO2 each of the services produced that week.

        const pointsBarChart: IVerticalBarChartDataPoint[] = [
            {
                x:'OneDrive CO2',
                y: props.arr[0].deptCO2OneDrive,
                color: '#627CEF'
            },
            {
                x:'Outlook CO2',
                y: props.arr[0].deptCO2Outlook,
                color:'#627CEF'
            },
            {
                x:'Teams Audio CO2',
                y: props.arr[0].deptTeamsAudioCO2,
                color:'#627CEF'
            },
            {
                x:'Teams Video CO2',
                y:props.arr[0].deptTeamsVideoCO2,
                color:'#627CEF'
            },
            {
                x:'Teams Screenshare CO2',
                y:props.arr[0].deptTeamsScreenShareCO2,
                color:'#627CEF'
            }
        ];
        props.arr.map((arr)=>{
            pointsDonutDriveSize = [
                {legend: 'Total OneDrive Size', data: arr.deptTotalDriveSize, color:'#0078D4', xAxisCalloutData:'Summerized size of department OneDrive (in MB)'}
             ]
            pointsPieChart = [
                {
                    y: arr.deptTotalEmailsSent,
                    x: 'Received Mail'
                   
                },
                {
                    y: arr.deptTotalInboxMail,
                    x: 'Sent Mail'
                }
                ];

                // The 'pointsDonutChart' array contains the data points for a donut chart 
                // that shows the number of active and total OneDrive files.
            pointsDonutChart= [    
                {legend: 'OneDrive Files', data:arr.deptOneDriveActiveFiles, color: '#DADADA', xAxisCalloutData: 'Your departments total OneDrive files' },
                {legend: 'Active OneDrive Files', data:arr.deptOneDriveFiles, color: '#0078D4', xAxisCalloutData: 'Files your department actively uses' },
            ];

            // The pointsTeamsChart array contains the data points for a donut chart that shows
            // the duration of audio and video calls and the duration of screensharing on Teams. 
            pointsTeamsChart = [
                {legend: 'Audio calltime', data:arr.deptTeamsAudioDuration, color: '#ADD8E6', xAxisCalloutData: 'Your duration of audio calls on Teams (in seconds)'},
                {legend: 'Video calltime', data:arr.deptTeamsVideoDuration, color: '#0078D4', xAxisCalloutData: 'Your duration of video calls on Teams (in seconds)'},
                {legend: 'Screensharing', data:arr.deptTeamsScreenshareDuration, color: '#DADADA', xAxisCalloutData: 'Your duration of screensharing on Teams (in seconds)'},
            ];
            // The StacketPoints array contains the data points for a stacked bar chart that shows 
            // the amount of Teams calls, chat messages, meetings, and private messages.
            StacketPoints = [
                {legend:'Amount of teams calls', data:arr.deptTeamsCallCount, color:DefaultPalette.blueDark},
                {legend:'Amount of teams chat messages',data:arr.deptTeamsChatMessageCount, color:DefaultPalette.orange},
                {legend:'Amount of teams Meetings', data:arr.deptTeamsMeetingCount, color:DefaultPalette.magenta},
                {legend:'Private message count',data:arr.deptTeamsPrivateMessageCount ,color:DefaultPalette.blueMid}
                ];
            }
        )

    const donutData: IChartProps = {
        chartTitle: 'Donut chart showing Active files and total files',
        chartData: pointsDonutChart,
        };
    
       
        const teamsData: IChartProps = {
            chartTitle: 'Donut chart showing teams calltime report',
            chartData: pointsTeamsChart,
        };
   
    const StacketData: IChartProps= {
    chartTitle: "Stacket bar showing teams Activity",
    chartData: StacketPoints,
    };
    const donutDriveSize: IChartProps = {
        chartTitle: 'Donut chart showing total size of your OneDrive (in MB)',
        chartData: pointsDonutDriveSize,
    }
    

    const colors = [DefaultPalette.red, DefaultPalette.blue, DefaultPalette.green];

    return(
        <div className='Charts-fluentUI'>
            <h2>Department data visualized:</h2>
        <Flex gap="gap.small">
        <Card  styles={{height:"400px", width: "400px", marginTop:"15px"}}>
        <CardHeader>
        <Text content=" How much CO2 each of the services produced this week(in grams)" weight='bold' size='large' />
        </CardHeader>
        <CardBody className='cardbody-dep'>
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
            <CardBody className='cardbody-dep'>
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
            </CardHeader >
            <CardBody className='cardbody-dep'>
                <DonutChart
                culture={window.navigator.language}
                data={donutDriveSize}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                hideLegend={false}
                height={275}
                width={275}
                valueInsideDonut={props.arr[0].deptTotalDriveSize}
                />
            </CardBody>
            </Card>
        </Flex>
        <Flex gap='gap.small'>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Active Files VS Total Files" weight='bold' size='large' />
                   
                </CardHeader>
                <CardBody className='cardbody-dep'>
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
                <CardBody className='cardbody-dep'>
                <DonutChart
                culture={window.navigator.language}
                data={teamsData}
                innerRadius={75}
                legendsOverflowText={'overflow Items'}
                hideLegend={false}
                height={250}
                width={250}
                valueInsideDonut={'Calltime'}
                />
                </CardBody>
            </Card>
            <Card styles={{height:"400px", width: "400px", marginTop:"15px"}}>
                <CardHeader>
                <Text content="Teams activities" weight='bold' size='large' />
                </CardHeader>
                <CardBody className='cardbody-dep'>
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