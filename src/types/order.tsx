export type OrderDTO = {
    // Required
    orderId: number
    totalSale: number

    // Optional
    destinationAdr?: string
    destinationArea?: string
    deliveryDeadline?: string
    dateCreated?: string
    numItemsSold?: number
    status?: string
    orderStep?: number
    customerId?: number
    datePaid?: string
    dateCompleted?: string
    theHelperIs?: string
    subtotalSale?: number
    shippingTotal?: number
  }