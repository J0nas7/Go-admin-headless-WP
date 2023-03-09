// External
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Internal
import { useAuthContext } from '../../context'
import { useOrders } from '../../service'
import { Text, Block, Field, Pagination, usePageNr, useSearchForm } from '../../components'

const CurrentOrders = () => {
  const params = useParams<{ pageNr: string }>()
  const [displayOrders, setDisplayOrders] = useState<any>(false)
  const { navigatePageNr, currentPageNr, startResult, endResult, pageSize, listSize, setListSize, PaginationIndex } = usePageNr('/cur-orders', params.pageNr)
  const { searchterm, setSearchterm, dosearch, performSearch, SearchActive, SearchEnter } = useSearchForm()
  const { readAllOrdersSummary, navigateToOrder } = useOrders()

  let ordersClassList = "card-wrapper w-full max-w-[500px] the-order "
  ordersClassList += "md:w-[48%] md:ml-[1%] md:mr-[1%] "
  ordersClassList += "xl:w-[32%] xl:ml-0 xl:mr-[1%]"

  let setupClassList = "md:w-[50%]"

  const readCurrentOrders = () => {
    setDisplayOrders(false)
    setListSize(0)
    readAllOrdersSummary(currentPageNr, searchterm).then(({ data }) => {
      setDisplayOrders(data.orders)
      setListSize(data.length)
    })
  }

  useEffect(() => {
      console.log("read orders "+currentPageNr+" "+dosearch)
      readCurrentOrders()
  }, [currentPageNr, dosearch])

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
                  onChange={(e: string) => setSearchterm(e)}
                  disabled={false}
                  className="search-field"
              />
            </form>
            <Block className="clear-both"/>
            <PaginationIndex classList={setupClassList}/>
            <SearchActive classList={setupClassList}/>
            <SearchEnter classList={setupClassList}/>
            <Block className="clear-both"/>
          </Block>
          {!displayOrders && ( <div className={ordersClassList+" placeholdLoading"}>Henter...</div> )}
          {displayOrders && (
            <Block>
                <Block className="current-orders-list">
                    {
                        displayOrders && displayOrders.map((item: any, key: string) => {
                            return (
                                <div onClick={() => navigateToOrder(item.orderId)} order-id={item.orderId} className={ordersClassList} key={key}>
                                    <Text variant="span" className="order-destAdr float-left">{item.destinationAdr}</Text>
                                    <Text variant="span" className="order-totalSale float-right">Kr. {item.totalSale}</Text>
                                    <Text variant="span" className="order-destArea clear-both float-left">{item.destinationArea}</Text>
                                    <Text variant="span" className="order-deadline float-right">{item.deliveryDeadline}</Text>
                                </div>
                            )
                        })
                    }
                    <Block className="clear-both"/>
                </Block>
                <Block className="w-full mt-2">
                  <Pagination
                    onPageChange={(page: number) => navigatePageNr(page)}
                    totalCount={listSize}
                    currentPage={currentPageNr}
                    pageSize={pageSize}
                    className="current-orders-list"
                  />
                </Block>
            </Block>
          )}
      </Block>
    )
}

export default CurrentOrders