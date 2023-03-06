// External
import { useEffect, useState } from 'react'

// Internal
import { laravelAPI } from '../../hooks';
import { useAuthContext } from '../../context'

const CurrentOrders = () => {
  const { readAllOrders } = laravelAPI()
  const [currentOrders, setCurrentOrders] = useState<any>([])
  const { logonCreds } = useAuthContext();

  useEffect(() => {
      /*let query = ``
    let variables : any = null
    
    /*query = `query Orders {
        order(id: 448) {
            orderNumber
            metaData {
            key
            value
            }
            billing {
            firstName
            address1
            address2
            postcode
            state
            phone
            email
            country
            company
            city
            }
        }
    }`;*
    query = `query {
        orders {
          edges {
            node {
              subtotal
              total
              lineItems {
                edges {
                  node {
                    productId
                    quantity
                    subtotal
                    total
                  }
                }
              }
              dateCompleted
              paymentMethod
              status
            }
          }
        }
    }`;
  variables = null

    rawAPIRequest(query, variables, logonCreds.authToken)
        .then((res: any) => {
            setCurrentOrders(res.data)
            console.log(res.data)
        });*/
      readAllOrders().then(({ data }) => {
        console.log(data)
        setCurrentOrders(data)
      })
  }, [])

    return (
      <div>
          <h1 className="page-title">Orders ({currentOrders.length})</h1>
          {!currentOrders && (
              <div className="card-wrapper w-full placeholdLoading"></div>
          )}
          {currentOrders && (
                <div className="current-orders-list">
                    {
                        currentOrders && currentOrders.map((item: any, key: string) => {
                            return (
                                <div order-id={item.orderId} className="card-wrapper w-[32%] mr-[1%] the-order" key={key}>
                                    <span className="order-destAdr">{item.destinationAdr}</span>
                                    <span className="order-destArea">{item.destinationArea}</span>
                                    <span className="order-totalSale">{item.totalSale}</span>
                                    <span className="order-delData">{item.delivery_data}</span>
                                    <span className="order-delRange">{item.delivery_range}</span>
                                </div>
                            )
                        })
                    }
                </div>
          )}
      </div>
    )
    /*return (
        <div>
            <h1 className="page-title">Orders</h1>
            {!currentOrders && (
                <div className="card-wrapper w-full placeholdLoading"></div>
            )}
            {currentOrders && (
                <div className="card-wrapper w-full">
                    <h3>{currentOrders.length} orders</h3>
                    {
                        currentOrders && currentOrders.data.orders.edges.map((item: any, key: string) => {
                            return (
                                <div className="category-item" key={key}>
                                    <span className="category-name">{item.dateCompleted}</span>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            <div className="card-wrapper placeholdLoading"></div>
            <div className="card-wrapper placeholdLoading"></div>
        </div>
    )*/
}

export default CurrentOrders