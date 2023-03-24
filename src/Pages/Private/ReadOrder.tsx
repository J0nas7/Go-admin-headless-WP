// External
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Internal
import { Text, Block, Heading } from '../../components'
import { useOrders } from '../../service'

const ReadOrder = () => {
    const { readOneOrder } = useOrders()

    const params = useParams<{ orderNr: string }>()
    const orderNr : number = params.orderNr ? parseInt(params.orderNr) : 0

    const [theOrder, setTheOrder] = useState<any>(false);

    useEffect(() => {
        if (typeof orderNr == 'number' && orderNr > 0) {
            readOneOrder(orderNr).then(({ data }) => {
                console.log("GOT THE ORDER", data)
                setTheOrder(data.data)
              })
        } else {
            console.log("orderNr not number")
        }
    }, [])

    return (
        <Block className="w-full">
            <Heading title={'Ordre nr. '+orderNr} className='min-w-full' />
            {theOrder && (
                <Block>
                    <Text variant='p'>deliveryDeadline: {theOrder.deliveryDeadline}</Text>
                    <Text variant='p'>destinationAdr: {theOrder.destinationAdr}</Text>
                    <Text variant='p'>destinationArea: {theOrder.destinationArea}</Text>
                    <Text variant='p'>orderId: {theOrder.orderId}</Text>
                    <Text variant='p'>totalSale: {theOrder.totalSale}</Text>
                    <Text variant='p'>customerId: {theOrder.customerId}</Text>
                    <Text variant='p'>dateCompleted: {theOrder.dateCompleted}</Text>
                    <Text variant='p'>dateCreated: {theOrder.dateCreated}</Text>
                    <Text variant='p'>datePaid: {theOrder.datePaid}</Text>
                    <Text variant='p'>numItemsSold: {theOrder.numItemsSold}</Text>
                    <Text variant='p'>status: {theOrder.status}</Text>
                    <Text variant='p'>theHelperIs: {theOrder.theHelperIs}</Text>
                </Block>
            )}
        </Block>
    )
}

export default ReadOrder