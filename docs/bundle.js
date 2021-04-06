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
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaXJhLWFsbGpzLXRzLWRlbW8vLi9zcmMvYWxsanN3cmFwcGVyLnRzIiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qaXJhLWFsbGpzLXRzLWRlbW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ppcmEtYWxsanMtdHMtZGVtby8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOzs7R0FHRztBQUNIO0lBSUksdUJBQVksSUFBaUI7UUFGN0IsWUFBTyxHQUFlLEVBQUUsQ0FBQztRQUdyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDOztBQUdEO0lBQUE7SUErRUEsQ0FBQztJQTNFdUIsb0NBQVUsR0FBOUIsVUFBK0IsVUFBa0I7OztnQkFFN0MsZ0hBQWdIO2dCQUNoSCxxRUFBcUU7Z0JBRXJFLHNCQUFPLElBQUksT0FBTyxDQUFjLFVBQWdCLEVBQUUsRUFBRSxHQUFHOzs7O2dDQUUvQyxHQUFHLEdBQUcsMkNBQXlDLFVBQVUsNEVBQXlFLENBQUM7Z0NBQ3ZJLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQztnQ0FFOUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0NBQ1osSUFBSSxFQUFFLEtBQUs7b0NBQ1gsT0FBTyxFQUFFLFVBQVUsWUFBb0I7d0NBQ25DLElBQUksSUFBSSxHQUFr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LGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04yRDtBQUczRCxJQUFNLGFBQWEsR0FBRyxVQUFPLFVBQWtCOzs7O29CQUM5QixxQkFBTSwrRUFBb0MsQ0FBQyxVQUFVLENBQUM7O2dCQUEvRCxNQUFNLEdBQUcsU0FBc0Q7Z0JBQ25FLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7S0FDekU7QUFHRCxJQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlELElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0MsSUFBRyxVQUFVLEVBQUU7Q0FFZCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZGVjbGFyZSB2YXIgQVA6IGFueTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsSlMgLyBSZXF1ZXN0IC8gU2ltcGxlIERlbW8gICAgICAgICAgICAgICAgICAgICAqL1xyXG4vKiAqIGh0dHBzOi8vZGV2ZWxvcGVyLmF0bGFzc2lhbi5jb20vY2xvdWQvamlyYS9zb2Z0d2FyZS9qc2FwaS9yZXF1ZXN0LyAgICAgICAqL1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG50eXBlIElzc3VlQmVhbiA9IGFueTsvL3F1aWNrZml4XHJcbnR5cGUgU2VhcmNoUmVzdWx0cyA9IGFueTsvL3F1aWNrZml4XHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogUGFydGlhbFJlc3VsdFxyXG4gKiBVc2VkIHdoZW4gd2UgcXVlcnkgZm9yIElzc3VlS2V5cywgYnV0IHNvbWUgb2YgdGhlbSBjYW5ub3QgYmUgZm91bmQgaW4gSklSQVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhcnRpYWxSZXN1bHQ8S0VZX1RZUEUsIFJFU1VMVF9UWVBFPiB7XHJcbiAgICBmb3VuZDogUkVTVUxUX1RZUEU7XHJcbiAgICBtaXNzaW5nOiBLRVlfVFlQRVtdID0gW107XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGluaXQ6IFJFU1VMVF9UWVBFKSB7XHJcbiAgICAgICAgdGhpcy5mb3VuZCA9IGluaXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSmlyYUlzc3VlU2VhcmNoRnJvbmVuZEFQSSB7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIHNpbXBsZURlbW8ocHJvamVjdEtleTogc3RyaW5nKTogUHJvbWlzZTxJc3N1ZUJlYW5bXT4ge1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5hdGxhc3NpYW4uY29tL2Nsb3VkL2ppcmEvcGxhdGZvcm0vcmVzdC92My9hcGktZ3JvdXAtaXNzdWUtc2VhcmNoLyNhcGktcmVzdC1hcGktMy1zZWFyY2gtZ2V0XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXRsYXNzaWFuLmNvbS9jbG91ZC9qaXJhL3NvZnR3YXJlL2pzYXBpL3JlcXVlc3QvXHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJc3N1ZUJlYW5bXT4oYXN5bmMgZnVuY3Rpb24gKG9rLCBub2spIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBgL3Jlc3QvYXBpLzMvc2VhcmNoP2pxbD1wcm9qZWN0a2V5IGlzICcke3Byb2plY3RLZXl9JyZmaWVsZHM9aWQsa2V5LHN1bW1hcnksaXNzdWV0eXBlLHJlc29sdXRpb24sc3RhdHVzLGRlc2NyaXB0aW9uLHByb2plY3RgO1xyXG4gICAgICAgICAgICB1cmwgKz0gXCImdmFsaWRhdGVRdWVyeT1mYWxzZVwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQVAucmVxdWVzdCh1cmwsIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2VUZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogU2VhcmNoUmVzdWx0cyA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBvayhqc29uW1wiaXNzdWVzXCJdKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXNUZXh0LCBlcnJvclRocm93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vayhzdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRJc3N1ZU1ldGFkYXRhKGlzc3VlS2V5czogc3RyaW5nW10sIGV4cGFuZEZpZWxkczogKFwicmVuZGVyZWRGaWVsZHNcIiB8IFwidHJhbnNpdGlvbnNcIilbXSA9IFtdLCB2YWxpZGF0ZVF1ZXJ5OiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFBhcnRpYWxSZXN1bHQ8c3RyaW5nLCBNYXA8c3RyaW5nLCBJc3N1ZUJlYW4+Pj4ge1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5hdGxhc3NpYW4uY29tL2Nsb3VkL2ppcmEvcGxhdGZvcm0vcmVzdC92My9hcGktZ3JvdXAtaXNzdWUtc2VhcmNoLyNhcGktcmVzdC1hcGktMy1zZWFyY2gtZ2V0XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXRsYXNzaWFuLmNvbS9jbG91ZC9qaXJhL3NvZnR3YXJlL2pzYXBpL3JlcXVlc3QvXHJcblxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8UGFydGlhbFJlc3VsdDxzdHJpbmcsIE1hcDxzdHJpbmcsIElzc3VlQmVhbj4+Pihhc3luYyBmdW5jdGlvbiAob2ssIG5vaykge1xyXG5cclxuICAgICAgICAgICAgbGV0IGpxbCA9IGBpc3N1ZUtleSBpbiAoJHtpc3N1ZUtleXMuam9pbignLCcpfSlgO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gYC9yZXN0L2FwaS8zL3NlYXJjaD9qcWw9JHtqcWx9JmZpZWxkcz1pZCxrZXksc3VtbWFyeSxpc3N1ZXR5cGUscmVzb2x1dGlvbixzdGF0dXMsZGVzY3JpcHRpb24scHJvamVjdGA7XHJcbiAgICAgICAgICAgIHVybCArPSBcIiZ2YWxpZGF0ZVF1ZXJ5PVwiICsgdmFsaWRhdGVRdWVyeTtcclxuICAgICAgICAgICAgaWYgKGV4cGFuZEZpZWxkcyAmJiBleHBhbmRGaWVsZHMubGVuZ3RoID4gMCkgdXJsICs9IGAmZXhwYW5kPWAgKyBleHBhbmRGaWVsZHMuam9pbihcIixcIik7XHJcblxyXG4gICAgICAgICAgICBBUC5yZXF1ZXN0KHVybCwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZVRleHQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQganNvbjogU2VhcmNoUmVzdWx0cyA9IEpTT04ucGFyc2UocmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2xsZWN0IGZvdW5kIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IFBhcnRpYWxSZXN1bHQ8c3RyaW5nLCBNYXA8c3RyaW5nLCBJc3N1ZUJlYW4+PihuZXcgTWFwKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3VuZCA9IG5ldyBNYXA8c3RyaW5nLCBJc3N1ZUJlYW4+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAganNvbi5pc3N1ZXMuZm9yRWFjaCgoaXNzdWU6IElzc3VlQmVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm91bmQuc2V0KGlzc3VlLmtleSwgaXNzdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2NvbGxlY3QgbWlzc2luZyByZXN1bHRzXHJcbiAgICAgICAgICAgICAgICAgICAgaXNzdWVLZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFsc2UgPT0gcmVzdWx0LmZvdW5kLmhhcyhrZXkpKSByZXN1bHQubWlzc2luZy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9rKHJlc3VsdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1c1RleHQsIGVycm9yVGhyb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9rKHN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4vKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGxKUyAvIENvbnRleHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xyXG4vKiBodHRwczovL2RldmVsb3Blci5hdGxhc3NpYW4uY29tL2Nsb3VkL2ppcmEvc29mdHdhcmUvanNhcGkvY29udGV4dC8gICAgICAgICAqL1xyXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBUENvbnRleHQge1xyXG4gICAgamlyYT86IHtcclxuICAgICAgICBpc3N1ZToge1xyXG4gICAgICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgICAgICBpc3N1ZXR5cGU6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBzdHJpbmdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvamVjdDoge1xyXG4gICAgICAgICAgICBpZDogc3RyaW5nLFxyXG4gICAgICAgICAgICBrZXk6IHN0cmluZ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSmlyYUFsbEpTV3JhcHBlciB7XHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgKiBBUC5jb250ZXh0XHJcbiAgICAgKlxyXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIENPTlRFWFRfZ2V0Q29udGV4dCgpOiBQcm9taXNlPEFQQ29udGV4dD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIG5vaykgPT4ge1xyXG4gICAgICAgICAgICBBUC5lbnYuZ2V0Q29udGV4dChmdW5jdGlvbiAocmVzcG9uc2U6IEFQQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgb2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICogQVAuZW52XHJcbiAgICAgKiBcclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29tcGxldGUgVXJsLCBlLmcuIGh0dHBzOi8vbXlpbnN0YW5jZS5hdGxhc3NpYW4ubmV0L2Jyb3dzZS9JU1NVRS01XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIEVOVl9nZXRDdXJyZW50TG9jYXRpb24oKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKG9rLCBub2spID0+IHtcclxuICAgICAgICAgICAgQVAuZW52LmdldExvY2F0aW9uKGZ1bmN0aW9uIChyZXNwb25zZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBvayhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgYmFzZUhyZWYsIGUuZy4gaHR0cHM6Ly9teWluc3RhbmNlLmF0bGFzc2lhbi5uZXRcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgRU5WX2dldEJhc2VIcmVmKCk6IFByb21pc2U8c3RyaW5nPiB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIG5vaykgPT4ge1xyXG4gICAgICAgICAgICBBUC5lbnYuZ2V0TG9jYXRpb24oZnVuY3Rpb24gKHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFzZUhyZWZNYXRjaCA9IHJlc3BvbnNlLm1hdGNoKC8oaHR0cHM6XFwvXFwvLiphdGxhc3NpYW4ubmV0KVxcLy4qL2kpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2VIcmVmTWF0Y2ggJiYgYmFzZUhyZWZNYXRjaFsxXSlcclxuICAgICAgICAgICAgICAgICAgICBvayhiYXNlSHJlZk1hdGNoWzFdKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBub2soKVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IFVzZXIsIGUuZy4gPz8/XHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIEVOVl9nZXRDdXJyZW50VXNlcigpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgob2ssIG5vaykgPT4ge1xyXG4gICAgICAgICAgICBBUC5lbnYuZ2V0Q3VycmVudFVzZXIoZnVuY3Rpb24gKHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIG9rKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBKaXJhSXNzdWVTZWFyY2hGcm9uZW5kQVBJIH0gZnJvbSBcIi4vYWxsanN3cmFwcGVyXCI7XHJcblxyXG5cclxuY29uc3QgcmVmcmVzaElzc3VlcyA9IGFzeW5jIChwcm9qZWN0S2V5OiBzdHJpbmcpID0+IHtcclxuICAgIGxldCBpc3N1ZXMgPSBhd2FpdCBKaXJhSXNzdWVTZWFyY2hGcm9uZW5kQVBJLnNpbXBsZURlbW8ocHJvamVjdEtleSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdHNcIikuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkoaXNzdWVzKTtcclxufVxyXG5cclxuXHJcbmNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbmxldCBwcm9qZWN0S2V5ID0gdXJsUGFyYW1zLmdldChcInByb2plY3RLZXlcIik7XHJcbmlmKHByb2plY3RLZXkpIHtcclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=