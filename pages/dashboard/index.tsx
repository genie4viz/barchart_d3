import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import React, { Fragment, useState } from 'react';
import { compose } from 'react-apollo';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Meta from '@app/components/Meta';
import DashboardHeader from '@app/components/Dashboard/Header';
import DashboardDrawer from '@app/components/Dashboard/DashboardDrawer';

import { Container, ContainerContent, Wrapper } from './styled';

import * as Color from '@app/theme/color';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { ICategory } from '@app/components/Dashboard/DashboardDrawer/Category';
export interface IProps extends InjectedIntlProps {

}

const CATEGORIES: ICategory[] = [
  {
    id: 'category1',
    title: 'Category1',
    items: [
      {
        id: "cate1_pie1",
        title: "Pie",
        style: "PIE",
        icon: "GRAPH_PIE"
      },
      {
        id: "cate1_donut1",
        title: "Donut",
        style: "DONUT",
        icon: "GRAPH_DONUT"
      },
      {
        id: "cate1_pie2",
        title: "Pie",
        style: "PIE",
        icon: "GRAPH_PIE"
      },
      {
        id: "cate1_donut2",
        title: "Donut",
        style: "DONUT",
        icon: "GRAPH_DONUT"
      }
    ]
  },
  {
    id: 'category2',
    title: 'Category2',
    items: [
      {
        id: "cate2_line1",
        title: "Line",
        style: "LINE",
        icon: "GRAPH_LINE"
      },
      {
        id: "cate2_scatter1",
        title: "Scatter",
        style: "SCATTER",
        icon: "GRAPH_SCATTER"
      }
    ]
  },
  {
    id: 'category3',
    title: 'Category3',
    items: [
      {
        id: "cate3_bar1",
        title: "Bar",
        style: "BAR",
        icon: "GRAPH_BAR"
      },
      {
        id: "cate3_bar2",
        title: "Bar",
        style: "BAR",
        icon: "GRAPH_BAR"
      },
      {
        id: "cate3_bar3",
        title: "Bar",
        style: "BAR",
        icon: "GRAPH_BAR"
      }
    ]
  },
];

@observer
class Dashboard extends React.Component<IProps, {}> {
  @observable private showDrawer = false;

  public render() {
    const { intl: { formatMessage } } = this.props;
    return (
      <Fragment>
        <Head>
          <title>{formatMessage({ id: 'pageTitle.dashboard' })}</title>
          <meta content="Dashboard Page" name="description" />
        </Head>
        <Meta />
        <Wrapper backgroundColor={Color.COLORS.grayText}>
          <Container>
            <ContainerContent>
              <DashboardHeader dashboard={formatMessage({ id: 'pageDashboard.title' })}
                share={formatMessage({ id: 'pageDashboard.share' })}
                addBlock={formatMessage({ id: 'pageDashboard.addBlock' })}
                onAddBlock={() => { this.showDrawer = true; }}
              >
              </DashboardHeader>

              {this.showDrawer &&
                <DashboardDrawer onClose={() => { this.showDrawer = false; }} categories={CATEGORIES} >
                </DashboardDrawer>
              }
            </ContainerContent>
          </Container>
        </Wrapper>
      </Fragment>
    );
  }
};


export default compose(
  injectIntl,
)(Dashboard as any);
