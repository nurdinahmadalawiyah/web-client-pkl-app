import React, { useEffect } from 'react';
import {Flex} from '../../styles/flex';
import { Box } from '../../styles/box';
import { CardWelcomeAkademik } from './card-welcome-akademik';
import { useRouter } from 'next/router';

export const DashboardAkademik = () => {
   const router = useRouter();

   useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const role = localStorage.getItem('role');

      if (!accessToken || !role) {
         router.push('/login-akademik');
      }
   })

   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >

         <Box>
               <Flex
                  css={{
                     'gap': '$10',
                     'flexWrap': 'wrap',
                     'justifyContent': 'center',
                     '@sm': {
                        flexWrap: 'nowrap',
                     },
                  }}
                  direction={'row'}
               >
                  <CardWelcomeAkademik />
               </Flex>
            </Box>
      </Flex>
   );
};
