import React from 'react'
import {
  Col,
  ColProps,
  Container,
  ContainerProps,
  Row,
  RowProps,
} from 'react-bootstrap'

export const AppContainer: React.ForwardRefRenderFunction<
  HTMLElement,
  ContainerProps & React.ComponentProps<'div'>
> = (props, ref) => {
  return <Container ref={ref} {...props} />
}

export const AppCol: React.ForwardRefRenderFunction<
  HTMLElement,
  ColProps & React.ComponentProps<'div'>
> = (props, ref) => {
  return <Col ref={ref} {...props} />
}

export const AppRow: React.ForwardRefRenderFunction<
  HTMLElement,
  RowProps & React.ComponentProps<'div'>
> = (props, ref) => {
  return <Row ref={ref} {...props} />
}

export const Grid = {
  Col: React.forwardRef(AppCol),
  Container: React.forwardRef(AppContainer),
  Row: React.forwardRef(AppRow),
}
