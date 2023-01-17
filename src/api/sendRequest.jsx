async function sendRequest(url, method, body = null) {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: method === "POST" ? JSON.stringify(body) : null
    });
  
    if (method === "GET") {
      let result = await response.json();
      return result;
    };
  };

  export default sendRequest;