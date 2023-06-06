const API_BASE_URL = "http://backend-pkl-app.test/api";

export const loginAkademik = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/akademik/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Login Gagal');
    }
  } catch (error) {
    console.error("Terjadi Kesalahan Koneksi:", error);
    throw new Error('Terjadi Kesalahan Koneksi');
  }
};

export const getPengajuanPkl = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pengajuan-pkl/akademik`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iYWNrZW5kLXBrbC1hcHAudGVzdFwvYXBpXC9ha2FkZW1pa1wvbG9naW4iLCJpYXQiOjE2ODUwODA1MjksImV4cCI6MTY4NTY4NTMyOSwibmJmIjoxNjg1MDgwNTI5LCJqdGkiOiJOR2ZVVVNQaVFGQjREVTEyIiwic3ViIjoxLCJwcnYiOiJjMzFkNjNlMjUyNGZiMTU3M2ExMzg5ZjNiYjExYzlhMDIwZmQ5MzY1In0.f9aSdDip5RWRRO8cvZUnDTzosfImsmacmKaneiQQQ1A',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Login Gagal');
    }
  } catch (error) {
    throw new Error('Terjadi Kesalahan Koneksi');
  }
};
