package br.com.digicom.sugar.dao;

import java.util.List;

import br.com.digicom.sugar.daobase.IDatasetComum;
import br.com.digicom.sugar.modelo.PerguntaFormulario;
import br.com.digicom.sugar.modelo.RespostaFormulario;

public class DatasetSugar implements IDatasetComum{
	
	
	private List<PerguntaFormulario> listaPergunta;
	private List<List<RespostaFormulario>> listaResposta;
	
	

	public List<PerguntaFormulario> getListaPergunta() {
		return listaPergunta;
	}

	public void setListaPergunta(List<PerguntaFormulario> listaPergunta) {
		this.listaPergunta = listaPergunta;
	}

	public List<List<RespostaFormulario>> getListaResposta() {
		return listaResposta;
	}

	public void setListaResposta(List<List<RespostaFormulario>> listaResposta) {
		this.listaResposta = listaResposta;
	}

	

	

}
