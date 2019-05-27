import React from 'react'
import Loader from '../Loader'

export const WithLoading = Component => ({ isLoading, ...props }) =>
  isLoading ? <Loader /> : <Component {...props} />
