import React, { createRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { InjectedIntl, injectIntl } from 'react-intl';

import { glyphs } from '@app/components/Icon';
import { KEY_CODES } from '@app/constants/app';

import { Container, ButtonContainer, Title, Option } from './styled';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

export interface IOption {
    name: string;
    value: string;
}

export interface ISelectProps extends FieldRenderProps<HTMLElement> {
    className?: string;
    options: IOption[];
    titleId?: string;
    isSmall?: boolean;
    isIntl?: boolean;
    intl: InjectedIntl;
}

@observer
class FormInputSelectButton extends React.PureComponent<ISelectProps> {
    @observable private selectedIndex: number = 0;
    constructor(props: ISelectProps) {
        super(props);
    }

    public render() {
        const {
            className,
            titleId,
            isSmall,
            options,
            intl: { formatMessage },
            isIntl,
        } = this.props;

        return (
            <Container className={className}>
                {!!titleId && <Title isSmall={isSmall}>{formatMessage({ id: titleId })}</Title>}

                <ButtonContainer>
                    {options.map((option: IOption, index: number) => (
                        <Option key={index} isSelected={index === this.selectedIndex} onClick={() => this.handleClickOption(option, index)} data-index={index}>
                            {isIntl ? formatMessage({ id: option.name }) : option.name}
                        </Option>
                    ))}
                </ButtonContainer>
            </Container>
        );
    }

    private handleClickOption = (option: IOption, index: number) => {
        const {
            input: { onChange },
        } = this.props;
        onChange(option.value as any);
        this.selectedIndex = index;
    };
}

export default injectIntl(FormInputSelectButton);
