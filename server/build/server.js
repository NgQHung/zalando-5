"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./src/routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serve_static_1 = __importDefault(require("serve-static"));
const path_1 = __importDefault(require("path"));
var cors = require('cors');
// PORT
const PORT = process.env.PORT || 8080;
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, './.env') });
const app = (0, express_1.default)();
// serve static
app.use((0, serve_static_1.default)('public/ftp', { index: ['default.html', 'default.htm'] }));
app.use('/dist', express_1.default.static(path_1.default.resolve(__dirname, '../client/dist')));
// router.get('/', (req, res: Response) => {
//   res.download(path.resolve(__dirname, '../client/public/index.html'));
// });
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../client/public/index.html')));
// const corsConfig = {
//   credentials: true,
//   origin: true,
// };
app.use(cors({ credentials: true, origin: process.env.CLIENT_URI }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
/** Parse the body - middleware */
app.use(express_1.default.json());
app.use((req, res, next) => {
    // res.setHeader('Cache-Control', 'max-age=1209600');
    // res.setHeader('Cache-Control', 'no-cache');
    next();
});
// routes
app.use(routes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => console.log('listening on port ', PORT));
})
    .catch((error) => {
    console.log(error);
});
