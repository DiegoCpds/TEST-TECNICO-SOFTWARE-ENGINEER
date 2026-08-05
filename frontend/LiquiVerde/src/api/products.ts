import api from './api'
import type { Product } from '../types/Product'

const normalizeProduct = (item: unknown): Product | null => {
  if (!item || typeof item !== 'object') {
    return null
  }

  const candidate = item as Record<string, unknown>

  return {
    id: Number(candidate.id ?? 0),
    barcode: String(candidate.barcode ?? ''),
    name: String(candidate.name ?? 'Producto sin nombre'),
    price: Number(candidate.price ?? 0),
    stock: Number(candidate.stock ?? 0),
    brand: String(candidate.brand ?? 'Sin marca'),
    category: String(candidate.category ?? 'Sin categoría'),
    carbonFootprint: Number(candidate.carbonFootprint ?? candidate.carbonImpact ?? 0),
    socialImpact: Number(candidate.socialImpact ?? 0),
  }
}

const normalizeProducts = (payload: unknown): Product[] => {
  if (Array.isArray(payload)) {
    return payload.map(normalizeProduct).filter((item): item is Product => item !== null)
  }

  if (payload && typeof payload === 'object') {
    const candidate = payload as Record<string, unknown>

    if (Array.isArray(candidate.products)) {
      return candidate.products.map(normalizeProduct).filter((item): item is Product => item !== null)
    }

    if (Array.isArray(candidate.objetos)) {
      return candidate.objetos.map(normalizeProduct).filter((item): item is Product => item !== null)
    }
  }

  return []
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<unknown>('/products')
  return normalizeProducts(response)
}

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<unknown>(`/products/${id}`)
  return normalizeProduct(response) ?? {
    id,
    barcode: '',
    name: 'Producto no encontrado',
    price: 0,
    stock: 0,
    brand: 'Sin marca',
    category: 'Sin categoría',
    carbonFootprint: 0,
    socialImpact: 0,
  }
}

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await api.post<unknown>('/products', product)
  return normalizeProduct(response) ?? product
}

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await api.put<unknown>(`/products/${id}`, product)
  return normalizeProduct(response) ?? product
}

export const deleteProduct = async (id: number): Promise<unknown> => {
  return api.delete(`/products/${id}`)
}

export const getOptimalProducts = async (budget: number): Promise<Product[]> => {
  const response = await api.post<unknown>('/products/optimal', { budget })
  return normalizeProducts(response)
}

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getOptimalProducts,
}
