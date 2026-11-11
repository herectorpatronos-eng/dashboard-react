import React from "react";
import Card from "../../components/layout/Card/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/ui/Input";
import ImageUpload from "../../components/ui/ImageUpload";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import Select from "../../components/ui/Select";
import marcasService from "../../services/marcasService";
import produtosService from "../../services/produtosService";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const ProductsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [produto, setProduto] = React.useState({
    ID_PRODUTO: "",
    PRODUTO: "",
    DESCRICAO: "",
    QTDE: "0",
    PRECO_UNIT: "0,00",
    MARCA: {
      ID_MARCA: "",
      MARCA: ""
    },
  });
  const [marcas, setMarcas] = React.useState([])

  // Função para carregar as Marcas
  const carregarMarcas = async () => {
    const dados = await marcasService.getAll();
    setMarcas(dados.data);
  }

  const marcasOptions = marcas.map((item) => ({
    value: item.ID_MARCA,
    label: item.MARCA,
  }))

  React.useEffect(() => {
    // Carregar marcas
    carregarMarcas();
    // Verifica se é Novo ou Edit
    if (!id) {
      setLoading(false);
      return;
    }
    // Função para carregar registros da tabela
    const carregarForm = async () => {
      const dados = await produtosService.getById(id);
      setProduto({
        ID_PRODUTO: dados.data[0]["ID_PRODUTO"],
        PRODUTO: dados.data[0]["PRODUTO"],
        DESCRICAO: dados.data[0]["DESCRICAO"],
        QTDE: dados.data[0]["QTDE"],
        PRECO_UNIT: dados.data[0]["PRECO_UNIT"],
        MARCA: {
          ID_MARCA: dados.data[0]["MARCA"]["ID_MARCA"],
          MARCA: dados.data[0]["MARCA"]["MARCA"]
        },
      });
    }
    // Executar função carregarForm()
    carregarForm();
    setLoading(false);
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
        response = await produtosService.update(id, produto);
      } else {
        // CREATE - POST
        response = await produtosService.create(produto);
      }

      // Recuperar resposta da API
      const { status, message } = response;
      // Redicionar para lista principal
      navigate("/produtos");
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
        <Card title="Informações de Produto">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex gap-4">
              {/* Foto */}
              <div>
                <ImageUpload
                  value={produto.FOTO}
                  onChange={(base64) =>
                    setProduto({
                      ...produto,
                      FOTO: base64,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-4">
                  {/* Produto */}
                  <div className="w-full">
                    <Label htmlFor="produto" required>
                      Produto
                    </Label>
                    <Input
                      required={true}
                      name="produto"
                      placeholder="Produto"
                      value={produto.PRODUTO}
                      onChange={(e) => {
                        setProduto({
                          ...produto,
                          PRODUTO: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {/* Marca */}
                  <div className="w-full">
                    <Label htmlFor="marca" required>
                      Marca
                    </Label>
                    <Select
                      required
                      name="marca"
                      value={produto.MARCA.ID_MARCA}
                      onChange={(e) =>
                        setProduto({
                          ...produto,
                          MARCA: {
                            ...produto.MARCA,
                            ID_MARCA: e.target.value,
                          },
                        })
                      }
                      options={marcasOptions}
                      placeholder="Selecione uma marca"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-4">
                  {/* QTDE */}
                  <div className="w-full">
                    <Label htmlFor="qtde" required>QTDE</Label>

                    <Input
                      required={true}
                      type="number"
                      id="qtde"
                      name="qtde"
                      value={produto.QTDE}
                      onChange={(e) => {
                        setProduto({
                          ...produto,
                          QTDE: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {/* PRECO_UNIT */}
                  <div className="w-full">
                    <Label htmlFor="preco_unit">Preço Unit</Label>
                    <Input
                      id="preco_unit"
                      name="preco_unit"
                      placeholder="999,99"
                      mask={'money'}
                      value={produto.PRECO_UNIT}
                      onChange={(e) => {
                        setProduto({
                          ...produto,
                          PRECO_UNIT: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="descricao" required>Descrição</Label>

              <Textarea
                required={true}
                id="descricao"
                name="descricao"
                value={produto.DESCRICAO}
                onChange={(e) => {
                  setProduto({
                    ...produto,
                    DESCRICAO: e.target.value,
                  });
                }}
                rows={5}
                maxLength={500}
              />
            </div>

            {/* Botões */}
            <div className="md:col-span-2 flex gap-2 pt-2">
              <Link to="/produtos">
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

export default ProductsForm;
