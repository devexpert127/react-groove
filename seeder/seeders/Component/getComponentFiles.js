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
exports.getComponentFiles = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
function getComponentFiles(componentSourcesDir, componentNames, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = yield getComponentsCode(componentSourcesDir, componentNames);
        const styles = yield getComponentsStyles(componentSourcesDir, componentNames);
        const fields = yield getComponentsFields(componentSourcesDir, componentNames);
        return componentNames.map((componentName, i) => ({
            name: componentName,
            code: code[i],
            style: styles[i],
            type,
            fields: fields[i].fields
                .filter((field) => field.isStatic)
                .map(({ name, type, placeholder, options }) => ({
                name,
                type,
                placeholder,
                options,
                required: false,
                localized: false,
                visible: true,
            })),
        }));
    });
}
exports.getComponentFiles = getComponentFiles;
function getComponentsCode(componentSourcesDir, componentNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentSourcePromises = componentNames.map((componentName) => __awaiter(this, void 0, void 0, function* () {
            const componentPath = path_1.default.join(componentSourcesDir, componentName, 'index.js');
            return fs_extra_1.default.promises.readFile(componentPath, 'utf-8');
        }));
        return Promise.all(componentSourcePromises);
    });
}
function getComponentsStyles(componentSourcesDir, componentNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentStylePromises = componentNames.map((componentName) => __awaiter(this, void 0, void 0, function* () {
            const cssPath = path_1.default.join(componentSourcesDir, componentName, `styles.css`);
            const doesFileExist = yield fs_extra_1.default.pathExists(cssPath);
            if (!doesFileExist)
                return '';
            return fs_extra_1.default.promises.readFile(cssPath, 'utf-8');
        }));
        return Promise.all(componentStylePromises);
    });
}
function getComponentsFields(componentSourcesDir, componentNames) {
    return __awaiter(this, void 0, void 0, function* () {
        const componentFieldsPromises = componentNames.map((componentName) => __awaiter(this, void 0, void 0, function* () {
            const fieldsPath = path_1.default.join(componentSourcesDir, componentName, 'fields.json');
            const doesFileExist = yield fs_extra_1.default.pathExists(fieldsPath);
            if (!doesFileExist)
                return {
                    fields: [],
                };
            return require(fieldsPath);
        }));
        return Promise.all(componentFieldsPromises);
    });
}
