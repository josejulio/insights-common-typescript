import * as React from 'react';
import { useField } from 'formik';
import { FormGroup, TextArea as PFTextArea, TextAreaProps as PFTextAreaProps } from '@patternfly/react-core';

import { onChangePFAdapter } from './Common';
import { OuiaComponentProps, withoutOuiaProps } from '../../../utils';
import { getOuiaProps } from '../../../utils/Ouia';

interface FormTextAreaProps extends OuiaComponentProps, Omit<PFTextAreaProps, 'onChange' | 'ref'> {
    id: string;
    name: string;
}

export const FormTextArea: React.FunctionComponent<FormTextAreaProps> = (props) => {
    const [ field, meta ] = useField({ ...props });
    const isValid = !meta.error || !meta.touched;

    return (
        <FormGroup
            fieldId={ props.id }
            helperTextInvalid={ meta.error }
            isRequired={ props.isRequired }
            validated={ (isValid) ? 'default' : 'error' }
            label={ props.label }
            { ...getOuiaProps('FormikPatternfly/FormTextArea', props) }
        >
            <PFTextArea
                { ...withoutOuiaProps(props) }
                { ...field }
                value={ field.value || '' }
                validated={ (isValid) ? 'default' : 'error' }
                onChange={ onChangePFAdapter<string | number, React.FormEvent<HTMLTextAreaElement>>(field) }
            />
        </FormGroup>
    );
};
