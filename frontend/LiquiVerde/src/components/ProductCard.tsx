import type { Product } from '../types/Product'

type ProductCardProps = {
    product: Product
    onAddToCart: (product: Product) => void
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(price)

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-badge">{product.category}</div>
            <h3>{product.name}</h3>

            <div className="product-meta">
                <span>Precio</span>
                <strong>{formatPrice(product.price)}</strong>
            </div>
            <div className="product-meta">
                <span>Marca</span>
                <strong>{product.brand || 'Sin marca'}</strong>
            </div>

            <div className="product-meta">
                <span>Huella de carbono</span>
                <strong>{product.carbonFootprint}</strong>
            </div>

            <div className="product-meta">
                <span>Impacto social</span>
                <strong>{product.socialImpact}</strong>
            </div>

            <div className="product-meta">
                <span>Stock</span>
                <strong>{product.stock}</strong>
            </div>

            <div className="product-meta">
                <span>Codigo de barras</span>
                <strong>{product.barcode}</strong>
            </div>

            <button
                type="button"
                className="add-button"
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
            >
                {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
            </button>
        </article>
    )
}

export default ProductCard
