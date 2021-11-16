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
exports.getAllRemoteComponents = void 0;
const data_fetcher_1 = require("../../../data-fetcher");
const allComponentsQuery = `
  query AllRemoteComponents {
    data: components(after: "", first: 500) {
      allComponents: edges {
        component: node {
          id
          name
          type
          fields {
            id
            name
            type
            required
            localized
            visible
            placeholder
            options {
              itemType
              referencedCmsModelID
              selectedFields
            }
          }
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`
function isHubComponent(name) {
  const HUB_COMPONENTS = ['dropzone']
  return HUB_COMPONENTS.includes(name)
}
function getAllRemoteComponents() {
  return __awaiter(this, void 0, void 0, function*() {
    const { data } = yield data_fetcher_1.request(allComponentsQuery)
    return data.allComponents.map(data => data.component).filter(component => !isHubComponent(component.name))
  })
}
exports.getAllRemoteComponents = getAllRemoteComponents
