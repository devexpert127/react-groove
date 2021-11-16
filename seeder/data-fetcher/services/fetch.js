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
exports.fetch = void 0;
const graphql_request_1 = require("graphql-request");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetch(query, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = process.env.HUB_CORE_QUERY_URL || '';
        const graphQLClient = new graphql_request_1.GraphQLClient(endpoint, {
            headers: {
                Authorization: `Bearer ${process.env.HUB_CORE_JWT}`,
                SiteID: `${process.env.SITE_ID}`,
            },
        });
        return graphQLClient.request(query, variables);
    });
}
exports.fetch = fetch;
