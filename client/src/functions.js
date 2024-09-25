export const login = async (username, password) => {
  const response = await fetch("http://localhost/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok){
    throw new Error('Login failed');
  }

  const json = await response.json();

  return json;
};

export const addEmployee = async (info, image) => {
  const response = await fetch("http://localhost:5000/api/employee/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...info,
      image,
    }),
  });

  const json = await response.json();

  return json;
  
};

export const updateEmployee = async (info, image, id) => {
  const response = await fetch(`http://localhost/api/employee/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...info,
      image,
    }),
  });

  const json = await response.json();

  return json;
};
