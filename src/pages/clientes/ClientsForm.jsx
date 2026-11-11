import React from "react";
import Card from "../../components/layout/Card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import clientesService from "../../services/clientesService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const ClientsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [cliente, setCliente] = React.useState({
    ID_CLIENTE: "",
    NOME: "",
    CPF: "",
    DATA_NASCIMENTO: "",
    WHATSAPP: "",
    EMAIL: "",
    ENDERECO: {
      LOGRADOURO: "",
      NUMERO: "",
      COMPLEMENTO: "",
      BAIRRO: "",
      CIDADE: "",
      ESTADO: "",
      CEP: "",
    },
  });

  React.useEffect(() => {
    // Verifica se é Novo ou Edit
    if (!id) {
      setLoading(false);
      return;
    }
    // Função para carregar registros da tabela
    const carregarForm = async () => {
      const dados = await clientesService.getById(id);
      setCliente({
        ID_CLIENTE: dados.data[0]["ID_CLIENTE"],
        NOME: dados.data[0]["NOME"],
        CPF: dados.data[0]["CPF"],
        DATA_NASCIMENTO: dados.data[0]["DATA_NASCIMENTO"],
        WHATSAPP: dados.data[0]["WHATSAPP"],
        EMAIL: dados.data[0]["EMAIL"],
        ENDERECO: {
          LOGRADOURO: dados.data[0]["ENDERECO"]["LOGRADOURO"],
          NUMERO: dados.data[0]["ENDERECO"]["NUMERO"],
          COMPLEMENTO: dados.data[0]["ENDERECO"]["COMPLEMENTO"],
          BAIRRO: dados.data[0]["ENDERECO"]["BAIRRO"],
          CIDADE: dados.data[0]["ENDERECO"]["CIDADE"],
          ESTADO: dados.data[0]["ENDERECO"]["ESTADO"],
          CEP: dados.data[0]["ENDERECO"]["CEP"],
        },
      });
      // console.log("Cliente => ", dados.data[0]);
      setLoading(false);
    };
    // Executar função carregarForm()
    carregarForm();
  }, []);

  const handleSubmit = async (e) => {
    // Desativar função de mudar de página ao clicar no Salvar
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      // Se tiver variável ID, significa UPDATE
      if (id) {
        // UPDATE - PUT
        response = await clientesService.update(id, cliente);
      } else {
        // CREATE - POST
        response = await clientesService.create(cliente);
      }

      // Recuperar resposta da API
      const { status, message } = response;
      // Redicionar para lista principal
      navigate("/clientes");
      // Exibir mensagem de sucesso
      toast.success(message);
    } catch (error) {
      // Exibir mensagem de erro
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card title="Informações de Clientes">
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Nome */}
            <div className="md:col-span-2">
              <Label htmlFor="nome" required>
                Nome
              </Label>
              <Input
                required={true}
                name="nome"
                placeholder="Digite seu nome completo"
                value={cliente.NOME}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    NOME: e.target.value,
                  });
                }}
              />
            </div>

            {/* Data de nascimento */}
            <div>
              <Label htmlFor="data_nascimento">Data de Nascimento</Label>

              <Input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={cliente.DATA_NASCIMENTO}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    DATA_NASCIMENTO: e.target.value,
                  });
                }}
              />
            </div>

            {/* CPF */}
            <div>
              <Label htmlFor="cpf">CPF</Label>

              <Input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="000.000.000-00"
                mask="999.999.999-99"
                value={cliente.CPF}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    CPF: e.target.value,
                  });
                }}
              />
            </div>

            {/* WhatsApp */}
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>

              <Input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                placeholder="(00) 00000-0000"
                mask="(99) 99999-9999"
                value={cliente.WHATSAPP}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    WHATSAPP: e.target.value,
                  });
                }}
              />
            </div>

            {/* E-mail */}
            <div>
              <Label htmlFor="email">E-mail</Label>

              <Input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                value={cliente.EMAIL}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    EMAIL: e.target.value,
                  });
                }}
              />
            </div>

            {/* Logradouro */}
            <div className="md:col-span-2">
              <Label htmlFor="logradouro">Logradouro</Label>

              <Input
                type="text"
                id="logradouro"
                name="logradouro"
                placeholder="Rua, Avenida, etc."
                value={cliente.ENDERECO.LOGRADOURO}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      LOGRADOURO: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Número */}
            <div>
              <Label htmlFor="numero">Número</Label>

              <Input
                type="text"
                id="numero"
                name="numero"
                placeholder="Número"
                value={cliente.ENDERECO.NUMERO}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      NUMERO: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Complemento */}
            <div>
              <Label htmlFor="complemento">Complemento</Label>

              <Input
                type="text"
                id="complemento"
                name="complemento"
                placeholder="Apto, bloco, casa, etc."
                value={cliente.ENDERECO.COMPLEMENTO}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      COMPLEMENTO: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Bairro */}
            <div>
              <Label htmlFor="bairro">Bairro</Label>

              <Input
                type="text"
                id="bairro"
                name="bairro"
                placeholder="Digite seu bairro"
                value={cliente.ENDERECO.BAIRRO}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      BAIRRO: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Cidade */}
            <div>
              <Label htmlFor="cidade">Cidade</Label>

              <Input
                type="text"
                id="cidade"
                name="cidade"
                placeholder="Digite sua cidade"
                value={cliente.ENDERECO.CIDADE}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      CIDADE: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Estado */}
            <div>
              <Label htmlFor="estado">Estado</Label>

              <Input
                type="text"
                id="estado"
                name="estado"
                placeholder="SP"
                maxLength={2}
                className="uppercase"
                value={cliente.ENDERECO.ESTADO}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      ESTADO: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* CEP */}
            <div>
              <Label htmlFor="cep">CEP</Label>

              <Input
                type="text"
                id="cep"
                name="cep"
                placeholder="00000-000"
                mask="99999-999"
                value={cliente.ENDERECO.CEP}
                onChange={(e) => {
                  setCliente({
                    ...cliente,
                    ENDERECO: {
                      ...cliente.ENDERECO,
                      CEP: e.target.value,
                    },
                  });
                }}
              />
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex gap-2 pt-2">
              <Link to="/clientes">
                <Button
                  className="
                            bg-red-300
                            hover:bg-red-400
                            text-white
                            "
                >
                  Cancelar
                </Button>
              </Link>

              <Button
                type="submit"
                className="
                            bg-blue-800
                            hover:bg-blue-900
                            text-white
                        "
              >
                Enviar
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};

export default ClientsForm;
