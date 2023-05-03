// External
import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

// Internal
import { usePageNr, useSearchForm } from '.'
import CurrentOrders from '../Pages/Private/CurrentOrders'
import { PrivateLayoutMock, privateWrapper as wrapper } from '../test-env'

test('Should render the PaginationIndex "no content"', async () => {
  const { result } = renderHook(() => usePageNr("/"), { wrapper })
  
  act(() => {
    result.current.setListSize(24)
    render( <PrivateLayoutMock><CurrentOrders /></PrivateLayoutMock> )
  })
  
  expect(result.current.listSize).toBe(24)
  const spanElement = screen.queryByText(/Side 1 viser resultat: 1-12 af 0/i)
  const spanElement2 = screen.getByText(/Ingen resultater/i)
  expect(spanElement).not.toBeInTheDocument()
  expect(spanElement2).toBeInTheDocument()
})

test('Should render the SearchEnter block', async () => {
  const { result } = renderHook(() => useSearchForm("/"), { wrapper })
  
  act(() => {
    result.current.setSearchterm("hej")
    render( <PrivateLayoutMock><CurrentOrders /></PrivateLayoutMock> )
  })
  
  expect(result.current.searchterm).toBe("hej")
  const spanElement = screen.queryByText(/Tryk på enter for at søge/i)
  const spanElement2 = screen.getByText(/Udfyld søgeord/i)
  expect(spanElement).not.toBeInTheDocument()
  expect(spanElement2).toBeInTheDocument()
})