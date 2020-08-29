import React, { FunctionComponent, useEffect } from 'react';
import { Box } from 'grommet';
import { BounceLoader } from 'react-spinners';

interface RedirectProps {
  redirect: string;
  handleError(): void;
}

const Redirect: FunctionComponent<RedirectProps> = (props) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      props.handleError();
    } else {
      getTokens(params.get('code')).then((data) => {
        window.location.href =
          props.redirect +
          '?access_token=' +
          data.access_token +
          '&refresh_token=' +
          data.refresh_token;
      });
    }
  }, []);

  const getTokens = async (code: string) => {
    const token =
      'Basic ' +
      Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${props.redirect}`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });

    return await response.json();
  };
  return (
    <Box align="center" justify="center">
      <BounceLoader size={300} color="#6FFFB0" />
    </Box>
  );
};

export default Redirect;
