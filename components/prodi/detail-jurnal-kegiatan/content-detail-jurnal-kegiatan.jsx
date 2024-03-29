import { Card, Text, Spacer, Grid, Loading } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";

export const ContentDetailJurnalKegiatan = () => {
  const router = useRouter();
  const [jurnalData, setJurnalData] = useState(null);

  useEffect(() => {
    if (router.query.jurnalData) {
      const data = JSON.parse(router.query.jurnalData);
      setJurnalData(data);
    }
  }, [router.query.jurnalData]);

  if (!jurnalData) {
    return <Loading type="default" />;
  }

  return (
    <Card.Body css={{ py: "$10" }}>
      <Text h3 css={{ ml: "$10" }}>
        Jurnal Kegiatan Minggu {jurnalData.minggu}
      </Text>
      <Grid.Container gap={2} justify="start">
        {jurnalData.data_kegiatan.map((kegiatan) => (
          <Grid key={kegiatan.id_jurnal_kegiatan} xs={12} sm={4} md={4}>
            <Card
              variant="flat"
              css={{
                bg: "$green600",
                borderRadius: "$xl",
                px: "$10",
                flex: "1 1 100%",
                justifyContent: "center",
              }}
            >
              <Card.Body>
                <Text b size="$md" color='white'>
                  <Text b size="$md" color='white'>
                    {DateTime.fromISO(kegiatan.tanggal).setLocale('id').toFormat('EEEE, dd MMMM yyyy')}
                  </Text>
                </Text>
                <Spacer y={0.3} />
                <Text size="$md" color='white'>
                  Bidang Pekerjaan : {kegiatan.bidang_pekerjaan}
                </Text>
                <Spacer y={0.6} />
                <Text size="$md" color='white'>Keterangan :
                  {kegiatan.keterangan.split("\n").map((item, index) => (
                    <React.Fragment key={index}>
                      <br />
                      &bull; {item}
                    </React.Fragment>
                  ))}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Card.Body>
  );
};
