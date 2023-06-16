import { Card, Text } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Box } from "../../styles/box";
import { TicketStar } from "react-iconly";
import { useRouter } from "next/router";

export const CardNilaiPkl = ({ data }) => {
  const router = useRouter();
  const [getData, setGetData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.API_BASE_URL}/penilaian-prodi/prodi/${data.id_mahasiswa}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setGetData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    router.push(`/detail-nilai-pkl?id_mahasiswa=${data.id_mahasiswa}&nama_mahasiswa=${data.nama_mahasiswa}&id_tempat_pkl=${data.id_tempat_pkl}`);
  };

  return (
    <Card
      isPressable
      isHoverable
      css={{
        bg: "#F5A524",
        borderRadius: "$xl",
        flex: "1 1 100%",
        marginBottom: "10px",
      }}
      onPress={handleClick}
    >
      <Card.Body>
        <Box css={{ textAlign: "center" }}>
          <TicketStar set="bold" primaryColor="white" size={100} />
        </Box>
        <Box css={{ textAlign: "center" }}>
          <Text size={16} b color="white">
            Nilai PKL
          </Text>
        </Box>
      </Card.Body>
    </Card>
  );
};
