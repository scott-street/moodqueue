import React, { FunctionComponent } from 'react';
import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Text,
  Avatar
} from 'grommet';
import { Favorite, ShareOption, Next, Spotify, User } from 'grommet-icons';
import { UserInfo } from '.';

interface FormProps {
  user: UserInfo;
}

/**
 * the ui of this component should obviously be altered, i just quickly threw some components at the screen
 * @param props
 */
const Form: FunctionComponent<FormProps> = (props) => {
  const greeting = 'hello, ' + (props.user.name.toLowerCase() || 'friend');
  return (
    <Box align="center" justify="center">
      <Box direction="row" align="center" gap="small">
        <Heading textAlign="center" size="large">
          {greeting}
        </Heading>
        {props.user.profileImage ? (
          <Avatar
            src={props.user.profileImage}
            size="xlarge"
            onClick={() => window.open(props.user.profileUrl, '_blank')}
            title="click to open your profile in spotify"
          />
        ) : (
          <Avatar
            background="accent-2"
            size="large"
            onClick={() => window.open(props.user.profileUrl, '_blank')}
            title="click to open your profile in spotify"
          >
            <User color="accent-1" size="large" />
          </Avatar>
        )}
      </Box>
      <Box direction="row" gap="large" align="center">
        <Card
          height="medium"
          width="medium"
          background="light-1"
          align="center"
          elevation="none"
          border={{ side: 'all', color: 'accent-1', size: 'medium' }}
        >
          <CardHeader>
            <Heading textAlign="center">playlist</Heading>
          </CardHeader>
          <CardBody align="center" justify="between" pad="small">
            <Text textAlign="center">
              create a public or private playlist of songs based on a mood of
              your choosing
            </Text>
            <Button
              label="continue"
              alignSelf="center"
              icon={<Next />}
              reverse
              primary
              color="neutral-3"
            />
          </CardBody>
          <CardFooter background="light-3" fill="horizontal">
            <Button icon={<Favorite color="red" />} hoverIndicator />
            <Button icon={<ShareOption />} hoverIndicator />
          </CardFooter>
        </Card>
        <Card
          height="medium"
          width="medium"
          background="light-1"
          align="center"
          elevation="none"
          border={{ side: 'all', color: 'accent-1', size: 'medium' }}
        >
          <CardHeader>
            <Heading textAlign="center">queue</Heading>
          </CardHeader>
          <CardBody align="center" justify="between" pad="small">
            <Text textAlign="center">
              add select songs to your queue based on a mood of your choosing
            </Text>
            <Button
              label="continue"
              alignSelf="center"
              icon={<Next />}
              reverse
              primary
            />
          </CardBody>
          <CardFooter fill="horizontal" background="light-3">
            <Button icon={<Favorite color="red" />} hoverIndicator />
            <Button icon={<ShareOption />} hoverIndicator />
          </CardFooter>
        </Card>
      </Box>
      <Heading textAlign="center" size="medium">
        let your mood inspire you
      </Heading>
      <Spotify size="large" color="accent-1" />
    </Box>
  );
};

export default Form;
