import { StoryObj, Meta } from '@storybook/react'
import { ActingAs } from 'design/organisms/BannerProvider'

export default {
    title: 'Organisms/Banners/Acting as',
    component: ActingAs,
} as Meta

export const Playground: StoryObj<{}> = {
    args: {},
    argTypes: {},
    render: () => <ActingAs />,
}
