import axios from "axios";

const BASE_URL = "http://localhost:5000";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Company Routes 


export function getStaticFileUrl(relativePath) {
  const normalizedPath = relativePath.replace(/\\/g, "/");
  return `${BASE_URL}/${normalizedPath}`;
}

export const fetchCompany = () => {
  return instance.get("/company");
};

export const createCompany = (formData) => {
  return instance.post("/company", formData);
};
export const uploadLogo = (formData) => {
  return instance.post("/company/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
};
export const updateCompany = (formData) => {
  return instance.patch("/company", formData);
}


// Profile Routes 

export const fetchProfile = () => {
  return instance.get("/users/me");
} 

export const uploadAvatar = (formData) => {
  return instance.post("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
};


// Payment Terms Routes 

export const fetchPaymentTerms = () => {
  return instance.get("/paymentTerms");
}


// Product Routes 

export const fetchProducts = (params) => {
  return instance.get("/product",{ params });
}

export const addProduct = (formData) => {
  return instance.post("/product", formData);
}
export const searchProducts = (searchQuery) => {  
  return instance.get(`/products/search${searchQuery}`);
}
export const editProduct = (id,formData) => {
  return instance.post(`/product/edit/${id}`, formData);
}

// Customer Routes 

export const getCustomers = (params) => { 
  return instance.get("/customer", {params})
}
export const addCustomer = (formData) => {
  return instance.post("/customer", formData);
}



// Estimates Routes 

export const getEstimates = (params) => {
  return instance.get("/estimate", {params})
}



// Invoice Routes 

export const getInvoices = (params) => {
  return instance.get("/invoice", {params})
}

export default instance;
