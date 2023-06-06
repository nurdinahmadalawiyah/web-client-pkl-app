import { Button, Loading, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const ApprovePengajuanComponent = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/pengajuan-pkl/akademik/approve-pengajuan/${data.id_pengajuan}?_method=PUT`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Pengajuan disetujui");
        window.location.reload();
      } else {
        console.log("Terjadi kesalahan dalam memproses pengajuan");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
    setIsLoading(false);
  };

  return (data.status == "disetujui" ? (
    <Tooltip content={"Pengajuan telah disetujui, anda tidak bisa mengubah status pengajuan kembali"} color="warning">
      <Button color="success" auto disabled>
        Setujui
      </Button>
    </Tooltip>
  ) : (
    <Button color="success" auto disabled={isLoading} onClick={handleApprove}>
      {isLoading ? <Loading color="currentColor" size="sm" /> : "Setujui"}
    </Button>
  ));
};
