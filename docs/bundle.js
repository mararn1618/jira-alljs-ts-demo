/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/alljswrapper.ts":
/*!*****************************!*\
  !*** ./src/alljswrapper.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PartialResult": () => (/* binding */ PartialResult),
/* harmony export */   "JiraIssueSearchFronendAPI": () => (/* binding */ JiraIssueSearchFronendAPI),
/* harmony export */   "JiraAllJSWrapper": () => (/* binding */ JiraAllJSWrapper)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * PartialResult
 * Used when we query for IssueKeys, but some of them cannot be found in JIRA
 */
var PartialResult = /** @class */ (function () {
    function PartialResult(init) {
        this.missing = [];
        this.found = init;
    }
    return PartialResult;
}());

var JiraIssueSearchFronendAPI = /** @class */ (function () {
    function JiraIssueSearchFronendAPI() {
    }
    JiraIssueSearchFronendAPI.simpleDemo = function (projectKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
                // https://developer.atlassian.com/cloud/jira/software/jsapi/request/
                return [2 /*return*/, new Promise(function (ok, nok) {
                        return __awaiter(this, void 0, void 0, function () {
                            var url;
                            return __generator(this, function (_a) {
                                url = "/rest/api/3/search?jql=projectkey is '" + projectKey + "'&fields=id,key,summary,issuetype,resolution,status,description,project";
                                url += "&validateQuery=false";
                                AP.request(url, {
                                    type: "GET",
                                    success: function (responseText) {
                                        var json = JSON.parse(responseText);
                                        ok(json["issues"]);
                                    },
                                    error: function (xhr, statusText, errorThrown) {
                                        nok(statusText);
                                    }
                                });
                                return [2 /*return*/];
                            });
                        });
                    })];
            });
        });
    };
    JiraIssueSearchFronendAPI.getIssueMetadata = function (issueKeys, expandFields, validateQuery) {
        if (expandFields === void 0) { expandFields = []; }
        if (validateQuery === void 0) { validateQuery = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get
                // https://developer.atlassian.com/cloud/jira/software/jsapi/request/
                return [2 /*return*/, new Promise(function (ok, nok) {
                        return __awaiter(this, void 0, void 0, function () {
                            var jql, url;
                            return __generator(this, function (_a) {
                                jql = "issueKey in (" + issueKeys.join(',') + ")";
                                url = "/rest/api/3/search?jql=" + jql + "&fields=id,key,summary,issuetype,resolution,status,description,project";
                                url += "&validateQuery=" + validateQuery;
                                if (expandFields && expandFields.length > 0)
                                    url += "&expand=" + expandFields.join(",");
                                AP.request(url, {
                                    type: "GET",
                                    success: function (responseText) {
                                        var json = JSON.parse(responseText);
                                        //collect found results
                                        var result = new PartialResult(new Map());
                                        result.found = new Map();
                                        json.issues.forEach(function (issue) {
                                            result.found.set(issue.key, issue);
                                        }, this);
                                        //collect missing results
                                        issueKeys.forEach(function (key) {
                                            if (false == result.found.has(key))
                                                result.missing.push(key);
                                        }, this);
                                        ok(result);
                                    },
                                    error: function (xhr, statusText, errorThrown) {
                                        nok(statusText);
                                    }
                                });
                                return [2 /*return*/];
                            });
                        });
                    })];
            });
        });
    };
    return JiraIssueSearchFronendAPI;
}());

var JiraAllJSWrapper = /** @class */ (function () {
    function JiraAllJSWrapper() {
    }
    /**********************************************************************
     * AP.context
     *
     **********************************************************************/
    JiraAllJSWrapper.CONTEXT_getContext = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (ok, nok) {
                        AP.env.getContext(function (response) {
                            ok(response);
                        });
                    })];
            });
        });
    };
    /**********************************************************************
     * AP.env
     *
     **********************************************************************/
    /**
     * Returns the complete Url, e.g. https://myinstance.atlassian.net/browse/ISSUE-5
     * @returns
     */
    JiraAllJSWrapper.ENV_getCurrentLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (ok, nok) {
                        AP.env.getLocation(function (response) {
                            ok(response);
                        });
                    })];
            });
        });
    };
    /**
     * Returns the baseHref, e.g. https://myinstance.atlassian.net
     * @returns
     */
    JiraAllJSWrapper.ENV_getBaseHref = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (ok, nok) {
                        AP.env.getLocation(function (response) {
                            var baseHrefMatch = response.match(/(https:\/\/.*atlassian.net)\/.*/i);
                            if (baseHrefMatch && baseHrefMatch[1])
                                ok(baseHrefMatch[1]);
                            else
                                nok();
                        });
                    })];
            });
        });
    };
    /**
     * Returns the current User, e.g. ???
     * @returns
     */
    JiraAllJSWrapper.ENV_getCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (ok, nok) {
                        AP.env.getCurrentUser(function (response) {
                            ok(response);
                        });
                    })];
            });
        });
    };
    return JiraAllJSWrapper;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _alljswrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alljswrapper */ "./src/alljswrapper.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var refreshIssues = function (projectKey) { return __awaiter(void 0, void 0, void 0, function () {
    var issues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _alljswrapper__WEBPACK_IMPORTED_MODULE_0__.JiraIssueSearchFronendAPI.simpleDemo(projectKey)];
            case 1:
                issues = _a.sent();
                document.getElementById("results").innerHTML = JSON.stringify(issues);
                return [2 /*return*/];
        }
    });
}); };
var urlParams = new URLSearchParams(window.location.search);
var projectKey = urlParams.get("projectKey");
if (projectKey) {
    refreshIssues(projectKey);
}
else {
    document.getElementById("results").innerHTML = "Please specify ?projectKey=XXXX";
}
//current problem:
// - atlassian wants to POST to /installed, but we just have static html pages on github pages

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaXJhLWFsbGpzLXRzLWRlbW8vLi9zcmMvYWxsanN3cmFwcGVyLnRzIiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qaXJhLWFsbGpzLXRzLWRlbW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOzs7R0FHRztBQUNIO0lBSUksdUJBQVksSUFBaUI7UUFGN0IsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUdyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDOztBQUdEO0lBQUE7SUErRUEsQ0FBQztJQTNFdUIsb0NBQVUsR0FBOUIsVUFBK0IsVUFBa0I7OztnQkFFN0MsZ0hBQWdIO2dCQUNoSCxxRUFBcUU7Z0JBRXJFLHNCQUFPLElBQUksT0FBTyxDQUFjLFVBQWdCLEVBQUUsRUFBRSxHQUFHOzs7O2dDQUUvQyxHQUFHLEdBQUcsMkNBQXlDLFVBQVUsNEVBQXlFLENBQUM7Z0NBQ3ZJLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQztnQ0FFOUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0NBQ1osSUFBSSxFQUFFLEtBQUs7b0NBQ1gsT0FBTyxFQUFFLFVBQVUsWUFBb0I7d0NBQ25DLElBQUksSUFBSSxHQUFr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LGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04yRDtBQUczRCxJQUFNLGFBQWEsR0FBRyxVQUFPLFVBQWtCOzs7O29CQUM5QixxQkFBTSwrRUFBb0MsQ0FBQyxVQUFVLENBQUM7O2dCQUEvRCxNQUFNLEdBQUcsU0FBc0Q7Z0JBQ25FLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7S0FDekU7QUFHRCxJQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0MsSUFBSSxVQUFVLEVBQUU7SUFDWixhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7Q0FDN0I7S0FBTTtJQUNILFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxHQUFHLGlDQUFpQztDQUNuRjtBQUlELGtCQUFrQjtBQUNsQiw4RkFBOEYiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmRlY2xhcmUgdmFyIEFQOiBhbnk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuLyogICAgICAgICAgICAgICAgICAgICAgICAgIEFsbEpTIC8gUmVxdWVzdCAvIFNpbXBsZSBEZW1vICAgICAgICAgICAgICAgICAgICAgKi9cclxuLyogKiBodHRwczovL2RldmVsb3Blci5hdGxhc3NpYW4uY29tL2Nsb3VkL2ppcmEvc29mdHdhcmUvanNhcGkvcmVxdWVzdC8gICAgICAgKi9cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxudHlwZSBJc3N1ZUJlYW4gPSBhbnk7Ly9xdWlja2ZpeFxyXG50eXBlIFNlYXJjaFJlc3VsdHMgPSBhbnk7Ly9xdWlja2ZpeFxyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFBhcnRpYWxSZXN1bHRcclxuICogVXNlZCB3aGVuIHdlIHF1ZXJ5IGZvciBJc3N1ZUtleXMsIGJ1dCBzb21lIG9mIHRoZW0gY2Fubm90IGJlIGZvdW5kIGluIEpJUkFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYXJ0aWFsUmVzdWx0PEtFWV9UWVBFLCBSRVNVTFRfVFlQRT4ge1xyXG4gICAgZm91bmQ6IFJFU1VMVF9UWVBFO1xyXG4gICAgbWlzc2luZzogS0VZX1RZUEVbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihpbml0OiBSRVNVTFRfVFlQRSkge1xyXG4gICAgICAgIHRoaXMuZm91bmQgPSBpbml0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEppcmFJc3N1ZVNlYXJjaEZyb25lbmRBUEkge1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBzaW1wbGVEZW1vKHByb2plY3RLZXk6IHN0cmluZyk6IFByb21pc2U8SXNzdWVCZWFuW10+IHtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXRsYXNzaWFuLmNvbS9jbG91ZC9qaXJhL3BsYXRmb3JtL3Jlc3QvdjMvYXBpLWdyb3VwLWlzc3VlLXNlYXJjaC8jYXBpLXJlc3QtYXBpLTMtc2VhcmNoLWdldFxyXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmF0bGFzc2lhbi5jb20vY2xvdWQvamlyYS9zb2Z0d2FyZS9qc2FwaS9yZXF1ZXN0L1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SXNzdWVCZWFuW10+KGFzeW5jIGZ1bmN0aW9uIChvaywgbm9rKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdXJsID0gYC9yZXN0L2FwaS8zL3NlYXJjaD9qcWw9cHJvamVjdGtleSBpcyAnJHtwcm9qZWN0S2V5fScmZmllbGRzPWlkLGtleSxzdW1tYXJ5LGlzc3VldHlwZSxyZXNvbHV0aW9uLHN0YXR1cyxkZXNjcmlwdGlvbixwcm9qZWN0YDtcclxuICAgICAgICAgICAgdXJsICs9IFwiJnZhbGlkYXRlUXVlcnk9ZmFsc2VcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEFQLnJlcXVlc3QodXJsLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlVGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IFNlYXJjaFJlc3VsdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2soanNvbltcImlzc3Vlc1wiXSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzVGV4dCwgZXJyb3JUaHJvd24pIHtcclxuICAgICAgICAgICAgICAgICAgICBub2soc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0SXNzdWVNZXRhZGF0YShpc3N1ZUtleXM6IHN0cmluZ1tdLCBleHBhbmRGaWVsZHM6IChcInJlbmRlcmVkRmllbGRzXCIgfCBcInRyYW5zaXRpb25zXCIpW10gPSBbXSwgdmFsaWRhdGVRdWVyeTogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxQYXJ0aWFsUmVzdWx0PHN0cmluZywgTWFwPHN0cmluZywgSXNzdWVCZWFuPj4+IHtcclxuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXRsYXNzaWFuLmNvbS9jbG91ZC9qaXJhL3BsYXRmb3JtL3Jlc3QvdjMvYXBpLWdyb3VwLWlzc3VlLXNlYXJjaC8jYXBpLXJlc3QtYXBpLTMtc2VhcmNoLWdldFxyXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmF0bGFzc2lhbi5jb20vY2xvdWQvamlyYS9zb2Z0d2FyZS9qc2FwaS9yZXF1ZXN0L1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFBhcnRpYWxSZXN1bHQ8c3RyaW5nLCBNYXA8c3RyaW5nLCBJc3N1ZUJlYW4+Pj4oYXN5bmMgZnVuY3Rpb24gKG9rLCBub2spIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBqcWwgPSBgaXNzdWVLZXkgaW4gKCR7aXNzdWVLZXlzLmpvaW4oJywnKX0pYDtcclxuICAgICAgICAgICAgbGV0IHVybCA9IGAvcmVzdC9hcGkvMy9zZWFyY2g/anFsPSR7anFsfSZmaWVsZHM9aWQsa2V5LHN1bW1hcnksaXNzdWV0eXBlLHJlc29sdXRpb24sc3RhdHVzLGRlc2NyaXB0aW9uLHByb2plY3RgO1xyXG4gICAgICAgICAgICB1cmwgKz0gXCImdmFsaWRhdGVRdWVyeT1cIiArIHZhbGlkYXRlUXVlcnk7XHJcbiAgICAgICAgICAgIGlmIChleHBhbmRGaWVsZHMgJiYgZXhwYW5kRmllbGRzLmxlbmd0aCA+IDApIHVybCArPSBgJmV4cGFuZD1gICsgZXhwYW5kRmllbGRzLmpvaW4oXCIsXCIpO1xyXG5cclxuICAgICAgICAgICAgQVAucmVxdWVzdCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VUZXh0OiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpzb246IFNlYXJjaFJlc3VsdHMgPSBKU09OLnBhcnNlKHJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29sbGVjdCBmb3VuZCByZXN1bHRzXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBQYXJ0aWFsUmVzdWx0PHN0cmluZywgTWFwPHN0cmluZywgSXNzdWVCZWFuPj4obmV3IE1hcCgpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm91bmQgPSBuZXcgTWFwPHN0cmluZywgSXNzdWVCZWFuPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb24uaXNzdWVzLmZvckVhY2goKGlzc3VlOiBJc3N1ZUJlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmZvdW5kLnNldChpc3N1ZS5rZXksIGlzc3VlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2xsZWN0IG1pc3NpbmcgcmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgICAgIGlzc3VlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlID09IHJlc3VsdC5mb3VuZC5oYXMoa2V5KSkgcmVzdWx0Lm1pc3NpbmcucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvayhyZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXNUZXh0LCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vayhzdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuLyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsSlMgLyBDb250ZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuLyogaHR0cHM6Ly9kZXZlbG9wZXIuYXRsYXNzaWFuLmNvbS9jbG91ZC9qaXJhL3NvZnR3YXJlL2pzYXBpL2NvbnRleHQvICAgICAgICAgKi9cclxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQVBDb250ZXh0IHtcclxuICAgIGppcmE/OiB7XHJcbiAgICAgICAgaXNzdWU6IHtcclxuICAgICAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICAgICAgaXNzdWV0eXBlOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogc3RyaW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2plY3Q6IHtcclxuICAgICAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICAgICAga2V5OiBzdHJpbmdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEppcmFBbGxKU1dyYXBwZXIge1xyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICogQVAuY29udGV4dFxyXG4gICAgICpcclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBDT05URVhUX2dldENvbnRleHQoKTogUHJvbWlzZTxBUENvbnRleHQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBub2spID0+IHtcclxuICAgICAgICAgICAgQVAuZW52LmdldENvbnRleHQoZnVuY3Rpb24gKHJlc3BvbnNlOiBBUENvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIG9rKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAqIEFQLmVudlxyXG4gICAgICogXHJcbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbXBsZXRlIFVybCwgZS5nLiBodHRwczovL215aW5zdGFuY2UuYXRsYXNzaWFuLm5ldC9icm93c2UvSVNTVUUtNVxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBFTlZfZ2V0Q3VycmVudExvY2F0aW9uKCk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChvaywgbm9rKSA9PiB7XHJcbiAgICAgICAgICAgIEFQLmVudi5nZXRMb2NhdGlvbihmdW5jdGlvbiAocmVzcG9uc2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgb2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGJhc2VIcmVmLCBlLmcuIGh0dHBzOi8vbXlpbnN0YW5jZS5hdGxhc3NpYW4ubmV0XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIEVOVl9nZXRCYXNlSHJlZigpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBub2spID0+IHtcclxuICAgICAgICAgICAgQVAuZW52LmdldExvY2F0aW9uKGZ1bmN0aW9uIChyZXNwb25zZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJhc2VIcmVmTWF0Y2ggPSByZXNwb25zZS5tYXRjaCgvKGh0dHBzOlxcL1xcLy4qYXRsYXNzaWFuLm5ldClcXC8uKi9pKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlSHJlZk1hdGNoICYmIGJhc2VIcmVmTWF0Y2hbMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgb2soYmFzZUhyZWZNYXRjaFsxXSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgbm9rKClcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBVc2VyLCBlLmcuID8/P1xyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBFTlZfZ2V0Q3VycmVudFVzZXIoKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBub2spID0+IHtcclxuICAgICAgICAgICAgQVAuZW52LmdldEN1cnJlbnRVc2VyKGZ1bmN0aW9uIChyZXNwb25zZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBvayhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgSmlyYUlzc3VlU2VhcmNoRnJvbmVuZEFQSSB9IGZyb20gXCIuL2FsbGpzd3JhcHBlclwiO1xyXG5cclxuXHJcbmNvbnN0IHJlZnJlc2hJc3N1ZXMgPSBhc3luYyAocHJvamVjdEtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBsZXQgaXNzdWVzID0gYXdhaXQgSmlyYUlzc3VlU2VhcmNoRnJvbmVuZEFQSS5zaW1wbGVEZW1vKHByb2plY3RLZXkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRzXCIpLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGlzc3Vlcyk7XHJcbn1cclxuXHJcblxyXG5jb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5sZXQgcHJvamVjdEtleSA9IHVybFBhcmFtcy5nZXQoXCJwcm9qZWN0S2V5XCIpO1xyXG5pZiAocHJvamVjdEtleSkge1xyXG4gICAgcmVmcmVzaElzc3Vlcyhwcm9qZWN0S2V5KTtcclxufSBlbHNlIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0c1wiKS5pbm5lckhUTUwgPSBcIlBsZWFzZSBzcGVjaWZ5ID9wcm9qZWN0S2V5PVhYWFhcIlxyXG59XHJcblxyXG5cclxuXHJcbi8vY3VycmVudCBwcm9ibGVtOlxyXG4vLyAtIGF0bGFzc2lhbiB3YW50cyB0byBQT1NUIHRvIC9pbnN0YWxsZWQsIGJ1dCB3ZSBqdXN0IGhhdmUgc3RhdGljIGh0bWwgcGFnZXMgb24gZ2l0aHViIHBhZ2VzIl0sInNvdXJjZVJvb3QiOiIifQ==