import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product,deleteProduct}) {
  const state = useContext(GlobalState)
  //const [products] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <div className="row_btn">
            {
              isAdmin ? 
              <>
                  <button id="btn_buy" onClick={()=>deleteProduct(product._id,product.images._id)} >
                      Delete
                  </button>
                  <Link id="btn_view" to={`/edit_product/${product._id}`}>
                      Edit
                  </Link>
              </>
              : <>
                  <Link id="btn_buy" to="#!">
                      Buy
                  </Link>
                  <Link id="btn_view" to={`/detail/${product._id}`}>
                      View
                  </Link>
              </>
            }
          
    </div>
  )
}

export default BtnRender