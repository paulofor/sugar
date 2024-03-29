package gerador.ingestaorespostaplanilha.passo;


import gerador.ingestaorespostaplanilha.loopback.DaoAplicacao;
import gerador.ingestaorespostaplanilha.loopback.DatasetAplicacao;
import gerador.ingestaorespostaplanilha.passo.impl.*;
import br.com.gersis.daobase.*;
import br.com.gersis.loopback.modelo.*;

import java.util.List;
import com.strongloop.android.loopback.callbacks.*;


public abstract class ImportaPlanilha extends DaoAplicacao { 

	private int NUM_PASSO = 2;


	// campos saida
	protected List<Baby>  saidaListaResposta;

	@Override
	protected final void executaImpl() {
		final DatasetAplicacao ds = (DatasetAplicacao) this.getComum();
		if (executaCustom(ds.getListaPergunta())) {
			ds.setListaResposta(saidaListaResposta);
			executaProximo();
		} else {
			finalizar();
		}
	}


	@Override
	protected final DaoBase getProximo() {
		return new DummyDaoBase();
	}


	protected boolean executaCustom( List<PerguntaFormulario> listaPergunta ) { return true; }

	protected void preFinalizar() { return; }

	public int getNumPasso() {
		return NUM_PASSO;
	}


}

