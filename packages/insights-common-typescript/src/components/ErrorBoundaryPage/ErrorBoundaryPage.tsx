import * as React from 'react';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import { Messages } from '../../properties/Messages';
import { ErrorCircleOIcon } from '@patternfly/react-icons';
import { Text, ExpandableSection } from '@patternfly/react-core';
import { join } from '../../utils/ComponentUtils';
import { style } from 'typestyle';
import { PFColors } from '../../utils/PFColors';
import { Spacer } from '../../utils/Spacer';
import { EmptyState } from '../EmptyState/EmptyState';

interface ErrorPageProps {
    action: () => void;
    actionLabel: string;
    pageHeader: string;
    title: string;
    description: string;
}

interface ErrorPageState {
    hasError: boolean;
    error?: any;
}

interface ErrorStackProps {
    error: any;
}

const errorClass = style({
    fontFamily: 'monospace',
    fontSize: '14px',
    fontStyle: 'default',
    textAlign: 'left',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: PFColors.GlobalBackgroundColorDark300,
    padding: Spacer.SM
});

const ErrorStack: React.FunctionComponent<ErrorStackProps> = (props) => {
    const { error } = props;

    if (error.stack) {
        return (
            <Text className={ errorClass } component="blockquote">
                { join(error.stack.split('\n'), 'br') }
            </Text>
        );
    }

    if (error.name && error.message) {
        return (
            <>
                <Text component="h6">
                    { error.name }
                </Text>
                <Text className={ errorClass } component="blockquote">
                    { error.message }
                </Text>
            </>
        );
    }

    return (
        <Text className={ errorClass } component="blockquote">
            { error.toString() }
        </Text>
    );
};

// As of time of writing, React only supports error boundaries in class components
export class ErrorBoundaryPage extends React.Component<ErrorPageProps, ErrorPageState> {
    constructor(props: Readonly<ErrorPageProps>) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    executeAction = () => {
        this.setState({
            error: undefined,
            hasError: false
        });
        this.props.action();
    };

    static getDerivedStateFromError(error): ErrorPageState {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <PageHeader>
                        <PageHeaderTitle title={ this.props.pageHeader }/>
                    </PageHeader>
                    <Main>
                        <EmptyState
                            icon={ ErrorCircleOIcon }
                            title={ this.props.title }
                            content={ <>
                                { this.props.description }
                                { this.state.error && (
                                    <ExpandableSection toggleText={ Messages.components.errorPage.showDetails }>
                                        <ErrorStack error={ this.state.error } />
                                    </ExpandableSection>
                                )}
                            </> }
                            action={ this.executeAction }
                            actionLabel={ this.props.actionLabel }
                        />
                    </Main>
                </>
            );
        }

        return this.props.children;
    }
}
