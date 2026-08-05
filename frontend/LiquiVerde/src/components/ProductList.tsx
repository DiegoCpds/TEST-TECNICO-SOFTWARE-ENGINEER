import ProductCard from './ProductCard'
import type { Product } from '../types/Product'

type ProductListProps = {
  products: Product[]
  onAddToCart: (product: Product) => void
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No encontramos productos con ese término de búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
