"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var user_component_1 = require("./user.component");
/**
 * Created by alejandro on 15/04/17.
 */
var Client = (function (_super) {
    __extends(Client, _super);
    function Client() {
        _super.apply(this, arguments);
    }
    return Client;
}(user_component_1.User));
exports.Client = Client;
