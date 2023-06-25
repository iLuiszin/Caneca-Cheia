import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api/api'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'
import styles from './CreateProduct.module.css'

const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  content: ' ',
  category: '',
  id: '',
}

function CreateProduct() {
  const [product, setProduct] = useState(initialState)
  const state = useContext(GlobalState)
  const [categories] = state.categoriesAPI.categories
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const navigate = useNavigate()
  const param = useParams()
  const [products] = state.productsAPI.products
  const [onEdit, setOnEdit] = useState(false)
  const [callback, setCallback] = state.productsAPI.callback

  useEffect(() => {
    if (param.id) {
      setOnEdit(true)
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product)
          setImages(product.images)
        }
      })
    } else {
      setOnEdit(false)
      setImages(false)
      setProduct(initialState)
    }
  }, [param.id, products])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const styleUpload = {
    display: images ? 'block' : 'none',
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    try {
      if (!isAdmin) return alert('Você não é um administrador!')

      const file = e.target.files[0]

      if (!file) return alert('Arquivo não existe.')

      if (file.size > 1024 * 1024) return alert('O arquivo é muito grande.')

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert('O arquivo não é uma imagem.')

      let formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await api.post('/api/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      })

      setLoading(false)
      setImages(res.data)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!isAdmin) return alert('Você não é um administrador!')
      if (!images) return alert('Nenhuma imagem foi enviada.')

      if (onEdit) {
        await api.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        )
        alert('Produto editado com sucesso!')
      } else {
        await api.post(
          '/api/products',
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        )
        alert('Produto criado com sucesso!')
      }

      setImages(false)
      setProduct(initialState)
      setCallback(!callback)
      navigate('/')
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const handleDestroy = async (e) => {
    try {
      if (!isAdmin) return alert('Você não é um administrador!')

      setLoading(true)
      await api.post(
        '/api/destroy',
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      )
      setLoading(false)
      setImages(false)
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className={styles.create_product}>
      <div className={styles.upload}>
        <input
          type='file'
          name='file'
          id={styles.file_up}
          onChange={handleUpload}
        />
        {loading ? (
          <div id={styles.file_img}>
            <Loading />{' '}
          </div>
        ) : (
          <div id={styles.file_img} style={styleUpload}>
            <img src={images ? images.url : ''} alt='' />
            <span onClick={handleDestroy}>x</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label id={styles.label} htmlFor='product_id'>
            ID do produto
          </label>

          <input
            type='text'
            name='product_id'
            id='product_id'
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='title'>Título</label>
          <input
            type='text'
            name='title'
            id='title'
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='price'>Preço</label>
          <input
            type='number'
            name='price'
            id='price'
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='description'>Descrição</label>
          <textarea
            rows='7'
            type='text'
            name='description'
            id='description'
            value={product.description}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='content'>Conteúdo</label>
          <input
            type='text'
            name='content'
            id='content'
            value={product.content}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='category'>Categoria</label>
          <br />
          <select
            name='category'
            id='category'
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value=''>
              Por favor, selecione a categoria do produto
            </option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row}>
          <label htmlFor='alcoholic'>O produto é alcólico?</label>
          <br />
          <select
            name='alcoholic'
            id='alcoholic'
            value={product.alcoholic}
            onChange={handleChangeInput}
          >
            <option value=''>Por favor, selecione uma opção</option>
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
        </div>

        <button type='submit'>
          {onEdit ? 'Editar Produto ' : 'Criar Produto'}
        </button>
      </form>
    </div>
  )
}

export default CreateProduct
