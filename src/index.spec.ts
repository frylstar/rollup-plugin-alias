import { describe, it, expect } from "vitest";
import { alias } from ".";

describe("alias", () => {
    describe("alias is object", () => {
        it("alias别名路径替换成功", () => {
            const aliasObj: any = alias({
                entries: {
                    "@": "./utils",
                    utils: "./utils",
                },
            });

            // 没有用到别名
            expect(aliasObj.resolveId("./utils/add.js")).toBe("./utils/add.js");
            expect(aliasObj.resolveId("!/add.js")).toBe("!/add.js");
            // 用到别名则替换
            expect(aliasObj.resolveId("@/add")).toBe("./utils/add.js");
            // another
            expect(aliasObj.resolveId("utils/add")).toBe("./utils/add.js");
        });
    });

    describe("alias is array", () => {
        it("alias别名路径替换成功", () => {
            const aliasObj: any = alias({
                entries: [
                    {
                        find: "@",
                        replacement: "./utils",
                    },
                    {
                        find: "utils",
                        replacement: "./utils",
                    },
                ],
            });

            // 没有用到别名
            expect(aliasObj.resolveId("./utils/add.js")).toBe("./utils/add.js");
            expect(aliasObj.resolveId("!/add.js")).toBe("!/add.js");
            // 用到别名则替换
            expect(aliasObj.resolveId("@/add")).toBe("./utils/add.js");
            // another
            expect(aliasObj.resolveId("utils/add")).toBe("./utils/add.js");
        });
    });

    describe("alias is RegExp", () => {
        it("alias别名路径替换成功", () => {
            const aliasObj: any = alias({
                entries: [
                    {
                        find: /^(.*)\.js/,
                        replacement: "$1.alias",
                    },
                ],
            });

            expect(aliasObj.resolveId("add.js")).toBe("add.alias.js");
        });
    });
});
