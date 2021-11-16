"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const fetch_1 = require("./services/fetch");
Object.defineProperty(exports, "request", { enumerable: true, get: function () { return fetch_1.fetch; } });

