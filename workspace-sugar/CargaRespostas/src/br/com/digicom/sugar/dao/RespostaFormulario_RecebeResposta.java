package br.com.digicom.sugar.dao;

import com.strongloop.android.loopback.callbacks.VoidCallback;

import br.com.digicom.sugar.daobase.DaoBase;
import br.com.digicom.sugar.daobase.DummyDaoBase;

public class RespostaFormulario_RecebeResposta extends DaoBaseSugar {

	
	
	public RespostaFormulario_RecebeResposta() {
		this.dummy = new DummyDaoBase();
	}
	
	@Override
	protected void executaImpl() {
		final DatasetSugar ds = (DatasetSugar) getComum();
		this.repResposta.recebeResposta(ds.getListaResposta(), new VoidCallback() {
			@Override
			public void onSuccess() {
				executaProximo();
			}

			@Override
			public void onError(Throwable t) {
				onErrorBase(t);
			}});
	}

	@Override
	protected DaoBase getProximo() {
		return this.dummy;
	}

}
