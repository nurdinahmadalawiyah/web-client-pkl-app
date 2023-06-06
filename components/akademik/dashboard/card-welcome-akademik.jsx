import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../../styles/flex';

export const CardWelcomeAkademik = () => {
   return (
      <Card
         css={{

            bg: '$blue600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
            <Text css={{color: 'white', textAlign: 'center', fontSize: '64px', fontWeight: 'bold'}}>
                  Selamat Datang di Dashboard Akademik Aplikasi Peraktik Kerja Lapangan Politeknik TEDC Bandung
            </Text>
            </Flex>
         </Card.Body>
      </Card>
   );
};
