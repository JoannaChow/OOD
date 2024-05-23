/**
 * global:
 * const PACKAGES = {
 *  A: {
 *      0: [
 *          {"B": 1},
 *          {"C": 0}
 *      ]
 *  }
 *  B: {
 *
 * }
 * }
 *
 * interface IDependency {
 *  name: string,
 *  version: number
 * }
 *
 * - Package
 *      - name: string
 *      - version: number
 *      - dependencies: IDependency[]
 *
 *      - get_denpendencies() => returns all dependencies (including child's)
 *
 * - PackageSystem
 *      install(package_name, package_version) => list of all dependencies needed to install
 *
 */

const PACKAGES: Record<string, Record<number, IDependency[]>> = {
    A: {
        0: [
            { name: "B", version: 1 },
            { name: "C", version: 0 },
        ],
    },
    B: {
        0: [
            { name: "D", version: 0 },
            { name: "F", version: 0 },
        ],
        1: [
            { name: "E", version: 0 },
            { name: "F", version: 0 },
        ],
    },
    C: {
        0: [{ name: "F", version: 0 }],
    },
    D: {
        0: [],
    },
    E: {
        0: [{ name: "H", version: 0 }],
    },
    F: {
        0: [{ name: "G", version: 0 }],
    },
    G: {
        0: [],
    },
    H: {
        0: [],
    },
};

interface IDependency {
    name: string;
    version: number;
}

class Package {
    name: string;
    veresion: number;
    dependencies: IDependency[];

    constructor(name: string, version: number) {
        this.name = name;
        this.veresion = version;
        this.dependencies = PACKAGES[name][version];
    }

    get_dependencies(): Package[] {
        const result: Package[] = [];
        this.dependencies.forEach((dependency) => {
            const package_denpendency = new Package(
                dependency.name,
                dependency.version
            );
            const dependency_packages = package_denpendency.install();
            dependency_packages.forEach((pack) => {
                const find_index = result.findIndex(
                    (existing_pack) =>
                        existing_pack.name === pack.name &&
                        existing_pack.veresion === pack.veresion
                );
                if (find_index === -1) {
                    result.push(pack);
                }
            });
        });
        return result;
    }

    install(): Package[] {
        const all_dependencies = this.get_dependencies();
        const find_index = all_dependencies.findIndex(
            (existing_pack) =>
                existing_pack.name === this.name &&
                existing_pack.veresion === this.veresion
        );
        if (find_index === -1) {
            all_dependencies.push(this);
        }
        return all_dependencies;
    }
}

export class PackageSystem {
    install(package_name: string, package_version): Package[] {
        const newPackage = new Package(package_name, package_version);
        return newPackage.install();
    }
}
