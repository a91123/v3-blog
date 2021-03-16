import { ColumnProps } from './store'
export interface PostProps {
    _id: string;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    columnId: number;
}
export const testData: ColumnProps[] = [
    {
        _id: '1',
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    }
]

export const testPosts: PostProps[] = [
    {
        _id: 'aawerasdf',
        title: '这是我的第二篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        createdAt: '2020-06-11 10:34:22',
        columnId: 1
    },
    {
        _id: 'aaad525',
        title: '这是我的第三篇文章',
        content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5edcc2329f2b4e28352b75eb.jpg?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
        createdAt: '2020-06-11 10:34:22',
        columnId: 1
    }
]
