export interface OuiaComponentProps {
    ouiaId: string;
    ouiaSafe?: boolean;
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

export const getOuiaPropsFactory = (module: string) => (type: string, oiuaProps: OuiaComponentProps): UseOuiaReturn => ({
    'data-ouia-component-type': `${module}/${type}`,
    'data-ouia-component-id': oiuaProps.ouiaId,
    'data-ouia-safe': oiuaProps.ouiaSafe ?? true
});

export const withoutOuiaProps = <T extends OuiaComponentProps>(props: T): Omit<T, 'ouiaId' | 'ouiaSafe'> => {
    const { ouiaId, ouiaSafe, ...rest } = props;

    return rest;
};

// For internal use
export const getOuiaProps = getOuiaPropsFactory('insights-common-typescript');
