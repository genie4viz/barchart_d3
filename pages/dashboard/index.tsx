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

export interface IProps extends InjectedIntlProps {

}

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
                <DashboardDrawer onClose={() => { this.showDrawer = false; }} >
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
