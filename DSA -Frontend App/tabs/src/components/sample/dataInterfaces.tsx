

export type Mydata = {
    id:string,
    email:string,
    OneDriveFiles:number,
    OneDriveActiveFiles: number,
    TotalDriveSize: number,
    totalInboxmail: number,
    totalEmailsSent: number,
    TeamsCallCount: number,
    TeamsMeetingCount: number,
    TeamsChatMessageCount: number,
    TeamsPrivateMessageCount: number,
    TeamsAudioDuration: number,
    TeamsVideoDuration: number,
    TeamsScreenshareDuration: number,
    CO2OneDrive: number,
    CO2Outlook: number,
    TeamsAudioCO2: number,
    TeamsVideoCO2: number,
    TeamsScreenShareCO2:number,
    admincheck:boolean,
    deptName: string
}
export type DeptData = {
    deptName: string,
    deptOneDriveFiles: number,
    deptOneDriveActiveFiles: number,
    deptTotalDriveSize: number,
    deptTotalInboxMail: number,
    deptTotalEmailsSent: number,
    deptTeamsCallCount: number,
    deptTeamsMeetingCount: number,
    deptTeamsChatMessageCount: number,
    deptTeamsPrivateMessageCount: number,
    deptTeamsAudioDuration: number,
    deptTeamsVideoDuration: number,
    deptTeamsScreenshareDuration: number,
    deptCO2OneDrive: number,
    deptCO2Outlook: number,
    deptTeamsAudioCO2: number,
    deptTeamsVideoCO2: number,
    deptTeamsScreenShareCO2:number,
    company: string
}
export type CompanyData = {
    company: string,
    compOneDriveFiles: number,
    compOneDriveActiveFiles: number,
    compTotalDriveSize: number,
    compTotalInboxMail: number,
    compTotalEmailsSent: number,
    compTeamsCallCount: number,
    compTeamsMeetingCount: number,
    compTeamsChatMessageCount: number,
    compTeamsPrivateMessageCount: number,
    compTeamsAudioDuration: number,
    compTeamsVideoDuration: number,
    compTeamsScreenshareDuration: number,
    SharePointTotalSizeMB: number,
    compCO2OneDrive: number,
    compCO2Outlook: number,
    compCO2SharePoint: number,
    compTeamsAudioCO2: number,
    compTeamsVideoCO2: number,
    compTeamsScreenShareCO2: number
}
export type TipsAPIData ={
    id: string;
    hint: string;
}