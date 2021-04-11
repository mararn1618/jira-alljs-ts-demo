import { JiraIssueSearchFronendAPI } from "./alljswrapper";


const refreshIssues = async (projectKey: string) => {
    let issues = await JiraIssueSearchFronendAPI.simpleDemo(projectKey);
    document.getElementById("results").innerHTML = JSON.stringify(issues);
}


const urlParams = new URLSearchParams(window.location.search);
let projectKey = urlParams.get("projectKey");
if (projectKey) {
    refreshIssues(projectKey);
} else {
    document.getElementById("results").innerHTML = "Please specify ?projectKey=XXXX"
}
