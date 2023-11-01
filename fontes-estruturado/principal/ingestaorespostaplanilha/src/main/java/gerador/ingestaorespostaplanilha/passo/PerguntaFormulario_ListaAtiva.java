package gerador.ingestaorespostaplanilha.passo;


import gerador.ingestaorespostaplanilha.loopback.DaoAplicacao;
import gerador.ingestaorespostaplanilha.loopback.DatasetAplicacao;
import gerador.ingestaorespostaplanilha.passo.impl.*;
import br.com.gersis.daobase.*;
import br.com.gersis.loopback.modelo.*;

import java.util.List;
import com.strongloop.android.loopback.callbacks.*;


public abstract class PerguntaFormulario_ListaAtiva extends DaoAplicacao { 

	private int NUM_PASSO = 1;



	@Override
	protected final void executaImpl() {
		final DatasetAplicacao ds = (DatasetAplicacao) this.getComum();
		if (executaCustom()) {
			repPerguntaFormulario.listaAtiva(  new ListCallback<PerguntaFormulario>() { 
				public void onSuccess(List<PerguntaFormulario> lista) {
						ds.setListaPergunta(lista);
						executaProximo();
				}
				public void onError(Throwable t) {
					onErrorBase(t);
				}
			});
		} else {
			executaProximo();
		}
	}


	@Override
	protected final DaoBase getProximo() {
		return new ImportaPlanilhaImpl();
	}


	protected boolean executaCustom() { return true; }

	protected void preFinalizar() { return; }

	public int getNumPasso() {
		return NUM_PASSO;
	}


}

