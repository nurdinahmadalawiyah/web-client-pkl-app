import { Card, Text, Spacer, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Flex } from "../../styles/flex";
import { useRouter } from "next/router";
import { CardDetailMahasiswa } from "./card-detail-mahasiswa";
import { CardDetailTempatPkl } from "./card-detail-tempat-pkl";
import { CardBiodataIndustri } from "./card-biodata-industri";
import { CardJurnalKegiatan } from "./card-jurnal-kegiatan";
import { CardDaftarHadir } from "./card-daftar-hadir";
import { CardNilaiPkl } from "./card-nilai-pkl";
import { CardLaporanPkl } from "./card-laporan-pkl";

export const ContentDetailDataPklMahasiwa = () => {
  const router = useRouter();
  const { data } = router.query;
  const [dataState, setDataState] = useState({});

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      setDataState(parsedData);
    }
  }, [data]);

  console.log(dataState);

  return (
    <Card.Body css={{ py: "$10" }}>
      {dataState && Object.keys(dataState).length > 0 ? (
        <>
          <Text h3 css={{ ml: "$10" }}>
            Detail Data PKL<>&nbsp;</>
            {dataState.nama_mahasiswa}
          </Text>
          <Spacer y={1} />
          <Flex
            css={{
              gap: "$10",
              flexWrap: "wrap",
              ml: "$10",
              mr: "$10",
              justifyContent: "center",
              "@sm": {
                flexWrap: "nowrap",
              },
            }}
            direction={"row"}
          >
            <Card
              css={{
                bg: "$green600",
                borderRadius: "$xl",
                px: "$6",
                flex: "1 1 100%",
                marginBottom: "10px",
                justifyContent: "center",
              }}
            >
              <CardDetailMahasiswa data={dataState} />
            </Card>
            <Card
              css={{
                bg: "#30E3CA",
                borderRadius: "$xl",
                flex: "1 1 100%",
                marginBottom: "10px",
              }}
            >
              <CardDetailTempatPkl data={dataState} />
            </Card>
          </Flex>
          <Spacer y={1} />
          <Flex
            css={{
              gap: "$10",
              flexWrap: "wrap",
              ml: "$10",
              mr: "$10",
              justifyContent: "center",
              "@sm": {
                flexWrap: "nowrap",
              },
            }}
            direction={"row"}
          >
            <CardBiodataIndustri data={dataState} />
            <CardJurnalKegiatan data={dataState} />
            <CardNilaiPkl data={dataState} />
            <CardDaftarHadir data={dataState} />
            <CardLaporanPkl data={dataState} />
          </Flex>
        </>
      ) : (
        <Loading size="xl" color="success" />
      )}
    </Card.Body>
  );
};
