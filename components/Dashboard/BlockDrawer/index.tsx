import React from 'react';
import { ButtonStyle, PanelStyle } from './styled';

import ButtonIcon from '@app/components/Button/Icon';
import Button from '@app/components/Button';
import { glyphs } from '@app/components/Icon';

import Drawer from '@app/components/Dashboard/Drawer';
import Panel from '@app/components/Dashboard/Panel';
import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { FormattedMessage } from 'react-intl';

export interface IHeaderProps {
    title: string,
    onClose: () => void;
}

const BlockDrawer: React.FC<IHeaderProps> = ({ title, onClose }) => (
    <Drawer title={title} onClose={onClose} >
        <SeperateBar />
        <Panel css={PanelStyle}>
            <div>Content</div>
        </Panel>
        <Button css={ButtonStyle} onClick={() => { }}>
            <FormattedMessage id="pageDashboard.createBlock" />
        </Button>
    </Drawer>
);

export default BlockDrawer;
