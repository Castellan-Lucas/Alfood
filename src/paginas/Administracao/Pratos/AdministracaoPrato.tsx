import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [prato, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
         http
         .get<IPrato[]>("pratos/")
         .then((resposta) => setPratos(resposta.data));
     }, []);

  const excluir = (pratosAhSerExcluido: IPrato) => {
    http.delete(`restaurantes/${pratosAhSerExcluido.id}/`).then(() => {
      const listapratos = prato.filter(
        (prato) => prato.id !== pratosAhSerExcluido.id
      );
      setPratos([...listapratos]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prato.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} rel="noreferrer" target="blank">
                  Ver imagem
                </a>
              </TableCell>
              {/* <TableCell>{prato.editar}</TableCell>
              <TableCell>{prato.excluir}</TableCell> */}
              <TableCell>
                [{" "}
                <RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink>{" "}
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoPratos;
