import { Dropdown, Grid, Text } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const DropdownInput = ({
  prodi,
  setProdi,
  handleProdiChange,
}) => {
  const [data, setData] = useState([]);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.API_BASE_URL}/prodi/list`,
          {
            headers: {
              "Content-Type": "application/json",
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
        <Dropdown>
          <Dropdown.Button
            flat
            color="primary"
            css={{ tt: "capitalize", width: "100%", mr: "$6" }}
          >
            {handleProdiChange}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Drop Down Prodi"
            color="primary"
            disabledKeys={["Pilih Prodi"]}
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
  );
};
