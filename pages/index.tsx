import type { NextPage } from 'next';
import { DashboardAkademik } from '../components/akademik/dashboard';
import { DashboardProdi } from '../components/prodi/dashboard';
import React, { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!accessToken) {
      if (role === "Akademik") {
        return <DashboardAkademik />;
      } else if (role === "Prodi") {
        return <DashboardProdi />;
      }
    }
  }, []);

  return null;
};

export default Home;
