// LICENSE : MIT
"use strict";
const assert = require("power-assert");
const doctrine = require("doctrine");
const astEqual = require("ast-equal").default;
import {createAsserts, createAssertFromTag} from "../src/create-asserts";
function parse(commentValue) {
    return doctrine.parse(commentValue, {unwrap: true});
}
function pickTag(commentValue) {
    const results = parse(commentValue);
    assert(results != null);
    assert(results.tags.length > 0);
    return results.tags[0];
}
describe("create-assert", function () {
    context("when pass null", function () {
        it("should return []", function () {
            const results = createAsserts(null);
            assert(Array.isArray(results));
            assert(results.length === 0);
        });
    });
    context("when pass jsdoc", function () {
        it("should return array", function () {
            const jsdoc = `
/**
 * Adds three numbers.
 *
 * @param {number} x First number.
 */
`;
            const results = createAsserts(parse(jsdoc));
            assert(Array.isArray(results));
            assert(results.length === 1);
        });
    });
    context("when pass primitive type", function () {
        it("should return assert typeof number", function () {
            const jsdoc = `/**
 * @param {number} x
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "number")`);
        });
        it("should return assert typeof string", function () {
            const jsdoc = `/**
 * @param {string} x
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "string")`);
        });
        it("should return assert typeof boolean", function () {
            const jsdoc = `/**
 * @param {boolean} x
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "boolean")`);
        });
        it("should return assert typeof function", function () {
            const jsdoc = `/**
 * @param {Function} x
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "function")`);
        });
        it("should return assert typeof object", function () {
            const jsdoc = `/**
 * @param {Object} x
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "object")`);
        });
    });
    context("When pass all type", function () {
        it("should return assert either undefined ", function () {
            const jsdoc = `/**
 * @param {*} x - this is ArrayType param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x !== "undefined");`);
        });
    });
    context("when pass Custom Object", function () {
        it("should return assert typeof nullable", function () {
            const A = {};
            const jsdoc = `/**
 * @param {A} x - this is ArrayType param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof A === 'undefined' || typeof x instanceof A);`);
        });
    });
    context("when pass ArrayType", function () {
        it("should return assert typeof nullable", function () {
            const jsdoc = `/**
 * @param {number[]} x - this is ArrayType param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(Array.isArray(x));`);
        });
    });
    context("when pass nullable", function () {
        it("should return assert typeof nullable", function () {
            const jsdoc = `/**
 * @param {?number} x - this is nullable param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert((x === null || typeof x === "number"));`);
        });
    });
    context("when pass NonNullableType", function () {
        it("should return assert typeof NonNullableType", function () {
            const jsdoc = `/**
 * @param {!number} x - this is non-nullable param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert((x !== null && typeof x === "number"));`);
        });
    });
    context("when pass callback function", function () {
        it("should return assert typeof cuntion", function () {
            const jsdoc = `/**
 * @param {function(foo: number, bar: string): boolean} x - this is function param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "function")`);
        });

    });
    context("when pass optional primitive?", function () {
        // ignore
    });
    context("when pass union type", function () {
        it("should return assert expression", function () {
            const jsdoc = `/**
 * @param {number|string} x - this is union param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x === "number" || typeof x === "string")`);
        });
    });
    context("when pass ...spread", function () {
        xit("should return ???", function () {
            const jsdoc = `/**
 * @param {...number} param - this is spread param.
 */`;
        });
    });
    context("when pass Record ", function () {
        it("should assert foo.bar as NullableType ", function () {
            const jsdoc = `/**
 * @param {{foo: ?number, bar: string}} x - this is object param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert((x.foo === null || typeof x.foo === "number") && typeof x.bar === "string")`);
        });
        it("should return assert foo filed with &&", function () {
            const jsdoc = `/**
 * @param {{foo: number, bar: string}} x - this is object param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(typeof x.foo === "number" && typeof x.bar === "string")`);
        });
    });
    context("When generic", function () {
        it("should return ", function () {
            const jsdoc = `/**
 * @param {Array<string>} x - this is Array param.
 */`;
            const numberAssertion = createAssertFromTag(pickTag(jsdoc));
            astEqual(numberAssertion, `assert(Array.isArray(x));`);
        });
    });
});