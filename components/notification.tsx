import React, { FunctionComponent } from 'react';
import { Layer, Box, Button, Text, ResponsiveContext } from 'grommet';
import { FormClose, StatusCritical, Emoji } from 'grommet-icons';
import { NotificationType } from '../types/notification';

interface NotificationProps {
  notification: NotificationType;
  onNotificationClose(): void;
}

const Notification: FunctionComponent<NotificationProps> = (props) => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Layer
          position="top"
          modal={false}
          margin={{ top: 'small' }}
          responsive={false}
          style={{
            borderRadius: 30,
            width: size === 'small' ? '100%' : undefined
          }}
        >
          <Box
            align="center"
            direction="row"
            gap="small"
            justify="between"
            flex
            round={size === 'small' ? false : true}
            elevation="medium"
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
            background={props.notification.success ? 'accent-1' : 'neutral-4'}
          >
            <Box align="center" direction="row" gap="xsmall">
              {props.notification.success ? (
                <Emoji size="medium" />
              ) : (
                <StatusCritical size="medium" />
              )}
              <Text size="medium">{props.notification.text}</Text>
            </Box>
            <Button
              focusIndicator={false}
              icon={<FormClose size="medium" />}
              onClick={props.onNotificationClose}
            />
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default Notification;
