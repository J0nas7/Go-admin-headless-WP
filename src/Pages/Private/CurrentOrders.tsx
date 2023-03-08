// External
import { useEffect, useState } from 'react'

// Internal
import { laravelAPI } from '../../hooks';
import { useAuthContext } from '../../context'
import { Field } from '../../components';

const CurrentOrders = () => {
  const { postWithString } = laravelAPI()
  const [currentOrders, setCurrentOrders] = useState<any>(false)
  const [searchterm,setSearchterm] = useState<string>('')
  const [dosearch,setDoSearch] = useState<string>('')
  const { logonCreds } = useAuthContext();

  let ordersClassList = "card-wrapper w-full max-w-[500px] the-order "
  ordersClassList += "md:w-[48%] md:ml-[1%] md:mr-[1%] "
  ordersClassList += "xl:w-[32%] xl:ml-0 xl:mr-[1%]"

  const readCurrentOrders = () => {
    setCurrentOrders(false)
    postWithString("readAllOrdersSummary", searchterm).then(({ data }) => {
      setCurrentOrders(data)
    })
  }

  const updateSearchTerm = (term : string) => {
    setSearchterm(term)
  }
  
  const performSearch = (e : any) => {
    e.preventDefault()
    setDoSearch(searchterm)
    readCurrentOrders()
  }

  useEffect(() => {
      readCurrentOrders()
  }, [])

    return (
      <div className="current-orders">
          <div className="w-full">
            <h1 className="page-title w-[50%]">Igangværende ordrer ({currentOrders.length})</h1>
            <form onSubmit={performSearch}>
              <Field
                  type="text"
                  lbl=""
                  displayLabel={false}
                  value={searchterm}
                  placeholder="Søg og tryk på enter"
                  onChange={(e: string) => updateSearchTerm(e)}
                  disabled={false}
                  className="search-field"
              />
            </form>
            <div className="clear-both"></div>
            {dosearch && ( <p className="block w-full my-2">Søgning efter: "{dosearch}"</p> )}
            {searchterm && !dosearch && ( <p className="block w-full my-2">Tryk på enter for at søge</p> )}
          </div>
          {!currentOrders && (
              <div className={ordersClassList+" placeholdLoading"}>Henter...</div>
          )}
          {currentOrders && (
                <div className="current-orders-list">
                    <div order-id="0" className={ordersClassList}>
                        <span className="order-destAdr float-left">Birkhøjterrasserne 431D</span>
                        <span className="order-totalSale float-right">Kr. 1,037.59</span>
                        <span className="order-destArea clear-both float-left">3520 Farum</span>
                        <span className="order-deadline float-right">Senest kl. 17:00</span>
                    </div>
                    {
                        currentOrders && currentOrders.map((item: any, key: string) => {
                            return (
                                <div order-id={item.orderId} className={ordersClassList} key={key}>
                                    <span className="order-destAdr float-left">{item.destinationAdr}</span>
                                    <span className="order-totalSale float-right">Kr. {item.totalSale}</span>
                                    <span className="order-destArea clear-both float-left">{item.destinationArea}</span>
                                    <span className="order-deadline float-right">{item.deliveryDeadline}</span>
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