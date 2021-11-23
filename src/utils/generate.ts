interface data {
  username: string,
  period: string,
  ratio: string,
}

const generate = async (theme: string, data: data): Promise<[Response, boolean]> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  const body = JSON.stringify({
    user: data.username,
    period: data.period,
    ratio: data.ratio,
  });
  
  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };
  
  const resp = await fetch(`/api/generate/${theme}`, requestOptions);
  if (!resp.ok) return [ resp, true ];
  return [ resp, false ];
}

export default generate;