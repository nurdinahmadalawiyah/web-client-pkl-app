import {
    Dropdown,
    Grid,
  } from "@nextui-org/react";
import React from 'react'

export const DropdownInput = ({prodi, setProdi, handleProdiChange, semester, setSemester, handleSemesterChange}) => {
  return (
    <Grid.Container>
    <Grid xs={6}>
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
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={prodi}
          onSelectionChange={setProdi}
        >
          <Dropdown.Item key="1">Teknik Informatika</Dropdown.Item>
          <Dropdown.Item key="2">Teknik Komputer</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Grid>
    <Grid xs={6}>
      <Dropdown>
        <Dropdown.Button
          flat
          color="primary"
          css={{ tt: "capitalize", width: "100%" }}
        >
          {handleSemesterChange}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Drop Down Semester"
          color="primary"
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
  )
}