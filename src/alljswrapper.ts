
declare var AP: any;





/* -------------------------------------------------------------------------- */
/*                          AllJS / Request / Simple Demo                     */
/* * https://developer.atlassian.com/cloud/jira/software/jsapi/request/       */
/* -------------------------------------------------------------------------- */
type IssueBean = any;//quickfix
type SearchResults = any;//quickfix




/**
 * PartialResult
 * Used when we query for IssueKeys, but some of them cannot be found in JIRA
 */
export class PartialResult<KEY_TYPE, RESULT_TYPE> {
    found: RESULT_TYPE;
    missing: KEY_TYPE[] = [];
    
    constructor(init: RESULT_TYPE) {
        this.found = init;
    }
}


export class JiraIssueSearchFronendAPI {



    public static async simpleDemo(projectKey: string): Promise<IssueBean[]> {

        // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
        // https://developer.atlassian.com/cloud/jira/software/jsapi/request/

        return new Promise<IssueBean[]>(async function (ok, nok) {

            let url = `/rest/api/3/search?jql=projectkey is '${projectKey}'&fields=id,key,summary,issuetype,resolution,status,description,project`;
            url += "&validateQuery=false";
            
            AP.request(url, {
                type: "GET",
                success: function (responseText: string) {
                    let json: SearchResults = JSON.parse(responseText);
                    ok(json["issues"]);
                },
                error: function(xhr, statusText, errorThrown) {
                    nok(statusText);
                }
            });

        });


    }




    public static async getIssueMetadata(issueKeys: string[], expandFields: ("renderedFields" | "transitions")[] = [], validateQuery: boolean = false): Promise<PartialResult<string, Map<string, IssueBean>>> {

        // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
        // https://developer.atlassian.com/cloud/jira/software/jsapi/request/


        return new Promise<PartialResult<string, Map<string, IssueBean>>>(async function (ok, nok) {

            let jql = `issueKey in (${issueKeys.join(',')})`;
            let url = `/rest/api/3/search?jql=${jql}&fields=id,key,summary,issuetype,resolution,status,description,project`;
            url += "&validateQuery=" + validateQuery;
            if (expandFields && expandFields.length > 0) url += `&expand=` + expandFields.join(",");

            AP.request(url, {
                type: "GET",
                success: function (responseText: string) {

                    let json: SearchResults = JSON.parse(responseText);

                    //collect found results
                    let result = new PartialResult<string, Map<string, IssueBean>>(new Map());
                    result.found = new Map<string, IssueBean>();
                    json.issues.forEach((issue: IssueBean) => {
                        result.found.set(issue.key, issue);
                    }, this);

                    //collect missing results
                    issueKeys.forEach((key) => {
                        if (false == result.found.has(key)) result.missing.push(key);
                    }, this);

                    ok(result);

                },
                error: function(xhr, statusText, errorThrown) {
                    nok(statusText);
                }
            });


        });

    }



}



/* -------------------------------------------------------------------------- */
/*                               AllJS / Context                              */
/* https://developer.atlassian.com/cloud/jira/software/jsapi/context/         */
/* -------------------------------------------------------------------------- */




export interface APContext {
    jira?: {
        issue: {
            id: string,
            issuetype: {
                id: string
            }
        },
        project: {
            id: string,
            key: string
        }
    }
}



export class JiraAllJSWrapper {


    /**********************************************************************
     * AP.context
     *
     **********************************************************************/
    public static async CONTEXT_getContext(): Promise<APContext> {
        return new Promise((ok, nok) => {
            AP.env.getContext(function (response: APContext) {
                ok(response);
            });
        });
    }




    /**********************************************************************
     * AP.env
     * 
     **********************************************************************/

    /**
     * Returns the complete Url, e.g. https://myinstance.atlassian.net/browse/ISSUE-5
     * @returns
     */
    public static async ENV_getCurrentLocation(): Promise<string> {
        return new Promise((ok, nok) => {
            AP.env.getLocation(function (response: string) {
                ok(response);
            });
        });
    }

    /**
     * Returns the baseHref, e.g. https://myinstance.atlassian.net
     * @returns
     */
    public static async ENV_getBaseHref(): Promise<string> {

        return new Promise((ok, nok) => {
            AP.env.getLocation(function (response: string) {

                let baseHrefMatch = response.match(/(https:\/\/.*atlassian.net)\/.*/i);
                if (baseHrefMatch && baseHrefMatch[1])
                    ok(baseHrefMatch[1]);
                else
                    nok()

            });
        });


    }


    /**
     * Returns the current User, e.g. ???
     * @returns
     */
    public static async ENV_getCurrentUser(): Promise<string> {
        return new Promise((ok, nok) => {
            AP.env.getCurrentUser(function (response: string) {
                ok(response);
            });
        });
    }




}