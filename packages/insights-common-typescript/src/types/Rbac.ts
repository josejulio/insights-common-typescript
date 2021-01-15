type Verb = string;
type What = string;
type App = string;

type WhatPermissions = Array<Verb>;
type AppPermissions = Record<What, WhatPermissions>;
export type RbacPermission = Record<App, AppPermissions>

const anything: Verb | What = '*';

export class Rbac {
    private permissions: RbacPermission = {};

    constructor(permissions: RbacPermission) {
        this.permissions = permissions;
    }

    public hasPermission(app: App, what: What, verb: Verb): boolean {
        const appPermission = this.permissions[app];
        if (!appPermission) {
            return false;
        }

        return this.hasAppPermission(appPermission, what, verb);
    }

    private hasWhatPermission(permissions: WhatPermissions, verb: Verb): boolean {
        return permissions.includes(verb) || permissions.includes(anything);
    }

    private hasAppPermission(permissions: AppPermissions, what: What, verb: Verb): boolean {
        const verbs = permissions[what];
        const specificPermission = verbs ? this.hasWhatPermission(verbs, verb) : undefined;

        if (specificPermission) {
            return specificPermission;
        } else if (what !== anything) {
            return this.hasAppPermission(permissions, anything, verb);
        }

        return false;
    }
}
