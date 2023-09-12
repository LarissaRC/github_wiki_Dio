import React from 'react'
import { ButtonContainer } from './styles';

const Botton = ({onClick}) => {
  return (
    <ButtonContainer onClick={onClick}>
        Buscar
    </ButtonContainer>
  )
}

export default Botton;