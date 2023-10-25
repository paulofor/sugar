package gerador.ingestaorespostaplanilha.loopback;


import com.strongloop.android.loopback.RestAdapter;

import br.com.gersis.daobase.DaoBase;
import br.com.gersis.daobase.IDatasetComum;
import br.com.gersis.daobase.comum.DaoBaseComum;
import br.com.gersis.loopback.repositorio.*;

public abstract class DaoAplicacao extends DaoBase {

	private RestAdapter adapter = new RestAdapter(DaoBaseComum.urlLoopback);
	protected RepositorioBaby repBaby = adapter.createRepository(RepositorioBaby.class);
	protected RepositorioExperiencia repExperiencia = adapter.createRepository(RepositorioExperiencia.class);
	protected RepositorioItemCusto repItemCusto = adapter.createRepository(RepositorioItemCusto.class);
	protected RepositorioPerguntaFormulario repPerguntaFormulario = adapter.createRepository(RepositorioPerguntaFormulario.class);
	protected RepositorioProjeto repProjeto = adapter.createRepository(RepositorioProjeto.class);
	protected RepositorioRespostaFormulario repRespostaFormulario = adapter.createRepository(RepositorioRespostaFormulario.class);
	protected RepositorioTracoBaby repTracoBaby = adapter.createRepository(RepositorioTracoBaby.class);
	protected RepositorioTracoPersonalidade repTracoPersonalidade = adapter.createRepository(RepositorioTracoPersonalidade.class);


	@Override
	protected long getTempo() {
		return 5000;
	}

	@Override
	protected IDatasetComum criaDataSet() {
		return new DatasetAplicacao();
	}

	@Override
	protected DaoBase getProximo() {
		return null;
	} 

}
