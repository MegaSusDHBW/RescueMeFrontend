export async function Post(url, content) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  };

  try {
    await fetch(
      url,
      requestOptions,
    ).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return console.error("Http post request not ok: " + response.json());
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export async function GET(uri) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    await fetch(
      url,
      requestOptions,
    ).then(response => {
      return response.json()
    });
  } catch (error) {
    console.error(error);
  }
}

export async function Put(url, content) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  };

  try {
    await fetch(
      url,
      requestOptions,
    ).then(response => {
      return response.json()
    });
  } catch (error) {
    console.error(error);
  }
};

export const ipAddress = 'http://10.0.2.2:5000/';
//export const ipAddress= ' http://178.63.84.123:5000/';