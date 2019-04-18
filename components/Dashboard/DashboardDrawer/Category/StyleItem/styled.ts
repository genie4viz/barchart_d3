import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const Container = styled.div``;

export const ItemContainer = styled('button')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 116px;
  padding: 16px 0px;
  border-radius: 8px;
  border: solid 1px #3f66f3;
  background-color: #ffffff;

  color: ${(props) => props.theme.color.blue};
  &:active,
  &:hover,
  &:focus {
    color: ${(props) => props.theme.color.blueDark};
    cursor: pointer;
  }
`;
