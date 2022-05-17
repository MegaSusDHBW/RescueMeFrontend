import React from 'react';
import { Alert, CloseIcon, HStack, IconButton, Image, Text, View, VStack, Stack } from 'native-base';

function Message(message) {
  return (<View>
    <Stack>
      <Alert w="100%" h="55%" status={message.status}>
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                {message.title}
              </Text>
            </HStack>
            {/* <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0
              }}
              icon={<CloseIcon size="3" color="coolGray.600" />} /> */}
          </HStack>
        </VStack>
      </Alert>
    </Stack>
  </View>);
}

export default Message;