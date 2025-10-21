interface FetchOptions extends RequestInit {
    credentials?: RequestCredentials;
  }
  
  export const apiRequest = async <T>(
    method: string,
    endpoint: string,
    data?: unknown,
    options?: FetchOptions
  ): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
    try {
      console.log(`API Request: ${method} ${baseUrl}${endpoint}`);
      console.log('Request data:', data);
      console.log('Request options:', options);
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...(options?.headers || {}),
        },
        credentials: "include",
        mode: 'cors',
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Handle redirect responses (3xx status codes)
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        console.error('Redirect detected:', {
          status: response.status,
          location: location,
          url: `${baseUrl}${endpoint}`
        });
        throw new Error(`Backend mengembalikan redirect ke ${location}. Pastikan endpoint ${endpoint} tersedia di backend.`);
      }
  
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP error! status: ${response.status}` };
        }
        
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: `${baseUrl}${endpoint}`
        });
        
        // Handle specific error cases
        if (response.status === 401) {
          // Unauthenticated - redirect to login or show auth error
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            // You can add redirect logic here if needed
          }
          throw new Error("Unauthenticated. Silakan login kembali.");
        }
        
        if (response.status === 302) {
          throw new Error("Backend tidak memiliki endpoint yang diminta. Silakan periksa konfigurasi backend.");
        }
        
        if (response.status === 404) {
          throw new Error("Endpoint tidak ditemukan. Silakan periksa konfigurasi backend.");
        }
        
        if (response.status === 0) {
          throw new Error("CORS Error: Tidak dapat mengakses backend. Pastikan backend berjalan dan CORS dikonfigurasi dengan benar.");
        }
        
        throw new Error(errorData.message || `Terjadi kesalahan pada server (${response.status})`);
      }
  
      return response.json();
    } catch (error) {
      console.error("API Request Error:", error);
      
      // Handle specific error types
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error("CORS Error: Tidak dapat mengakses backend. Pastikan backend berjalan di http://localhost:8000 dan CORS dikonfigurasi dengan benar.");
      }
      
      if (error instanceof Error && error.message.includes('CORS')) {
        throw error;
      }
      
      throw new Error(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };