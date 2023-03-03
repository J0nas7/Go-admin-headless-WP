// External
import { useEffect, useState } from 'react'

// Internal
import { useAPI } from '../../hooks';
import { useAuthContext } from '../../context'

const CurrentOrders = () => {
  const { apiData, simpleAPIRequest, rawAPIRequest } = useAPI()
  const [currentOrders, setCurrentOrders] = useState<any>(null)
  const { logonCreds } = useAuthContext();

  useEffect(() => {
    let query = ``
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
    }`;*/
    query = `{
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
            });
  }, []);

    return (
        <div>hej</div>
    )
    /*return (
        <div>
            <h1 className="page-title">Orders</h1>
            {!currentOrders && (
                <div className="card-wrapper w-full placeholdLoading"></div>
            )}
            {currentOrders && (
                <div className="card-wrapper w-full">
                    <h3>{currentOrders.data.orders.edges.length} orders</h3>
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