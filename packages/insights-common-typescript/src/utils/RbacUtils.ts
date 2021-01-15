import { AccessApi, AccessPagination } from '@redhat-cloud-services/rbac-client';
import axios from 'axios';
import { Rbac, RbacPermission } from '../types/Rbac';

const BASE_PATH = '/api/rbac/v1';

export class RbacPermissionsBuilder {
    readonly accessPagination: AccessPagination;

    constructor(accessPagination: AccessPagination) {
        this.accessPagination = accessPagination;
    }

    public build(): RbacPermission {
        if (!this.accessPagination?.data || this.accessPagination.data.length === 0) {
            return {};
        }

        const permissions: RbacPermission = {};

        for (const access of this.accessPagination.data) {
            const [ app, what, verb ] = access.permission.split(':');

            if (!permissions[app]) {
                permissions[app] = {};
            }

            if (!permissions[app][what]) {
                permissions[app][what] = [];
            }

            permissions[app][what].push(verb);
        }

        return permissions;
    }
}

export const fetchRBAC = (appQuery: string): Promise<Rbac> => {
    const instance = axios.create();

    return new AccessApi(undefined, BASE_PATH, instance)
    .getPrincipalAccess(appQuery)
    .then(response => new RbacPermissionsBuilder(response.data))
    .then(builder => new Rbac(builder.build()));
};
