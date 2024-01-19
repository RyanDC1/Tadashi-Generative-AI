import React, { Component } from 'react'

type Props = {
  fallback?: React.ReactNode,
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false } as State
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack)
  }

  render() {

    return (
      !this.state.hasError ?
        this.props.children
        :
        (this.props.fallback ?? <></>)
    )
  }
}