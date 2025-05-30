import React, { Children } from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const StyledMyContaier = styled(Container)`
    max-width: 100vw;
    width: 100% ; 
    padding: 0 60px ; 
    @media screen and (max-width: 567px) {
      padding: 0 30px;
    }
    @media screen and (max-width: 400px) {
      padding: 0 10px;
    }
`
function MyContainer({children}) {
  return (
    <StyledMyContaier>
        {children}
    </StyledMyContaier>
  )
}

export default MyContainer