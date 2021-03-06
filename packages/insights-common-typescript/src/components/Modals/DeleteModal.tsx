import * as React from 'react';
import { ActionModal, ActionModalProps } from './ActionModal';
import { ButtonVariant } from '@patternfly/react-core';

type InheritedProps = 'isOpen' | 'title' | 'content'  | 'onClose' | 'error' | 'variant' | 'titleIconVariant';

export interface DeleteModalProps extends Pick<ActionModalProps, InheritedProps> {
    isDeleting: boolean;
    onDelete: () => boolean | Promise<boolean>;
}

export const DeleteModal: React.FunctionComponent<DeleteModalProps> = (props) => {
    return <ActionModal
        isOpen={ props.isOpen }
        isPerformingAction={ props.isDeleting }
        title={ props.title }
        content={ props.content }
        onClose={ props.onClose }
        onAction={ props.onDelete }
        actionButtonTitle="Remove"
        actionButtonVariant={ ButtonVariant.danger }
        error={ props.error }
        variant={ props.variant }
        titleIconVariant={ props.titleIconVariant ?? 'warning' }
    />;
};
