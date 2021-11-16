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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentSeeder = void 0;
const path_1 = __importDefault(require("path"));
const getDirContent_1 = require("../../utils/getDirContent");
const getComponentFiles_1 = require("./getComponentFiles");
const graphql_1 = require("./graphql");
function componentSeeder(componentSourcesRootDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const [sectionComponentsPath, nestedComponentsPath] = ['sections', 'components'].map((name) => path_1.default.join(componentSourcesRootDir, name));
        const [sectionComponentNames, nestedComponentNames] = yield Promise.all([
            getDirContent_1.getDirContent({ path: sectionComponentsPath, discardFiles: true }),
            getDirContent_1.getDirContent({ path: nestedComponentsPath, discardFiles: true }),
        ]);
        const [localSectionComponents, localNestedComponents] = yield Promise.all([
            getComponentFiles_1.getComponentFiles(sectionComponentsPath, sectionComponentNames, 'section'),
            getComponentFiles_1.getComponentFiles(nestedComponentsPath, nestedComponentNames, 'nested'),
        ]);
        const localComponents = [...localSectionComponents, ...localNestedComponents];
        const remoteComponents = yield graphql_1.getAllRemoteComponents();
        const createdComponentMap = yield graphql_1.runComponentMutations(remoteComponents, localComponents);
        remoteComponents.forEach((remoteComponent) => {
            if (!localComponents.find((lc) => lc.name === remoteComponent.name)) {
                console.log(`⛔️ Component ${remoteComponent.name} (${remoteComponent.id}) was not found locally`);
            }
        });
        return createdComponentMap;
    });
}
exports.componentSeeder = componentSeeder;
