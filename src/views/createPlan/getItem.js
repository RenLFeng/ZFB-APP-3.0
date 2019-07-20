import React, { useEffect } from 'react'
import { parseURL } from '../../store/URL'

export default function Plan(props) {
  const pathName = props.location.pathname.slice(1)
  console.log('pathName: ', pathName)
  const { planId,token} = { ...parseURL(decodeURI(props.location.search)) }
  const handleGoback = () => {
    window.getLoadData.finishTist()
  }

  const Jump = () => {
    if(token){
    localStorage.setItem('token',token)
    }
    props.history.push({
      pathname: 'planItem',
      query: {
        planId: planId,
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
