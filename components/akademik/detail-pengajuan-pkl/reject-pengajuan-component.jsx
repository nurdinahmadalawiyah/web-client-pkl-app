import { Button, Loading, Tooltip } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const RejectPengajuanComponent = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/pengajuan-pkl/akademik/reject-pengajuan/${data.id_pengajuan}?_method=PUT`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Pengajuan ditolak");
        window.location.reload();
      } else {
        console.log("Terjadi kesalahan dalam memproses pengajuan");
      }
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
    setIsLoading(false);
  };

  return data.status === "ditolak" ? (
    <Tooltip content={"Pengajuan telah ditolak"} color="error">
      <Button color="error" auto disabled>
        Tolak
      </Button>
    </Tooltip>
  ) : data.status === "disetujui" ? (
    <Tooltip content={"Pengajuan telah disetujui, anda tidak bisa mengubah status pengajuan kembali"} color="warning">
      <Button color="error" auto disabled>
        Tolak
      </Button>
    </Tooltip>
  ) : (
    <Button color="error" auto disabled={isLoading} onClick={handleReject}>
      {isLoading ? <Loading color="currentColor" size="sm" /> : "Tolak"}
    </Button>
  );
};
