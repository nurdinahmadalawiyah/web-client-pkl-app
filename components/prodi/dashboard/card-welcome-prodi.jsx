import {Card, Text} from '@nextui-org/react';
import React from 'react';

export const CardWelcomeProdi = () => {
   return (
      <Card
         css={{

            bg: '#17C964',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Text css={{color: 'white', textAlign: 'center', fontSize: '54px', fontWeight: 'bold'}}>
                  Selamat Datang di Dashboard Prodi<br />
                  Aplikasi Peraktik Kerja Lapangan<br />
                  Politeknik TEDC Bandung
            </Text>
         </Card.Body>
      </Card>
   );
};
