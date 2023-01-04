package br.com.digicom.sugar.dao;

import java.util.List;

import br.com.digicom.sugar.daobase.IDatasetComum;
import br.com.digicom.sugar.modelo.PerguntaFormulario;
import br.com.digicom.sugar.modelo.extra.BabyArquivo;

public class DatasetSugar implements IDatasetComum{
	
	
	private List<PerguntaFormulario> listaPergunta;
	private List<BabyArquivo> listaResposta;
	
	

	public List<PerguntaFormulario> getListaPergunta() {
		return listaPergunta;
	}

	public void setListaPergunta(List<PerguntaFormulario> listaPergunta) {
		this.listaPergunta = listaPergunta;
	}

	public List<BabyArquivo> getListaResposta() {
		return listaResposta;
	}

	public void setListaResposta(List<BabyArquivo> listaResposta) {
		this.listaResposta = listaResposta;
	}

	

	

}
