import React, { Fragment } from 'react';
import { ButtonStyle, PanelStyle } from './styled';

import Button from '@app/components/Button';

import DrawerFrame from '@app/components/Dashboard/DrawerFrame';
import Panel from '@app/components/Dashboard/Panel';
import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { compose } from 'react-apollo';
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';
import { glyphs } from '@app/components/Icon';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Category, { ICategory } from './Category';


const CATEGORIES: ICategory[] = [
    {
        id: 'category1',
        title: 'Category1',
        items: [
            {
                id: "cate1_pie1",
                title: "Pie",
                icon: "GRAPH_PIE"
            },
            {
                id: "cate1_donut1",
                title: "Donut",
                icon: "GRAPH_DONUT"
            },
            {
                id: "cate1_pie2",
                title: "Pie",
                icon: "GRAPH_PIE"
            },
            {
                id: "cate1_donut2",
                title: "Donut",
                icon: "GRAPH_DONUT"
            }
        ]
    },
    {
        id: 'category2',
        title: 'Category2',
        items: [

        ]
    },
    {
        id: 'category3',
        title: 'Category3',
        items: [

        ]
    },
];


export interface IProps {
    onClose: () => void;
    intl: InjectedIntl;
}

@observer
class DashboardDrawer extends React.Component<IProps> {
    @observable private isBlockShow = true;
    public render() {
        const { onClose, intl: { formatMessage } } = this.props;
        return (
            <Fragment>
                {this.isBlockShow &&
                    <DrawerFrame title={formatMessage({ id: 'pageDashboard.drawerBlock' })} onClose={onClose} >
                        <SeperateBar />
                        <Panel css={PanelStyle} width={"436px"}>
                            <div>Content</div>
                        </Panel>
                        <Button css={ButtonStyle} onClick={() => { this.isBlockShow = false; }}>
                            <FormattedMessage id="pageDashboard.createBlock" />
                        </Button>
                    </DrawerFrame>
                }
                {!this.isBlockShow &&
                    <DrawerFrame title={formatMessage({ id: 'pageDashboard.drawerStyle' })} onClose={onClose} >
                        <SeperateBar />
                        {CATEGORIES.map((category) => (
                            <Category category={category} />
                        ))}
                        <Button css={ButtonStyle} onClick={() => { }}>
                            <FormattedMessage id="pageDashboard.next" />
                        </Button>
                    </DrawerFrame>
                }
            </Fragment>
        );
    }
}

export default injectIntl(DashboardDrawer);
