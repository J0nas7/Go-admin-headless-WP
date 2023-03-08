// External
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Internal
import { laravelAPI } from '../../hooks'
import { useAuthContext } from '../../context'
import { Text, Block, Field, Pagination } from '../../components'

const CurrentOrders = () => {
  const { postWithData } = laravelAPI()
  const navigate = useNavigate()
  const [currentOrders, setCurrentOrders] = useState<any>(false)
  const [listSize, setListSize] = useState<any>(false)
  const [searchterm,setSearchterm] = useState<string>('')
  const [dosearch,setDoSearch] = useState<string>('')
  const { logonCreds } = useAuthContext()
  const params = useParams<{ pageNr: string }>()

  const pageNr : number = params.pageNr ? parseInt(params.pageNr?.replace("side-", "")) : 1
  console.log(pageNr)
  const startResult : number = (pageNr - 1) * 10 + 1
  const endResult : number = startResult + 9
  let PageSize = 10
  const setCurrentPageNr = (pageNr : number) => {
    const theUrl = `/side-${pageNr}`
    navigate(`/cur-orders${pageNr > 1 ? theUrl : ''}`)
  }

  let ordersClassList = "card-wrapper w-full max-w-[500px] the-order "
  ordersClassList += "md:w-[48%] md:ml-[1%] md:mr-[1%] "
  ordersClassList += "xl:w-[32%] xl:ml-0 xl:mr-[1%]"

  let setupClassList = "md:w-[50%]"

  const readCurrentOrders = () => {
    setCurrentOrders(false)
    setListSize(false)

    const postData = {
      "pageNr" : pageNr ? pageNr : 1,
      "searchTerm" : searchterm
    }

    postWithData("readAllOrdersSummary", postData).then(({ data }) => {
      setCurrentOrders(data.orders)
      setListSize(data.length)
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
      console.log("read orders")
      readCurrentOrders()
  }, [pageNr])

    return (
      <Block className="current-orders">
          <Block className="w-full">
            <Text variant="h1">Igangværende ordrer</Text>
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
            <Block/>
            {currentOrders && ( <Text className={setupClassList}>Viser resultat: {startResult}-{endResult} af {listSize}</Text> )}
            {dosearch && ( <Text className={setupClassList+" md:text-right md:float-right"}>Søgning efter: "{dosearch}"</Text> )}
            {searchterm && !dosearch && ( <Text className={setupClassList+" md:text-right md:float-right"}>Tryk på enter for at søge</Text> )}
            <Block/>
          </Block>
          {!currentOrders && (
              <div className={ordersClassList+" placeholdLoading"}>Henter...</div>
          )}
          {currentOrders && (
            <Block>
                <Block className="current-orders-list">
                    {/*<div order-id="0" className={ordersClassList}>
                        <span className="order-destAdr float-left">Birkhøjterrasserne 431D</span>
                        <span className="order-totalSale float-right">Kr. 1,037.59</span>
                        <span className="order-destArea clear-both float-left">3520 Farum</span>
                        <span className="order-deadline float-right">Senest kl. 17:00</span>
                    </div>*/}
                    {
                        currentOrders && currentOrders.map((item: any, key: string) => {
                            return (
                                <div order-id={item.orderId} className={ordersClassList} key={key}>
                                    <Text variant="span" className="order-destAdr float-left">{item.destinationAdr}</Text>
                                    <Text variant="span" className="order-totalSale float-right">Kr. {item.totalSale}</Text>
                                    <Text variant="span" className="order-destArea clear-both float-left">{item.destinationArea}</Text>
                                    <Text variant="span" className="order-deadline float-right">{item.deliveryDeadline}</Text>
                                </div>
                            )
                        })
                    }
                    <Block/>
                </Block>
                <Block className="w-full mt-2">
                  <Pagination
                    onPageChange={(page: number) => setCurrentPageNr(page)}
                    totalCount={listSize}
                    currentPage={pageNr}
                    pageSize={PageSize}
                    className="current-orders-list"
                  />
                </Block>
            </Block>
          )}
      </Block>
    )
}

export default CurrentOrders