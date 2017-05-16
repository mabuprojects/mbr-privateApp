"use strict";
/**
 * Esta clase contiene funciones comunes reusables para todos los forms
 */
var ReuseFormComponent = (function () {
    function ReuseFormComponent() {
    }
    /**
     * Devuelve true si es válido y ya han hecho foco en él
     * @param nameControl
     * @param form
     * @returns {boolean}
     */
    ReuseFormComponent.prototype.controlValid = function (nameControl, form) {
        return form.controls[nameControl].valid && form.controls[nameControl].touched;
    };
    /**
     * Devuelve true si es inválido y ya han hecho foco en él
     * @param nameControl
     * @param form
     * @returns {boolean}
     */
    ReuseFormComponent.prototype.controlInvalid = function (nameControl, form) {
        return (!form.controls[nameControl].valid) && form.controls[nameControl].touched;
    };
    /**
     * Validator para minPriceDelivery -> debe ser mayor que 0
     * @param control
     * @returns {{greaterThan0: boolean}}
     */
    ReuseFormComponent.prototype.greaterThan0 = function (control) {
        return parseInt(control.value) > 0 ? null : {
            greaterThan0: true
        };
    };
    /**
     * Vacía el form
     */
    ReuseFormComponent.prototype.revert = function (form) {
        form.reset();
    };
    return ReuseFormComponent;
}());
exports.ReuseFormComponent = ReuseFormComponent;
