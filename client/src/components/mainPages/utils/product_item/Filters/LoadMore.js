import React, { useContext } from 'react'
import './Filters.css'
import { GlobalState } from '../../../../../GlobalState'

function LoadMore() {
  const state = useContext(GlobalState)
  const [page, setPage] = state.productsAPI.page
  const [result] = state.productsAPI.result

  return (
    <div className='load-more'>
      {result < page * 9 ? (
        ''
      ) : (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  )
}

export default LoadMore
