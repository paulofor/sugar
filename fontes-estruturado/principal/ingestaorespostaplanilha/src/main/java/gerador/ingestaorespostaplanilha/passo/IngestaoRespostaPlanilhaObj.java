package gerador.ingestaorespostaplanilha.passo;


import gerador.ingestaorespostaplanilha.loopback.DaoAplicacao;
import gerador.ingestaorespostaplanilha.loopback.DatasetAplicacao;
import gerador.ingestaorespostaplanilha.passo.impl.*;
import br.com.gersis.daobase.DaoBase;
import br.com.gersis.daobase.IDatasetComum;

public class IngestaoRespostaPlanilhaObj extends DaoAplicacao { 

	@Override
	protected void executaImpl() {
		final DatasetAplicacao ds = (DatasetAplicacao) this.getComum();
		PerguntaFormulario_ListaAtiva exec = new PerguntaFormulario_ListaAtivaImpl();
		exec.setComum(ds);
		exec.executa();
		executaFinalizacao(ds);
		finalizar();
	}
	private void executaFinalizacao(DatasetAplicacao ds) {
	}
	public int getNumPasso() {
		return 1;
	}
}

