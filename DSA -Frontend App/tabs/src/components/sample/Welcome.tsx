import { useContext, useState } from "react";
import { Image, Menu,Button  } from "@fluentui/react-northstar";
import "./Welcome.css";
import { AzureFunctions } from "./AzureFunctions";
import { APIAzure } from "./APIAzure";
import { useData } from "@microsoft/teamsfx-react";
import { Game } from "./Game";
import { DeptAzure } from "./DeptAzure";
import { CompAPI } from "./CompAPI";
import { Mydata } from "./dataInterfaces";
import { Unauthorized } from "./Unauthorized";
import { APIAzureAdmin } from "./APIAzureAdmin";
import { DeptAzureAdmin } from "./DeptAzureAdmin";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";



export function Welcome(props: { showFunction?: boolean; environment?: string }) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
//checks for session data and sets Admin check to value collected
//From Json object
  let admincheck = false;
  // let admincheck = true;
  let userData: Mydata[];
  let sessionData = window.sessionStorage.getItem("UserData");
  if(sessionData){
    userData = JSON.parse(sessionData);
    admincheck = userData[0].admincheck;
    // admincheck = true;
    console.log(admincheck);
   }
   console.log(admincheck)

  
  const friendlyEnvironmentName =
    {
      user: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const steps = ["user", "department", "company","game"];
  const friendlyStepsName: { [key: string]: string } = {
    user: "Your Report",
    department: "Your Department",
    company: "Your Company",
    game: "Run Forrest Run",
   
  };
   const [selectedMenuItem, setSelectedMenuItem] = useState("user");
   const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
       onClick: () => setSelectedMenuItem(step),
    };
   });
   const {teamsUserCredential} = useContext(TeamsFxContext);
    const {loading, error, data, reload} = useGraphWithCredential(
        async (graph, teamsUserCredential, scope) => {
            const profile = await graph.api("/me").get()

            const provider = new TeamsFxProvider(teamsUserCredential, scope);
            Providers.globalProvider = provider;
            Providers.globalProvider.setState(ProviderState.SignedIn);

        return profile;
        },
        {scope: ["User.Read"], credential:teamsUserCredential}       
    );
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Menu defaultActiveIndex={0} items={items} underlined secondary /> 
        <div className="sections">
          {selectedMenuItem === "user" && (
            <div>
              {/* <CurrentUser userName={userName} />  */}
              {<APIAzure/>}
              {admincheck && <APIAzureAdmin/>}
              
            </div>
          )}
          {selectedMenuItem === "department" && (
            <div>
              <DeptAzure />
              {admincheck && <DeptAzureAdmin/>}
            </div>
          )}
          {selectedMenuItem === "company" && (
            <div>
              {admincheck && <CompAPI /> || !admincheck && <Unauthorized/>}
            </div>
          )}
          {selectedMenuItem === "game" && (
            <div>
               <Game /> 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
