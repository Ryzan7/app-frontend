import { useState } from "react";
import axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [planeta, setPlaneta] = useState("");
  const [resposta, setResposta] = useState(null);

  const enviarViagem = async () => {
    try {
      const res = await axios.post(`https://${import.meta.env.VITE_API_URL}/viagem`, {
        nome,
        planeta,
      });
      setResposta(res.data);
    } catch (err) {
      console.error("Erro na requisição:", err);
      setResposta({ mensagem: "Erro ao enviar: " + (err.response?.data?.erro || err.message) });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Agendar Viagem Espacial 🚀</h1>
      <input
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="Planeta de destino"
        value={planeta}
        onChange={(e) => setPlaneta(e.target.value)}
      />
      <button onClick={enviarViagem}>Enviar</button>

      {resposta && (
        <div style={{ marginTop: "20px" }}>
          <h2>Viagem Confirmada!</h2>
          <p>ID: {resposta.id}</p>
          <p>{resposta.mensagem}</p>
        </div>
      )}
    </div>
  );
}

export default App;
