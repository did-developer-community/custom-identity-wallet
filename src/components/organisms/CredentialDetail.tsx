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
  Text,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

import { useStoredVCs } from "../../hooks/useStoredVCs";
import { CredentialCard } from "../molecules/CredentialCard";

export const CredentialDetail: React.FC = () => {
  const router = useRouter();
  const { vcID } = router.query;
  const { storedVCs } = useStoredVCs(vcID as string);

  const storedVC = React.useMemo(() => {
    return storedVCs[0];
  }, [storedVCs]);

  return (
    <>
      {storedVC && (
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
                {storedVC.vcHistory ? (
                  storedVC.vcHistory.map((history) => (
                    <Box key={history.timestamp}>
                      <Text fontSize={"sm"}>{moment(history.timestamp).format("YYYY/MM/DD HH:mm")}</Text>
                      <Text>{history.message}</Text>
                    </Box>
                  ))
                ) : (
                  <Text>No history</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};
