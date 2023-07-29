import type { NextPage } from 'next';
import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    const validateToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.API_BASE_URL}/check-token`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status === 200) {
          if (role === "Akademik") {
            router.replace("/dashboard-akademik");
          } else if (role === "Prodi") {
            router.replace("/dashboard-prodi");
          }
        } else {
          router.replace("/login-akademik");
        }
      } catch (error) {
        router.replace("/login-akademik");
      }
    };

    if (accessToken) {
      validateToken();
    } else {
      router.replace("/login-akademik");
    }
  }, [router]);

  return null;
};

export default Home;
