import type { Field } from '../interfaces';

interface Data {
  username: string,
  period: string,
  ratio: string,
  fields?: Field[]
}

const generate = async (theme: string, data: Data): Promise<[Response, boolean]> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  const body = JSON.stringify({
    user: data.username,
    period: data.period,
    ratio: data.ratio,
    fields: data?.fields
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