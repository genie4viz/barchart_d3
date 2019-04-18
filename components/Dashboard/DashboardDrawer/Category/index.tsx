import React, { Fragment } from 'react';

import { Title, Content } from './styled';

import SeperateBar from '@app/components/Dashboard/SeperateBar';
import { Label1 } from '@app/components/Shared/Typescale';
import StyleItem, { IStyleItem } from './StyleItem';


export interface ICategory {
    id: string,
    title: string,
    items: IStyleItem[]
}

export interface IProps {
    category: ICategory
}

class Category extends React.Component<IProps> {
    public render() {
        const { category } = this.props;

        return (
            <Fragment>
                <Title>
                    <Label1>{category.title}</Label1>
                </Title>
                <Content>
                    {category.items.map((item) => (
                        <StyleItem item={item} />
                    ))}
                </Content>
                <SeperateBar />
            </Fragment>
        );
    }
}

export default Category;
