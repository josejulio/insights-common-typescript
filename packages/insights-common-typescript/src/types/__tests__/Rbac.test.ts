import { Rbac } from '../Rbac';

describe('src/types/Rbac', () => {
    it('uses explicit permissions from app', () => {
        const rbac = new Rbac({
            notifications: {
                notifications: [ 'read', 'write' ]
            }
        });

        expect(rbac.hasPermission('notifications', 'notifications', 'read')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'notifications', 'write')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'notifications', 'execute')).toBeFalsy();
    });

    it('uses * verbs', () => {
        const rbac = new Rbac({
            notifications: {
                notifications: [ 'read', 'write', '*' ]
            }
        });

        expect(rbac.hasPermission('notifications', 'notifications', 'read')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'notifications', 'write')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'notifications', 'execute')).toBeTruthy();
    });

    it('uses * whats', () => {
        const rbac = new Rbac({
            notifications: {
                '*': [ 'read' ],
                notifications: [ 'write' ]
            }
        });

        expect(rbac.hasPermission('notifications', 'notifications', 'read')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'notifications', 'write')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'random-blabla', 'read')).toBeTruthy();
        expect(rbac.hasPermission('notifications', 'random-blabla', 'write')).toBeFalsy();
    });

    it('holds multiple apps permissions', () => {
        const rbac = new Rbac({
            notifications: {
                notifications: [ 'read', 'write' ]
            },
            integrations: {
                endpoints: [ 'read', 'write' ]
            },
            policies: {
                policies: [ 'read' ]
            }
        });

        expect(rbac.hasPermission('notifications', 'notifications', 'read')).toBeTruthy();
        expect(rbac.hasPermission('integrations', 'endpoints', 'write')).toBeTruthy();
        expect(rbac.hasPermission('policies', 'policies', 'read')).toBeTruthy();
        expect(rbac.hasPermission('policies', 'policies', 'write')).toBeFalsy();
    });
});
