import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { code, error }
  } = req;
  if (error) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }

  const redirect_uri = 'http://localhost:3000/api/login';
  const token =
    'Basic ' +
    Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  });

  const data = await response.json();

  if (response.status === 200) {
    res.writeHead(302, {
      Location:
        '/?access_token=' +
        data.access_token +
        '&refresh_token=' +
        data.refresh_token
    });
  }
  res.end();
};
