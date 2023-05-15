import { Providers, ProviderState } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { useGraphWithCredential } from "@microsoft/teamsfx-react";
import { useContext } from "react";
import { TeamsFxContext } from "../Context";
import { Button, Image } from "@fluentui/react-northstar";
import './Game.css'


export function Game() {
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

    return(
        <div className="game">

            <h2>Run forrest Run!</h2>
            <p style={{fontSize:20 }}>This is where we will have a small ranking system that ranks users based on emmisions</p>
            <img src={'game.jpg'}></img>
            <div className="section-margin">
             
                <Button primary content="Autorize"  disabled={loading} onClick={reload} />
             
              
            </div>
        </div>
    );
}