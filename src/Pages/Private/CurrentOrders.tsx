// External
import { useEffect, useState } from 'react'
//import { useParams } from 'react-router-dom'

// Internal
import { useOrders, useSearchForm, usePageNr } from '../../service'
import { Text, Block, Field, Pagination, Heading } from '../../components'

const CurrentOrders = () => {
  const route = '/cur-orders/'
  const [displayOrders, setDisplayOrders] = useState<any>(false)
  const { paginationChange, currentPageNr, pageSize, listSize, setListSize, PaginationIndex } = usePageNr(route)
  const { searchterm, setSearchterm, dosearch, performSearch, SearchActive, SearchEnter } = useSearchForm(route)
  const { readAllOrdersSummary, navigateToOrder } = useOrders()
  
  let ordersClassList = "card-wrapper w-full max-w-[500px] the-order "
  ordersClassList += "md:w-[48%] md:ml-[1%] md:mr-[1%] "
  ordersClassList += "xl:w-[32%] xl:ml-0 xl:mr-[1%]"
  let setupClassList = "md:w-[50%]"

  const readCurrentOrders = () => {
    setDisplayOrders(false)
    setListSize(0)
    readAllOrdersSummary(currentPageNr, dosearch).then(({ data }) => {
      console.log("GOT DATA")
      setDisplayOrders(data.orders)
      setListSize(data.length)
    })
  }

  useEffect(() => {
    console.log("TERMS CHANGED", currentPageNr, dosearch)
    readCurrentOrders()
  }, [currentPageNr, dosearch])

  /*useEffect(() => {
    if (params.getSearch) {
      console.log("PARAM SEARCH")
      //changePageNr(1, false)
      console.log("read orders p:"+currentPageNr+" s:"+dosearch)
      console.log("other P:"+params.pageNr+" S:"+params.getSearch)
      readCurrentOrders()
    }
  }, [params.getSearch])*/

    return (
      <Block className="current-orders">
          <Block className="w-full">
            <Heading title="Igangværende ordrer" />
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
                    onPageChange={(page: number) => paginationChange(page)}
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