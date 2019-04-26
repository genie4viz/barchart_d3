import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import React, { Fragment, useState } from 'react';
import { compose } from 'react-apollo';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Meta from '@app/components/Meta';
import DashboardHeader from '@app/components/Dashboard/Header';
import DashboardDrawer from '@app/components/Dashboard/DashboardDrawer';

import GridLayout from '@app/components/Dashboard/GridLayout';
import { Layout } from 'react-grid-layout';

import { Container, ContainerContent, Wrapper, GridItemDiv } from './styled';

import * as Color from '@app/theme/color';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import Button from '@app/components/Button';
import { ICategory } from '@app/components/Dashboard/DashboardDrawer/Category';

import { FakeData1000 } from '@app/components/Dashboard/Chart/fake1000';
import { FakeData } from '@app/components/Dashboard/Chart/fake';
import { FakeData15 } from '@app/components/Dashboard/Chart/fake15';
import PieChart from '@app/components/Dashboard/Chart/PieChart';
import BarChart from '@app/components/Dashboard/Chart/BarChart';
import LineChart from '@app/components/Dashboard/Chart/LineChart';

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

const layout: Layout[] = [
  { i: 'a', x: 0, y: 0, w: 12, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'b', x: 0, y: 1, w: 4, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'c', x: 4, y: 1, w: 4, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'd', x: 8, y: 1, w: 4, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'e', x: 0, y: 1, w: 12, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'f', x: 0, y: 2, w: 6, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'g', x: 6, y: 2, w: 3, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
  { i: 'h', x: 9, y: 2, w: 3, h: 1, minW: 3, maxW: 12, minH: 1, maxH: 1 },
];

@observer
class Dashboard extends React.Component<IProps, {}> {
  @observable private showDrawer = false;
  @observable private fake = FakeData1000;

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
              <Button  onClick={() => {this.fake = FakeData15}}>
                ChangeData
              </Button>
              <GridLayout
                className='Dashboard-container layout'
                cols={12}
                layout={layout}
                margin={[20, 20]}
                preventCollision={false}
                rowHeight={300}
                verticalCompact={false}
                width={1440}>
                <GridItemDiv key='a'><PieChart data={this.fake[1]} showValue={true} key={0} idx={0} showLimit={5}/></GridItemDiv>
                <GridItemDiv key='b'><LineChart data={this.fake[2]} isCountChart={false} key={0} idx={0} showLimit={20}/></GridItemDiv>
                <GridItemDiv key='c'><BarChart data={this.fake[0]} isCountChart={false} key={0} idx={0} showLimit={20}/></GridItemDiv>                
                <GridItemDiv key='d'><PieChart data={this.fake[1]} showValue={false} key={1} idx={1} showLimit={5}/></GridItemDiv>
                <GridItemDiv key='e'><LineChart data={this.fake[2]} isCountChart={false} key={1} idx={1} showLimit={20}/></GridItemDiv>
                <GridItemDiv key='f'><BarChart data={this.fake[0]} isCountChart={false} key={1} idx={1} showLimit={20}/></GridItemDiv>
                <GridItemDiv key='g'><PieChart data={this.fake[1]} showValue={true} key={2} idx={2} showLimit={5}/></GridItemDiv>
                <GridItemDiv key='h'><BarChart data={this.fake[0]} isCountChart={false} key={2} idx={2} showLimit={20}/></GridItemDiv>
              </GridLayout>

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
