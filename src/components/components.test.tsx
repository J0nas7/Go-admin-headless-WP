import React from 'react'
import { render, screen } from '@testing-library/react'
import { Heading } from './'

// GET BY
test('shound render same text passed in to title prop', () => {
  render(<Heading title='My header' />)
  const headingElement = screen.getByText(/My header/i)
  expect(headingElement).toBeInTheDocument()
})

/*test('shound render same text passed in to title prop', () => {
    render(<Heading title='My header' />)
    const headingElement = screen.getByRole("heading", { name: "My header"})
    expect(headingElement).toBeInTheDocument()
})

// FIND BY
test('shound render same text passed in to title prop', async () => {
  render(<Heading title='My header' />)
  const headingElement = await screen.findByText(/My header/i)
  expect(headingElement).toBeInTheDocument()
})

// QueryBy
test('shound render same text passed in to title prop', async () => {
  render(<Heading title='My header' />)
  const headingElement = screen.queryByText(/dogs/i)
  expect(headingElement).not.toBeInTheDocument()
})

test('shound render same text passed in to title prop', async () => {
  render(<Heading title='My header' />)
  const headingElements = screen.getAllByRole("heading")
  expect(headingElements.length).toBe(1)
})*/