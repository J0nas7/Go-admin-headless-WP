// External
import { useEffect, useState } from 'react'

// Internal
import { useAPI } from '../../hooks';

const CurrentOrders = () => {
  const { apiData, simpleAPIRequest, rawAPIRequest } = useAPI()
  const [currentOrders, setCurrentOrders] = useState<any>(null)

  useEffect(() => {
    let query = ``
    let variables : any = null

    query = `{
    productCategories(where: {parent: null}, first: 3, after: "YXJyYXljb25uZWN0aW9uOjU5") {
      nodes {
        name
        parentDatabaseId
      }
      pageInfo {
        endCursor
      }
    }
  }`;
  variables = null

  rawAPIRequest(query, variables)
            .then((res: any) => {
                setCurrentOrders(res.data)
            });
  }, []);

    return (
        <div>
            <h1 className="page-title">Orders</h1>
            {!currentOrders && (
                <div className="card-wrapper w-full placeholdLoading"></div>
            )}
            {currentOrders && (
                <div className="card-wrapper w-full">
                    <h3>{currentOrders.data.productCategories.nodes.length} categories</h3>
                    {
                        currentOrders && currentOrders.data.productCategories.nodes.map((item: any, key: string) => {
                            return (
                                <div className="category-item" key={key}>
                                    <span className="category-name">{item.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            )}
            <div className="card-wrapper placeholdLoading"></div>
            <div className="card-wrapper placeholdLoading"></div>
        </div>
    )
}

export default CurrentOrders