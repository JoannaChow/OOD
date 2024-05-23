"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = require("./dependency");
const package_system = new dependency_1.PackageSystem();
console.log(package_system.install("A", 0).map((pack) => {
    return { name: pack.name, version: pack.veresion };
}));
//# sourceMappingURL=test.js.map