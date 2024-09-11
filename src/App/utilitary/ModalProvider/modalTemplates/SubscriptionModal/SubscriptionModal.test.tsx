/* eslint-disable  @typescript-eslint/no-explicit-any */
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Root, appStore } from 'App'
import {
    useCustomerSubscriptionQuery,
    usePlansQuery,
    usePlanQuery,
    useCustomerQuery,
    usePlanProrateQuery,
    useRefreshTokenQuery,
} from 'api/queries'
import { useActivatePlanMutation } from 'api/mutations'
import { customerSubscriptionMock, plansMock, CUSTOMER_MOCK } from './SubscriptionModal.mocks'
import { openSubscriptionModal, closeSubscriptionModal } from './subscription.slice'
import { SubscriptionModal } from './SubscriptionModal'

const mockedUseCustomerSubscriptionQuery = useCustomerSubscriptionQuery as jest.Mock<any>
const mockedUsePlansQuery = usePlansQuery as jest.Mock<any>
const mockedUsePlanQuery = usePlanQuery as jest.Mock<any>
const mockedUseCustomerQuery = useCustomerQuery as jest.Mock<any>
const mockedUsePlanProrateQuery = usePlanProrateQuery as jest.Mock<any>
const mockedUseRefreshTokenQuery = useRefreshTokenQuery as jest.Mock<any>
const mockedUseActivatePlanMutation = useActivatePlanMutation as jest.Mock<any>

jest.mock('api/queries')
jest.mock('api/mutations')
jest.mock('react-use-intercom', () => ({
    useIntercom: () => ({
        boot: jest.fn(),
        show: jest.fn(),
    }),
}))
jest.mock('mixpanel-browser', () => ({
    track: jest.fn(),
    disable_all_events: jest.fn(),
}))

describe('Subscription', () => {
    beforeEach(async () => {
        await waitFor(() => {
            appStore.dispatch(openSubscriptionModal())
        })

        mockedUseCustomerSubscriptionQuery.mockImplementation(() => ({ isLoading: true }))
        mockedUsePlansQuery.mockImplementation(() => ({ isLoading: true }))
        mockedUsePlanQuery.mockImplementation(() => ({ isLoading: true }))
        mockedUseCustomerQuery.mockImplementation(() => ({ isLoading: true }))
        mockedUsePlanProrateQuery.mockImplementation(() => ({ isLoading: true }))
        mockedUseRefreshTokenQuery.mockImplementation(() => ({ refetch: () => ({}) }))

        // hack for intercom
        const script = document.createElement('script')
        document.body.appendChild(script)
    })

    afterEach(async () => {
        await waitFor(() => {
            appStore.dispatch(closeSubscriptionModal())
        })

        jest.clearAllMocks()
    })

    test('Skeleton displayed', async () => {
        const { queryAllByText, getAllByTestId } = render(
            <Root>
                <SubscriptionModal />
            </Root>,
        )

        expect(queryAllByText(/Your Current Plan/i)?.[0]).toBeInTheDocument()
        expect(queryAllByText(/Loading.../i)?.[0]).toBeInTheDocument()
        expect(getAllByTestId('ctaSkeleton')?.[0]).toBeInTheDocument()
    })

    test('Display steps', async () => {
        mockedUseCustomerSubscriptionQuery.mockImplementation(() => ({
            isLoading: false,
            data: customerSubscriptionMock,
        }))

        mockedUsePlansQuery.mockImplementation(() => ({
            isLoading: false,
            data: plansMock,
        }))

        mockedUseCustomerQuery.mockImplementation(() => ({
            isLoading: false,
            data: CUSTOMER_MOCK,
        }))

        const { queryAllByText, getByTestId, getByText } = render(
            <Root>
                <SubscriptionModal />
            </Root>,
        )

        expect(queryAllByText(/Your Current Plan/i)?.[0]).toBeInTheDocument()

        const selectedPlan = plansMock[2]
        const selectPremiumSubButton = getByTestId(selectedPlan.name)

        const timeout = { timeout: 5000 }

        await waitFor(async () => {
            await userEvent.click(selectPremiumSubButton)
        }, timeout)

        expect(getByText(selectedPlan.name)).toBeInTheDocument()
        expect(queryAllByText(/Payment Details/i)?.[0]).toBeInTheDocument()
    })

    test('Subscription Flow', async () => {
        const activatePlanMutation = jest.fn(() => 'activatePlanMutation')

        mockedUseActivatePlanMutation.mockImplementation(() => ({ mutateAsync: activatePlanMutation }))

        mockedUseCustomerSubscriptionQuery.mockImplementation(() => ({
            isLoading: false,
            data: {
                ...customerSubscriptionMock,
                creditCard: {
                    firstName: 'Test',
                    lastName: 'Test',
                    cardNumber: '4111111111111111',
                    cvv: '111',
                    expirationYear: 30,
                    expirationMonth: 11,
                    zipcode: '11111',
                },
            },
        }))

        mockedUsePlansQuery.mockImplementation(() => ({
            isLoading: false,
            data: plansMock,
        }))

        mockedUseCustomerQuery.mockImplementation(() => ({
            isLoading: false,
            data: CUSTOMER_MOCK,
        }))

        const { getByTestId } = render(
            <Root>
                <SubscriptionModal />
            </Root>,
        )

        const selectedPlan = plansMock[2]
        const selectPremiumSubButton = getByTestId(selectedPlan.name)

        const timeout = { timeout: 5000 }

        await waitFor(async () => {
            await userEvent.click(selectPremiumSubButton)
        }, timeout)

        expect(getByTestId('customerCreditCard')).toBeInTheDocument()

        const activatePlanCta = getByTestId('activatePlanCta')

        await waitFor(async () => {
            await userEvent.click(activatePlanCta)
        }, timeout)

        expect(activatePlanMutation).toHaveBeenCalledTimes(1)
    })
})
