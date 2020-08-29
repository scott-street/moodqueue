import { NextApiRequest, NextApiResponse } from 'next';

/**
 * this api route is currently not being used, but i'm just
 * leaving it here for reference and because it's still the only
 * file in the api folder
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { code, error }
  } = req;
  if (error) {
    res.writeHead(302, { Location: '/' });
    res.end();
  }

  console.log(process.env.REACT_APP_REDIRECT);
  const token =
    'Basic ' +
    Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REACT_APP_REDIRECT}`,
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
