var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { JiraIssueSearchFronendAPI } from "./alljswrapper";
const refreshIssues = (projectKey) => __awaiter(void 0, void 0, void 0, function* () {
    let issues = yield JiraIssueSearchFronendAPI.simpleDemo(projectKey);
    document.getElementById("results").innerHTML = JSON.stringify(issues);
});
const urlParams = new URLSearchParams(window.location.search);
let projectKey = urlParams.get("projectKey");
if (projectKey) {
}
