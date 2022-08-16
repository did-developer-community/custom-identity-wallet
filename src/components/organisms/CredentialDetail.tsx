import {
  Box,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialDetailProps {
  storedVC: StoredVC;
}

export const CredentialDetail: React.FC<CredentialDetailProps> = ({ storedVC }) => {
  console.log(storedVC);
  // Credentialの詳細を表示する
  return (
    <>
      <Box p={4}>
        <CredentialCard storedVC={storedVC}></CredentialCard>
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>Claim</Tab>
            <Tab>History</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant={"simple"}>
                  <Tbody>
                    {Object.keys(storedVC.credentialSubject).map((key) => (
                      <Tr key={key}>
                        <Td>{key}</Td>
                        <Td>{storedVC.credentialSubject[key]}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
              <TableContainer>
                <Table variant={"simple"}>
                  <Tbody>
                    {/*TODO: 履歴を残す*/}
                    {/* {Object.keys(storedVC.history).map((key) => (
                      <Tr key={key}>
                        <Td>{key}</Td>
                        <Td>{storedVC.credentialSubject[key]}</Td>
                      </Tr>
                    ))} */}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
