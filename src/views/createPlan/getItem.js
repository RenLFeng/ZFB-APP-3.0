import React, { useEffect } from 'react'
import { parseURL } from '../../store/URL'

export default function Plan(props) {
  const pathName = props.location.pathname.slice(1)
  console.log('pathName: ', pathName)
  const { id } = { ...parseURL(decodeURI(props.location.search)) }
  const handleGoback = () => {
    window.getLoadData.finishTist()
  }

  const Jump = () => {
    props.history.push({
      pathname: 'planItem',
      query: {
        planId: id,
        goback: handleGoback,
        bankName: ''
      }
    })
  }

  useEffect(() => {
    Jump()
  }, [])

  return <div />
}

// const { planId, bankName, goback } = props.location.query
