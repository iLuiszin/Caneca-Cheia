import React, { useContext } from 'react'
import './Filters.css'
import { GlobalState } from '../../../../../GlobalState'

function Filters() {
  const state = useContext(GlobalState)
  const [category, setCategory] = state.productsAPI.category
  const [categories] = state.categoriesAPI.categories
  const [sort, setSort] = state.productsAPI.sort
  const [search, setSearch] = state.productsAPI.search
  const [setPage] = state.productsAPI.page

  const handleCategory = (e) => {
    setCategory(e.target.value)
    setSearch('')
    setPage(1)
  }

  return (
    <div className='filter_menu'>
      <div className='row'>
        <span>Filtros:</span>
        <select name='category' value={category} onChange={handleCategory}>
          <option value=''>Todos os Produtos</option>
          {categories.map((category) => (
            <option value={'category=' + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type='text'
        value={search}
        id='search'
        placeholder='Insira o nome para pesquisar'
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className='row'>
        <span>Filtros:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value=''>Mais recente</option>
          <option value='sort=oldest'>Mais antigo</option>
          <option value='sort=-sold'>Mais vendido</option>
          <option value='sort=-price'>Preço: Maior para menor</option>
          <option value='sort=price'>Preço: Menor para maior</option>
        </select>
      </div>
    </div>
  )
}

export default Filters
