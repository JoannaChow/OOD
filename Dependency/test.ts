import { PackageSystem } from "./dependency";

const package_system = new PackageSystem();
console.log(
    package_system.install("A", 0).map((pack) => {
        return { name: pack.name, version: pack.veresion };
    })
);
