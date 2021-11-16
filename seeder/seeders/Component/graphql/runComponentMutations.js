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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runComponentMutations = void 0;
const data_fetcher_1 = require("../../../data-fetcher");
function runComponentMutations(remoteComponents, localComponents) {
    return __awaiter(this, void 0, void 0, function* () {
        const mutationPromises = localComponents.map((component) => {
            const existingComponent = remoteComponents.find((c) => c.name === component.name);
            if (existingComponent) {
                console.log(`🔄 Updating existing component entry for ${component.name}`);
                const { type } = component, componentWithoutType = __rest(component, ["type"]);
                if (existingComponent.type !== component.type) {
                    console.log(`⚠️ Type of ${component.name} (${existingComponent.id}), was ${existingComponent.type} remotely, but is ${type} locally, seeder does not support updating component type`);
                }
                return data_fetcher_1.request(updateComponentMutation, {
                    id: existingComponent.id,
                    component: Object.assign(Object.assign({}, componentWithoutType), { fields: existingComponent.fields }),
                });
            }
            console.log(`⬆️ Creating new component entry for ${component.name}`);
            return data_fetcher_1.request(createComponentMutation, { component });
        });
        const response = yield Promise.all(mutationPromises);
        return getCreatedComponentMap(response);
    });
}
exports.runComponentMutations = runComponentMutations;
const createComponentMutation = `
  mutation CreateComponent($component: CreateComponent!) {
    createComponent(component: $component) {
      id
      name
      currentVersionId: currentVersionID
      fields {
        id
        name
        cmsModelID
      }
    }
  }
`;
const updateComponentMutation = `
  mutation UpdateComponent($id: ID!, $component: UpdateComponent!) {
    updateComponent(id: $id, component: $component) {
      id
      name
      currentVersionId: currentVersionID
      fields {
        id
        name
        cmsModelID
      }
    }
  }
`;
function getCreatedComponentMap(responses) {
    return responses.reduce((obj, response) => {
        const { id, currentVersionId, name, fields } = response.createComponent ||
            response.updateComponent;
        obj[name] = {
            id,
            currentVersionId,
            cmsModelId: Array.isArray(fields) && fields.length ? fields[0].cmsModelId : '',
            fields,
        };
        return obj;
    }, {});
}
