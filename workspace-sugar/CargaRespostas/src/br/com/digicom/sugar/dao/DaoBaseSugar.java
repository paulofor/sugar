package br.com.digicom.sugar.dao;

import com.strongloop.android.loopback.RestAdapter;

import br.com.digicom.sugar.daobase.DaoBase;
import br.com.digicom.sugar.daobase.IDatasetComum;
import br.com.digicom.sugar.daobase.comum.DaoBaseComum;
import br.com.digicom.sugar.repositorio.RepositorioPerguntaFormulario;
import br.com.digicom.sugar.repositorio.RepositorioRespostaFormulario;

public abstract class DaoBaseSugar extends DaoBase{
	
	private RestAdapter adapter = new RestAdapter(DaoBaseComum.urlLoopback); 
	protected RepositorioPerguntaFormulario repPergunta = adapter.createRepository(RepositorioPerguntaFormulario.class);
	protected RepositorioRespostaFormulario repResposta = adapter.createRepository(RepositorioRespostaFormulario.class);

	@Override
	protected long getTempo() {
		return 10000;
	}
	
	@Override
	protected IDatasetComum criaDataSet() {
		return new DatasetSugar();
	}
}
