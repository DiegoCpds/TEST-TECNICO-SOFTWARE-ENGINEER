import { useEffect, useMemo, useState } from 'react'
import ProductList from '../components/productList'
import type { Product } from '../types/Product'
import { getOptimalProducts, getProducts } from '../api/products.ts'



const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price)

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [budget, setBudget] = useState('')
  const [optimizing, setOptimizing] = useState(false)
  const [optimizationMessage, setOptimizationMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const productsData = await getProducts()
        setProducts(productsData)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('No se pudieron cargar los productos. Revisa que el backend esté corriendo en puerto 3000.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({})

  const handleOptimize = async () => {
    const parsedBudget = Number(budget)

    if (!budget || Number.isNaN(parsedBudget) || parsedBudget <= 0) {
      setOptimizationMessage('Ingresa un presupuesto válido en pesos chilenos.')
      return
    }

    try {
      setOptimizing(true)
      setOptimizationMessage(null)
      const optimizedProducts = await getOptimalProducts(parsedBudget)

      if (optimizedProducts.length > 0) {
        setCart((currentCart) => {
          const nextCart = { ...currentCart }

          optimizedProducts.forEach((product) => {
            const currentQty = nextCart[product.id] ?? 0
            nextCart[product.id] = Math.min(currentQty + 1, product.stock)
          })

          return nextCart
        })
      }

      setOptimizationMessage(`Se optimizó el listado con un presupuesto de ${formatPrice(parsedBudget)}.`)
    } catch (err) {
      console.error('Error optimizing products:', err)
      setOptimizationMessage('No se pudo optimizar el listado. Intenta nuevamente.')
    } finally {
      setOptimizing(false)
    }
  }

  const filteredProducts = useMemo(() => {
    const trimmed = search.trim().toLowerCase()

    if (!trimmed) return products

    return products.filter((product) =>
      product.name.toLowerCase().includes(trimmed) ||
      product.category.toLowerCase().includes(trimmed) ||
      product.barcode.includes(trimmed)
    )
  }, [products, search])

  const updateCartItem = (productId: number, nextQuantity: number) => {
    setCart((currentCart) => {
      const updatedCart = { ...currentCart }

      if (nextQuantity <= 0) {
        delete updatedCart[productId]
        return updatedCart
      }

      const product = products.find((item) => item.id === productId)
      if (!product) return updatedCart

      updatedCart[productId] = Math.min(nextQuantity, product.stock)
      return updatedCart
    })
  }

  const addToCart = (product: Product) => {
    updateCartItem(product.id, (cart[product.id] ?? 0) + 1)
  }

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((item) => item.id === Number(id))
      if (!product) return null

      return {
        product,
        quantity,
      }
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <div className="home-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">LiquiVerde</p>
          <h1>Productos del día</h1>
        </div>

        <label className="search-box" aria-label="Buscar productos">
          <span>Buscar</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nombre, categoría o código de barras"
          />
        </label>
      </header>

      <main className="catalog-layout">
        <section className="catalog-section">
          <div className="section-header">
            <h2>Catálogo</h2>
            <span>{filteredProducts.length} productos</span>
          </div>

          

          {loading ? (
            <p className="empty-state">Cargando productos...</p>
          ) : error ? (
            <p className="empty-state">{error}</p>
          ) : (
            <ProductList products={filteredProducts} onAddToCart={addToCart} />
          )}
        </section>
        
        <aside className="cart-panel">
        <div className="optimizer-box">
            <p className="optimizer-title">Optimizador de compra inteligente</p>
            <p className="optimizer-description">
              Ingresa tu presupuesto y optimiza tu carrito para obtener productos que ayuden a disminuir tu impacto ambiental a la vez que ahorras economicamente.
            </p>
            <label className="optimizer-input" htmlFor="budget-input">
              <span>Presupuesto en CLP</span>
              <input
                id="budget-input"
                type="number"
                min="1"
                step="100"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="Ej: 100000"
              />
            </label>

            <button type="button" className="optimize-button" onClick={handleOptimize} disabled={optimizing}>
              {optimizing ? 'Optimizando...' : 'Optimizar compra'}
            </button>
          </div>

          {optimizationMessage ? <p className="optimization-message">{optimizationMessage}</p> : null}
          <div className="cart-header">
            <h2>Carrito</h2>
            <span>{totalItems} items</span>
          </div>

          {cartItems.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío.</p>
          ) : (
            <ul className="cart-list">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <div>
                    <strong>{product.name}</strong>
                    <small>{quantity} x {formatPrice(product.price)}</small>
                  </div>

                  <div className="cart-actions">
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => updateCartItem(product.id, quantity - 1)}
                      aria-label={`Disminuir cantidad de ${product.name}`}
                    >
                      −
                    </button>

                    <span className="quantity-value">{quantity}</span>

                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => updateCartItem(product.id, quantity + 1)}
                      aria-label={`Aumentar cantidad de ${product.name}`}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>

                  <span>{formatPrice(product.price * quantity)}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="cart-summary">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default HomePage
