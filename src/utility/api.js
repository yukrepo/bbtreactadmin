import axios from "axios"

const BASE_URL = "http://localhost:5000"

// const BASE_URL = "https://invoice-backend-nf7r.onrender.com";
// const BASE_URL = "http://backend.nextbill.io"


const instance = axios.create({
  baseURL: BASE_URL
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Company Routes 


export function getStaticFileUrl(relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, "/")
  return `${BASE_URL}/${normalizedPath}`
}

export const fetchCompany = () => {
  return instance.get("/company")
}

export const createCompany = (formData) => {
  return instance.post("/company", formData)
}
export const uploadLogo = (formData) => {
  return instance.post("/company/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
export const updateCompany = (formData) => {
  return instance.patch("/company", formData)
}

export const fetchPrefixData = () => {
  return instance.get("/company/prefix")
}

export const setPrefixData = (formData) => {
  return instance.patch("/company/prefix", formData)
}


// Profile Routes 

export const fetchProfile = () => {
  return instance.get("/users/me")
}

export const uploadAvatar = (formData) => {
  return instance.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const forgotPassword = (formdata) => {
  return instance.post("users/forgotPassword", formdata)
}

export const changePassword = (formData) => {
  return instance.post("/users/changePassword", formData)
}


// Payment Terms Routes 

export const fetchPaymentTerms = () => {
  return instance.get("/paymentTerms")
}
export const addPaymentTerm = (params) => {
  return instance.post("/paymentTerms", params)
}
export const deletePaymentTerms = (id) => {
  return instance.delete(`/paymentTerms/${id}`)
}


// Product Routes 

export const fetchProducts = (params) => {
  return instance.get("/product", { params })
}

export const addProduct = (formData) => {
  return instance.post("/product", formData)
}
export const searchProducts = (searchQuery) => {
  return instance.get(`/products/search${searchQuery}`)
}
export const editProduct = (id, formData) => {
  return instance.post(`/product/edit/${id}`, formData)
}
export const getAllProducts = () => {
  return instance.get("/allProducts")
}

// Customer Routes 

export const getCustomers = (params) => {
  return instance.get("/customer", { params })
}
export const addCustomer = (formData) => {
  return instance.post("/customer", formData)
}
export const getAllCustomers = () => {
  return instance.get("/customer/all")
}


// Estimates Routes 

export const getEstimates = (params) => {
  return instance.get("/estimate", { params })
}

export const getEstimateRef = () => {
  return instance.get("/getNextEstimateRefNo")
}

export const createEstimate = (formData) => {
  return instance.post("/estimate", formData)
}

export const getEstimateById = (id) => {
  return instance.get(`/estimate/${id}`)
}


// Invoice Routes 

export const getInvoices = (params) => {
  return instance.get("/invoice", { params })
}
export const getInvoiceRef = () => {
  return instance.get("/invoice/nextInvoiceNumber")
}
export const createInvoice = (formData) => {
  return instance.post("/invoice", formData)
}
export const getInvoiceById = (id) => {
  return instance.get(`/invoice/${id}`)
}
export const estimateToInvoice = (formData) => {
  return instance.post("/estimateToInvoice", formData)
}


export default instance
