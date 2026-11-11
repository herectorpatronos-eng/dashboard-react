import React from "react";
import Card from "../../components/layout/Card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import fornecedoresService from "../../services/fornecedoresService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const SuppliersForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [fornecedor, setFornecedor] = React.useState({
    ID_FORNECEDOR: "",
    RAZAO_SOCIAL: "",
    NOME_FANTASIA: "",
    CNPJ: "",
    TELEFONE: "",
    EMAIL: "",
  });

  React.useEffect(() => {
    // Verifica se é Novo ou Edit
    if (!id) {
      setLoading(false);
      return;
    }
    // Função para carregar registros da tabela
    const carregarForm = async () => {
      const dados = await fornecedoresService.getById(id);
      setFornecedor({
        ID_FORNECEDOR: dados.data[0]["ID_FORNECEDOR"],
        RAZAO_SOCIAL: dados.data[0]["RAZAO_SOCIAL"],
        NOME_FANTASIA: dados.data[0]["NOME_FANTASIA"],
        CNPJ: dados.data[0]["CNPJ"],
        TELEFONE: dados.data[0]["TELEFONE"],
        EMAIL: dados.data[0]["EMAIL"],
      });
      // console.log("Fornecedore => ", dados.data[0]);
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
        response = await fornecedoresService.update(id, fornecedor);
      } else {
        // CREATE - POST
        response = await fornecedoresService.create(fornecedor);
      }

      // Recuperar resposta da API
      const { status, message } = response;
      // Redicionar para lista principal
      navigate("/fornecedores");
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
        <Card title="Informações de Fornecedor">
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Razão social */}
            <div className="md:col-span-2">
              <Label htmlFor="razao_social" required>
                Razão Social
              </Label>
              <Input
                required={true}
                name="razao_social"
                placeholder="Razão social"
                value={fornecedor.RAZAO_SOCIAL}
                onChange={(e) => {
                  setFornecedor({
                    ...fornecedor,
                    RAZAO_SOCIAL: e.target.value,
                  });
                }}
              />
            </div>

            {/* Nome Fantasia */}
            <div>
              <Label htmlFor="nome_fantasia" required>Nome Fantasia</Label>

              <Input
                required={true}
                id="nome_fantasia"
                name="nome_fantasia"
                value={fornecedor.NOME_FANTASIA}
                onChange={(e) => {
                  setFornecedor({
                    ...fornecedor,
                    NOME_FANTASIA: e.target.value,
                  });
                }}
              />
            </div>

            {/* CNPJ */}
            <div>
              <Label htmlFor="cnpj" required>CNPJ</Label>

              <Input
                required={true}
                type="text"
                id="cnpj"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                mask="99.999.999/9999-99"
                value={fornecedor.CNPJ}
                onChange={(e) => {
                  setFornecedor({
                    ...fornecedor,
                    CNPJ: e.target.value,
                  });
                }}
              />
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="whatsapp">Telefone</Label>

              <Input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="(00) 0000-0000"
                mask="(99) 9999-9999"
                value={fornecedor.TELEFONE}
                onChange={(e) => {
                  setFornecedor({
                    ...fornecedor,
                    TELEFONE: e.target.value,
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
                value={fornecedor.EMAIL}
                onChange={(e) => {
                  setFornecedor({
                    ...fornecedor,
                    EMAIL: e.target.value,
                  });
                }}
              />
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex gap-2 pt-2">
              <Link to="/fornecedores">
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

export default SuppliersForm;
