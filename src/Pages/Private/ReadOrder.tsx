// External
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Internal
import { Block, Heading, OrderCard } from '../../components'
import { useOrders } from '../../service'
import { useDocumentTitle } from '../../hooks'
import { OrderDTO } from '../../types'

const ReadOrder = () => {
    const { readOneOrder, singleOrder } = useOrders()
    const params = useParams<{ orderNr: string }>()
    const orderNr : number = params.orderNr ? parseInt(params.orderNr) : 0
    const { setDocumentTitle } = useDocumentTitle()
    const [theOrder, setTheOrder] = useState<OrderDTO | undefined>();
    const docTitle = 'Order nr. '+orderNr

    useEffect(() => {
        setDocumentTitle(docTitle)

        if (typeof orderNr == 'number' && orderNr > 0) {
            readOneOrder(orderNr)
        } else {
            console.log("orderNr not number")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (singleOrder) {
            //console.log("singleOrder", singleOrder)
            setTheOrder(singleOrder)
        }
    }, [singleOrder])

    return (
        <Block className="w-full">
            <Heading title={docTitle} className='min-w-full' />
            {theOrder && (
                <OrderCard order={theOrder} format='single' />
            )}
        </Block>
    )
}

export default ReadOrder