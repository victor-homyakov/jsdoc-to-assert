// LICENSE : MIT
"use strict";
// @param {Array<string>}
import CodeGenerator from "../CodeGenerator";
/**
 * @return {string|undefined}
 */
export function TypeApplication(tag) {
    const expectedType = tag.type.expression.name;
    if (expectedType === "Array") {
        return CodeGenerator.assert(`Array.isArray(${tag.name})`);
    }
}