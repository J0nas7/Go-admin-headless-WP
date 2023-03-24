// External
import { useEffect, useState } from 'react'

// Internal
import { useOrders, useSearchForm, usePageNr } from '../../service'
import { Text, Block, Field, Pagination, Heading, OrderCard } from '../../components'
import { useDocumentTitle } from '../../hooks'
import { OrderDTO } from '../../types'

const CurrentOrders = () => {
  const route = '/cur-orders/'
  const [ordersToRender, setOrdersToRender] = useState<OrderDTO[]>([])
  const { paginationChange, currentPageNr, pageSize, listSize, setListSize, PaginationIndex } = usePageNr(route)
  const { searchterm, setSearchterm, dosearch, performSearch, SearchActive, SearchEnter } = useSearchForm(route)
  const { readAllOrdersSummary } = useOrders()
  const { setDocumentTitle } = useDocumentTitle()
  const docTitle = "Igangværende ordrer"
  
  let ordersClassList = "card-wrapper w-full max-w-[500px] the-order cursor-pointer "
  ordersClassList += "md:w-[48%] md:ml-[1%] md:mr-[1%] "
  ordersClassList += "xl:w-[32%] xl:ml-0 xl:mr-[1%]"
  let setupClassList = "md:w-[50%]"

  const readCurrentOrders = () => {
    setOrdersToRender([])
    setListSize(0)
    readAllOrdersSummary(currentPageNr, dosearch).then(({ data }) => {
      console.log("GOT DATA", data)
      setOrdersToRender(data.data.orders)
      setListSize(data.data.length)
    })
  }

  useEffect(() => {
    setDocumentTitle(docTitle)
  }, [])

  useEffect(() => {
    console.log("TERMS CHANGED", currentPageNr, dosearch)
    readCurrentOrders()
  }, [currentPageNr, dosearch])

    return (
      <Block className="current-orders">
          <Block className="w-full">
            <Heading title={docTitle} />
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
          {!ordersToRender.length && ( <div className={ordersClassList+" placeholdLoading"}>Henter...</div> )}
          {ordersToRender.length && (
            <Block>
                <Block className="current-orders-list">
                    {
                        //displayOrders.length && displayOrders.map((item: any, key: string) => {
                        ordersToRender.length && ordersToRender.map(order => (
                            //return (
                                <OrderCard order={order} format='summary' classList={ordersClassList} key={order.orderId}/>
                            //)
                          ))
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