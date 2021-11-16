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
exports.getDirContent = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
function getDirContent({ path, discardDirs = false, discardFiles = false, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let directoryEntries = [];
        try {
            directoryEntries = yield fs_extra_1.default.promises.readdir(path, {
                withFileTypes: true,
            });
        }
        catch (e) {
            console.log('Check provided path.', e);
            process.exit(1);
        }
        const names = directoryEntries
            .filter((dirent) => (discardDirs ? dirent.isFile() : true))
            .filter((dirent) => (discardFiles ? dirent.isDirectory() : true))
            .map((dirent) => dirent.name);
        return names;
    });
}
exports.getDirContent = getDirContent;
