package br.com.digicom.sugar.dao;

import java.util.List;

import br.com.digicom.sugar.daobase.IDatasetComum;
import br.com.digicom.sugar.modelo.PerguntaFormulario;

public class DatasetSugar implements IDatasetComum{
	
	
	private List<PerguntaFormulario> listaPergunta;

	public List<PerguntaFormulario> getListaPergunta() {
		return listaPergunta;
	}

	public void setListaPergunta(List<PerguntaFormulario> listaPergunta) {
		this.listaPergunta = listaPergunta;
	}


}
