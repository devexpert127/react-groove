"use strict";
global.fetch = require("node-fetch");

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
const path_1 = __importDefault(require("path"));
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: path_1.default.resolve(__dirname, '../.env') });
const Component_1 = require("./seeders/Component");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const srcPath = process.env.SEEDER_SOURCE_DIR;
        if (!srcPath) {
            console.log('Please provide SEEDER_SOURCE_DIR env variable');
            process.exit(1);
        }
        try {
            yield Component_1.componentSeeder(srcPath);
        }
        catch (e) {
            console.error('Something went wrong while seeding');
            console.error(e);
            process.exit(1);
        }
    });
}
main();
