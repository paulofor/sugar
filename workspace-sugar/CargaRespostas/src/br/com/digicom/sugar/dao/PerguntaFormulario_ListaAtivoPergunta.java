package br.com.digicom.sugar.dao;

import java.util.List;

import com.strongloop.android.loopback.callbacks.ListCallback;

import br.com.digicom.sugar.daobase.DaoBase;
import br.com.digicom.sugar.modelo.PerguntaFormulario;
import br.com.digicom.sugar.processamento.LeArquivoForm;

public class PerguntaFormulario_ListaAtivoPergunta extends DaoBaseSugar {

	
	public void executaImpl() {
		final DatasetSugar ds = (DatasetSugar) getComum();
		this.repPergunta.listaAtivoPergunta(new ListCallback<PerguntaFormulario>() {

			@Override
			public void onSuccess(List<PerguntaFormulario> objects) {
				ds.setListaPergunta(objects);
				executaProximo();
			}

			@Override
			public void onError(Throwable t) {
				onErrorBase(t);
			}});
		
	}

	@Override
	protected DaoBase getProximo() {
		return new LeArquivoForm();
	}



}
