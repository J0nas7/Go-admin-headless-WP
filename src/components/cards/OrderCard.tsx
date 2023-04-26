// Internal
import { Text, Block, DateFormat } from '../'
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

    let orderStatuses:any = {
        "wc-processing" : "Opgaven er i udbud",
        "wc-taken" : "Taget af indkøber"
    }

    const orderStatus = order.status!
    const displayStatus = orderStatuses[orderStatus]+"."
    const displayHelper = (order.theHelperIs === "N/A" ? "" : order.theHelperIs)

    const statusSymbol = (localStep:number) => (order.orderStep! > localStep ? "+" : "-")
    const statusClass = (localStep:number) => (order.orderStep! > localStep ? "active" : "inactive")

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
            { format === 'single-page' && (
                <Block>
                    <Block className="order-status-overview">
                        <Block className="overview-current">
                            <Text variant="span" className="status-icon"></Text>
                            <Text variant="span" className="status-headline">{displayStatus}</Text>
                        </Block>
                        <Block className="overview-timeline">
                            <Block className="timeline-item">
                                <Text variant="span" className="timeline-line active"></Text>
                                <Text variant="span" className="timeline-item-icon">+</Text>
                                <Text variant="span" className="timeline-item-title bold">Ordren er i udbud</Text>
                                <Text variant="span" className="timeline-item-datetime">
                                    <DateFormat dateObj={order.dateCreated} format="small"></DateFormat>
                                </Text>
                            </Block>
                            <Block className="timeline-item">
                                <Text variant="span" className={"timeline-line " + statusClass(1)} />
                                <Text variant="span" className="timeline-item-icon">{statusSymbol(1)}</Text>
                                <Text variant="span" className="timeline-item-title bold">Taget af indkøber</Text>
                                <Text variant="span" className="timeline-item-description">{displayHelper}</Text>
                            </Block>
                            <Block className="timeline-item">
                                <Text variant="span" className={"timeline-line " + statusClass(2)} />
                                <Text variant="span" className="timeline-item-icon">{statusSymbol(2)}</Text>
                                <Text variant="span" className="timeline-item-title bold">Indkøbet er igang</Text>
                            </Block>
                            <Block className="timeline-item">
                                <Text variant="span" className={"timeline-line " + statusClass(3)} />
                                <Text variant="span" className="timeline-item-icon">{statusSymbol(3)}</Text>
                                <Text variant="span" className="timeline-item-title bold">Der er lagt ud for indkøbet</Text>
                            </Block>
                            <Block className="timeline-item">
                                <Text variant="span" className={"timeline-line " + statusClass(4)} />
                                <Text variant="span" className="timeline-item-icon">{statusSymbol(4)}</Text>
                                <Text variant="span" className="timeline-item-title bold">Indkøber er fremme</Text>
                            </Block>
                        </Block>
                    </Block>
                    <Block className='clear-both float-left my-3 w-full'>
                        <Text variant="span" className="w-1/4 float-left"><strong>Subtotal: </strong><br/>{order.subtotalSale?.toFixed(2)}</Text>
                        <Text variant="span" className="w-1/4 float-left"><strong>Forsendelse: </strong><br/>{order.shippingTotal?.toFixed(2)}</Text>
                        <Text variant="span" className="w-1/4 float-left"><strong>Betalingsmetode: </strong><br/>-</Text>
                        <Text variant="span" className="w-1/4 float-left"><strong>Total: </strong><br/>{order.totalSale.toFixed(2)}</Text>
                    </Block>
                    <Block className='clear-both float-left my-3 w-full'>
                        <Text variant="span" className="w-1/4 float-left"><strong>Deadline: </strong><br/>{order.deliveryDeadline}</Text>
                        <Text variant="span" className="w-1/4 float-left">
                            <strong>Lev. adresse: </strong><br/>
                            {order.destinationAdr}<br/>
                            {order.destinationArea}
                        </Text>
                        <Text variant="span" className="w-1/4 float-left"><strong>Antal varer: </strong><br/>{order.numItemsSold}</Text>
                        <Text variant="span" className="w-1/4 float-left"><strong>Kunde nr.: </strong><br/>{order.customerId}</Text>
                    </Block>
                    <Block className='clear-both float-left my-3 w-full'>
                        <Text variant="span" className="w-1/4 float-left">
                            <strong>Dato oprettet: </strong><br/>
                            <DateFormat dateObj={order.dateCreated} format="full-pretty"></DateFormat>
                        </Text>
                        <Text variant="span" className="w-1/4 float-left">
                            <strong>Dato betalt: </strong><br/>
                            <DateFormat dateObj={order.datePaid} format="full-pretty"></DateFormat>
                        </Text>
                        <Text variant="span" className="w-1/4 float-left">
                            <strong>Dato gennemført: </strong><br/>
                            <DateFormat dateObj={order.dateCompleted} format="full-pretty"></DateFormat>
                        </Text>
                    </Block>
                </Block>
            )}
        </Block>
    )
}