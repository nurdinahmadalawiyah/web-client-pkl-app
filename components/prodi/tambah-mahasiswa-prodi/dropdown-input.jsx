import { Dropdown, Grid, Text } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const DropdownInput = ({
  prodi,
  setProdi,
  handleProdiChange,
  semester,
  setSemester,
  handleSemesterChange,
}) => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/prodi/list-by-prodi`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setData(result.data.data);
      } catch (error) {
        setServerError(true);
      }
    };

    fetchData();
  }, []);
  
  return (
    <Grid.Container>
      <Grid xs={6}>
        <Dropdown>
          <Dropdown.Button
            flat
            color="success"
            css={{ tt: "capitalize", width: "100%", mr: "$6" }}
          >
            {handleProdiChange}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Drop Down Prodi"
            color="success"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={prodi}
            onSelectionChange={setProdi}
          >
            {serverError ? (
              <Dropdown.Item key="Pilih Prodi">
                <Text color="error">Gagal Memuat Data</Text>
              </Dropdown.Item>
            ) : (
              data.map((prodi) => (
                <Dropdown.Item key={prodi.id_prodi}>
                  {prodi.id_prodi}. {prodi.nama_prodi}
                </Dropdown.Item>
              ))
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
      <Grid xs={6}>
        <Dropdown>
          <Dropdown.Button
            flat
            color="success"
            css={{ tt: "capitalize", width: "100%" }}
          >
            {handleSemesterChange}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Drop Down Semester"
            color="succes"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={semester}
            onSelectionChange={setSemester}
          >
            <Dropdown.Item key="1 (Satu)">1 (Satu)</Dropdown.Item>
            <Dropdown.Item key="2 (Dua)">2 (Dua)</Dropdown.Item>
            <Dropdown.Item key="3 (Tiga)">3 (Tiga)</Dropdown.Item>
            <Dropdown.Item key="4 (Empat)">4 (Empat)</Dropdown.Item>
            <Dropdown.Item key="5 (Lima)">5 (Lima)</Dropdown.Item>
            <Dropdown.Item key="6 (Enam)">6 (Enam)</Dropdown.Item>
            <Dropdown.Item key="7 (Tujuh)">7 (Tujuh)</Dropdown.Item>
            <Dropdown.Item key="8 (Delapan)">8 (Delapan)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );
};
