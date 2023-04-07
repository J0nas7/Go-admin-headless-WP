// Internal
import { Text, Block } from '../'
import { useOrders } from '../../service'
import { OrderDTO } from '../../types'


/**
 * Renders order in varying formats.
 *
 * @param {string} props.order Order to display.
 * @param {string} props.format Format of rendering.
 * @param {string} props.classList ClassName.
 */

export const OrderCard = ({
    order,
    format = 'summary',
    classList
} : {
    order: OrderDTO,
    format?: string,
    classList?: string
}) => {
    const { navigateToOrder } = useOrders()
	return (
        <Block>
            { format === 'summary' && (
                <div onClick={() => navigateToOrder(order.orderId)} className={classList}>
                    <Text variant="span" className="order-destAdr float-left">{order.destinationAdr}</Text>
                    <Text variant="span" className="order-totalSale float-right">Kr. {order.totalSale}</Text>
                    <Text variant="span" className="order-destArea clear-both float-left">{order.destinationArea}</Text>
                    <Text variant="span" className="order-deadline float-right">{order.deliveryDeadline}</Text>
                </div>
            )}
            { format === 'single' && (
                <Block>
                    <Text variant='p'>deliveryDeadline: {order.deliveryDeadline}</Text>
                    <Text variant='p'>destinationAdr: {order.destinationAdr}</Text>
                    <Text variant='p'>destinationArea: {order.destinationArea}</Text>
                    <Text variant='p'>orderId: {order.orderId}</Text>
                    <Text variant='p'>totalSale: {order.totalSale}</Text>
                    <Text variant='p'>customerId: {order.customerId}</Text>
                    <Text variant='p'>dateCompleted: {order.dateCompleted}</Text>
                    <Text variant='p'>dateCreated: {order.dateCreated}</Text>
                    <Text variant='p'>datePaid: {order.datePaid}</Text>
                    <Text variant='p'>numItemsSold: {order.numItemsSold}</Text>
                    <Text variant='p'>status: {order.status}</Text>
                    <Text variant='p'>theHelperIs: {order.theHelperIs}</Text>
                </Block>
            )}
        </Block>
    )
}