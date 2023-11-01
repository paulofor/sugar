package gerador.ingestaorespostaplanilha.loopback;


import br.com.gersis.daobase.IDatasetComum;
import br.com.gersis.loopback.modelo.*;
import java.util.List;

public class DatasetAplicacao  implements IDatasetComum {
	private List<PerguntaFormulario> listaPergunta;
	private List<Baby> listaResposta;


	public void setListaPergunta(List<PerguntaFormulario> valor) { 
		this.listaPergunta = valor;
	}
	public List<PerguntaFormulario> getListaPergunta() { 
		return this.listaPergunta;
	}
	public void setListaResposta(List<Baby> valor) { 
		this.listaResposta = valor;
	}
	public List<Baby> getListaResposta() { 
		return this.listaResposta;
	}
}
