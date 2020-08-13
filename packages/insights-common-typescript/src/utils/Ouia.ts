export interface OuiaComponentProps {
    OuiaId: string;
    OuiaSafe?: boolean;
}

interface UseOuiaReturn {
    'data-ouia-component-type': string;
    'data-ouia-component-id': string;
    'data-ouia-safe': boolean;
}

export const setOuiaPage = (type: string, action?: string, objectId?: string) => {
    document.body.setAttribute('data-ouia-page-type', type);
    if (action === undefined) {
        document.body.removeAttribute('data-ouia-page-action');
    } else {
        document.body.setAttribute('data-ouia-page-action', action);
    }

    if (objectId === undefined) {
        document.body.removeAttribute('data-ouia-page-object-id');
    } else {
        document.body.setAttribute('data-ouia-page-object-id', objectId);
    }
};

export const getOuiaPropsFactory = (framework: string) => (type: string, id: string, isSafe = true): UseOuiaReturn => ({
    'data-ouia-component-type': `${framework}/${type}`,
    'data-ouia-component-id': id,
    'data-ouia-safe': isSafe
});
