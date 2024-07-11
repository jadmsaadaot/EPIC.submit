import React from 'react'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    )
  })
})