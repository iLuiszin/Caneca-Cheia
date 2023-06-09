import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function LoadMore() {
  const state = useContext(GlobalState)
  const [page, setPage] = state.productsAPI.page
  const [result] = state.productsAPI.result

  return (
    <div className='load-more'>
      {result < page * 9 ? (
        ''
      ) : (
        <button onClick={() => setPage(page + 1)}>Carregar mais</button>
      )}
    </div>
  )
}

export default LoadMore
