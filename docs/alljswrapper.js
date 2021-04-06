"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JiraAllJSWrapper = exports.JiraIssueSearchFronendAPI = exports.PartialResult = void 0;
/**
 * PartialResult
 * Used when we query for IssueKeys, but some of them cannot be found in JIRA
 */
class PartialResult {
    constructor(init) {
        this.missing = [];
        this.found = init;
    }
}
exports.PartialResult = PartialResult;
class JiraIssueSearchFronendAPI {
    static simpleDemo(projectKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
            // https://developer.atlassian.com/cloud/jira/software/jsapi/request/
            return new Promise(function (ok, nok) {
                return __awaiter(this, void 0, void 0, function* () {
                    let url = `/rest/api/3/search?jql=projectkey is '${projectKey}'&fields=id,key,summary,issuetype,resolution,status,description,project`;
                    url += "&validateQuery=false";
                    AP.request(url, {
                        type: "GET",
                        success: function (responseText) {
                            let json = JSON.parse(responseText);
                            ok(json["issues"]);
                        },
                        error: function (xhr, statusText, errorThrown) {
                            nok(statusText);
                        }
                    });
                });
            });
        });
    }
    static getIssueMetadata(issueKeys, expandFields = [], validateQuery = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
            // https://developer.atlassian.com/cloud/jira/software/jsapi/request/
            return new Promise(function (ok, nok) {
                return __awaiter(this, void 0, void 0, function* () {
                    let jql = `issueKey in (${issueKeys.join(',')})`;
                    let url = `/rest/api/3/search?jql=${jql}&fields=id,key,summary,issuetype,resolution,status,description,project`;
                    url += "&validateQuery=" + validateQuery;
                    if (expandFields && expandFields.length > 0)
                        url += `&expand=` + expandFields.join(",");
                    AP.request(url, {
                        type: "GET",
                        success: function (responseText) {
                            let json = JSON.parse(responseText);
                            //collect found results
                            let result = new PartialResult(new Map());
                            result.found = new Map();
                            json.issues.forEach((issue) => {
                                result.found.set(issue.key, issue);
                            }, this);
                            //collect missing results
                            issueKeys.forEach((key) => {
                                if (false == result.found.has(key))
                                    result.missing.push(key);
                            }, this);
                            ok(result);
                        },
                        error: function (xhr, statusText, errorThrown) {
                            nok(statusText);
                        }
                    });
                });
            });
        });
    }
}
exports.JiraIssueSearchFronendAPI = JiraIssueSearchFronendAPI;
class JiraAllJSWrapper {
    /**********************************************************************
     * AP.context
     *
     **********************************************************************/
    static CONTEXT_getContext() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, nok) => {
                AP.env.getContext(function (response) {
                    ok(response);
                });
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
    static ENV_getCurrentLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, nok) => {
                AP.env.getLocation(function (response) {
                    ok(response);
                });
            });
        });
    }
    /**
     * Returns the baseHref, e.g. https://myinstance.atlassian.net
     * @returns
     */
    static ENV_getBaseHref() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, nok) => {
                AP.env.getLocation(function (response) {
                    let baseHrefMatch = response.match(/(https:\/\/.*atlassian.net)\/.*/i);
                    if (baseHrefMatch && baseHrefMatch[1])
                        ok(baseHrefMatch[1]);
                    else
                        nok();
                });
            });
        });
    }
    /**
     * Returns the current User, e.g. ???
     * @returns
     */
    static ENV_getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, nok) => {
                AP.env.getCurrentUser(function (response) {
                    ok(response);
                });
            });
        });
    }
}
exports.JiraAllJSWrapper = JiraAllJSWrapper;
