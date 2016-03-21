// LICENSE : MIT
"use strict";
import CodeGenerator from "../CodeGenerator";
import {Expression} from "./Expression";
/**
 * @return {string}
 */
export function NonNullableType(tag) {
    const expression = Expression(tag.name, tag.type);
    return CodeGenerator.assert(expression);
}