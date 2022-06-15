import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])
    const addCart = state.userAPI.addCart

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params, products])

    if(detailProduct.length === 0) return null

    return (
      <>
          <div className="detail">
              <img src={detailProduct.images.url} alt=""/>
              <div className="box-detail">
                  <div className="row">
                      <h2>{detailProduct.title}</h2>
                      {/* ._id => .product_id */}
                      <h6>#id: M0{detailProduct._id}</h6>
                  </div>
                  <span>{detailProduct.price}.000đ</span>
                  <div className='select-size'>
                    <p>Size</p>
                    <select>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                  <p>{detailProduct.description}</p>
                  <p>{detailProduct.content}</p>
                  <p>Sold: {detailProduct.sold}</p>
                  <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)}>
                        Buy Now
                    </Link>
              </div>
          </div>
          <div className='related'>
              <div style={{display:"flex"}}>
                <h2>Related Products</h2>
                <div className='divide'></div>
              </div>
              <div className="products">
                  {
                    products.map(product => {
                      //if(product._id === detailProduct._id) return null;
                      return product.category === detailProduct.category
                            ? <ProductItem key={product._id} product={product}/> : null
                    })
                  }
              </div>
          </div>
      </>
    )
}

export default DetailProduct